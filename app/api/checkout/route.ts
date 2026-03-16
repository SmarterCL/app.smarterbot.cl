import { NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { logger } from "@/lib/logger";

const FLOW_API_KEY = process.env.FLOW_API_KEY || "4C45F4B9-23B7-4B4D-A6DC-398LDE41E603";
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY || "482978b829316b30f81d3e84f06ff74440f3abfc";
// Usa "https://sandbox.flow.cl/api" si quieres probar primero, luego "https://www.flow.cl/api"
const FLOW_BASE_URL = process.env.FLOW_API_URL || "https://sandbox.flow.cl/api";

const PLANS: Record<string, { amount: number, name: string }> = {
    "demo": { amount: 0, name: "Plan Demo (Gratis)" },
    "comercio": { amount: 35000, name: "Plan Comercio MYPE" },
    "empresa": { amount: 75000, name: "Plan Avanzado Empresas" },
    "startup": { amount: 150000, name: "Plan Enterprise Premium" },
    "enterprise": { amount: 75000, name: "Suscripción Avanzada" },
    "promo": { amount: 7990, name: "Plan OpenClaw Promo (Hostinger)" }
};

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await req.json();
        const { plan, rutPersona, rutEmpresa, email } = body;

        const planData = PLANS[plan || ""];

        if (!planData || planData.amount === 0) {
            // El plan es demo o no válido, mandamos un link de éxito directamente
            return NextResponse.json({
                redirectUrl: "/dashboard",
                message: "Redireccionando al dashboard sin cobro."
            });
        }

        // 1. Prepara Parámetros de Flow (Ordenados alfabéticamente para la firma)
        const params: Record<string, string> = {
            apiKey: FLOW_API_KEY,
            amount: planData.amount.toString(),
            commerceOrder: `ORDER_${Date.now()}_${userId.slice(-6)}`,
            currency: "CLP",
            email: email || "contacto@smarterbot.cl",
            paymentMethod: "9", // Webpay
            subject: `Suscripción SmarterOS - ${planData.name}`,
            urlConfirmation: `${process.env.NEXT_PUBLIC_APP_URL || "https://app.smarterbot.cl"}/api/checkout/webhook`,
            urlReturn: `${process.env.NEXT_PUBLIC_APP_URL || "https://app.smarterbot.cl"}/dashboard?success=true&plan=${plan}`
        };

        // 2. Concatena los parámetros ordenados para generar la firma
        const sortedKeys = Object.keys(params).sort();
        let toSign = "";
        sortedKeys.forEach((key) => {
            toSign += key + params[key];
        });

        // 3. Genera la firma con HMAC SHA256 usando la Secret Key de Flow
        const signature = crypto
            .createHmac("sha256", FLOW_SECRET_KEY)
            .update(toSign)
            .digest("hex");

        params.s = signature;

        // 4. Transformar los parámetros a x-www-form-urlencoded
        const formData = new URLSearchParams();
        for (const key in params) {
            formData.append(key, params[key]);
        }

        // 5. Llamada HTTP directa a la API oficial de Flow
        const response = await fetch(`${FLOW_BASE_URL}/payment/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString()
        });

        const flowData = await response.json();

        if (!response.ok) {
            logger.error("Flow API Error", { error: flowData, plan });
            return NextResponse.json({ error: "No pudimos crear la orden de pago con Webpay" }, { status: 500 });
        }

        // 6. Retorna la URL oficial concatenando url + token devolviendo al usuario al pago Webpay
        return NextResponse.json({
            redirectUrl: `${flowData.url}?token=${flowData.token}`
        });

    } catch (error) {
        logger.error("POST checkout router error", { error: error instanceof Error ? error.message : String(error) });
        return NextResponse.json({ error: "Error de servidor procesando pago" }, { status: 500 });
    }
}
