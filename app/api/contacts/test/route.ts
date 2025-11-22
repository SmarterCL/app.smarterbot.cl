import { NextResponse } from "next/server";

// GET handler to allow browser access without 405
export async function GET() {
  return NextResponse.json(
    {
      message: "Usa POST para enviar contacto de prueba",
      example: {
        method: "POST",
        endpoint: "/api/contacts/test",
        curl: "curl -X POST http://localhost:3000/api/contacts/test",
      },
    },
    { status: 200 }
  );
}

// Test contact flow: proxies to FastAPI (assumes ENV has FASTAPI_URL)
export async function POST() {
  const api = process.env.FASTAPI_URL || "http://127.0.0.1:8000";
  try {
    const payload = {
      name: "Contacto Prueba",
      email: `test+${Date.now()}@example.com`,
      source: "dashboard-test",
    };
    const res = await fetch(`${api}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ ok: false, error: text }, { status: 500 });
    }
    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: true, forwarded: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}