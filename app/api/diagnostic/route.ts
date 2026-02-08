import { NextResponse } from "next/server";

export async function GET() {
    const services = [
        { name: "Orchestrator (FastAPI)", url: process.env.FASTAPI_URL || "http://localhost:8080" },
        { name: "SmarterMCP Server", url: "http://localhost:8081/health" },
        { name: "n8n Automation", url: process.env.N8N_URL || "http://localhost:5678" },
    ];

    const results = await Promise.all(
        services.map(async (service) => {
            try {
                const start = Date.now();
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);

                const response = await fetch(service.url, { signal: controller.signal });
                clearTimeout(timeoutId);

                return {
                    name: service.name,
                    status: response.ok ? "online" : "error",
                    latency: `${Date.now() - start}ms`,
                    url: service.url,
                };
            } catch (error) {
                return {
                    name: service.name,
                    status: "offline",
                    error: error instanceof Error ? error.message : "Connection failed",
                    url: service.url,
                };
            }
        })
    );

    return NextResponse.json({
        timestamp: new Date().toISOString(),
        services: results,
        environment: process.env.NODE_ENV,
    });
}
