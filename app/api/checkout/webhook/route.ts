import { NextResponse } from "next/server";
import crypto from "crypto";
import { logger } from "@/lib/logger";
import { createClient } from "@supabase/supabase-js";

const FLOW_API_KEY = process.env.FLOW_API_KEY || "4C45F4B9-23B7-4B4D-A6DC-398LDE41E603";
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY || "482978b829316b30f81d3e84f06ff74440f3abfc";
const FLOW_BASE_URL = process.env.FLOW_API_URL || "https://sandbox.flow.cl/api";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder_key"
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(req: Request) {
    try {
        const textData = await req.text();
        // Flow webhook sends data as x-www-form-urlencoded 
        const params = new URLSearchParams(textData);
        const token = params.get("token");

        if (!token) {
            return NextResponse.json({ error: "Token no proporcionado" }, { status: 400 });
        }

        // Call Flow.cl to verify the payment status using the token
        const verificationParams: Record<string, string> = {
            apiKey: FLOW_API_KEY,
            token: token,
        };

        const sortedKeys = Object.keys(verificationParams).sort();
        let toSign = "";
        sortedKeys.forEach((key) => {
            toSign += key + verificationParams[key];
        });

        const signature = crypto
            .createHmac("sha256", FLOW_SECRET_KEY)
            .update(toSign)
            .digest("hex");

        verificationParams.s = signature;

        const url = `${FLOW_BASE_URL}/payment/getStatus?apiKey=${FLOW_API_KEY}&token=${token}&s=${signature}`;

        const response = await fetch(url, {
            method: "GET",
        });

        const flowData = await response.json();

        if (!response.ok) {
            logger.error("Flow verification webhook error", { flowData });
            return NextResponse.json({ error: "Error de verificación" }, { status: 500 });
        }

        // flowData.status === 2 means payment was SUCCESSFUL
        if (flowData.status === 2) {
            // Dispara la acción central: El usuario pagó en Webpay
            logger.info("¡PAGO CONFIRMADO VIA FLOW!", { flowData });

            // 1. Opcional: Registra el pago en supabase
            /* 
            await supabase.from("payments").insert({
               order_id: flowData.commerceOrder,
               amount: flowData.amount,
               email: flowData.payer,
               status: 'paid'
            }); 
            */

            // 2. Dispara un webhook a tu servidor n8n local para aprovisionar subdominio
            /*
            await fetch("https://bridge.smarterbot.cl/webhook/provision-tenant", {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ order: flowData.commerceOrder, email: flowData.payer })
            });
            */

            // Flow requiere contestar HTTP 200 limpio sin JSON body que rompa
            return new NextResponse("OK", { status: 200 });
        } else {
            logger.warn("Notificación de Flow con status distinto a 2 (pagado)", { flowData });
            return new NextResponse("OK", { status: 200 });
        }

    } catch (error) {
        logger.error("POST flow webhook error", { error: error instanceof Error ? error.message : String(error) });
        return NextResponse.json({ error: "Error de servidor procesando webhook" }, { status: 500 });
    }
}
