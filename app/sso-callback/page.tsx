"use client"

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

export default function SSOCallback() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#FFCE00]">
            <div className="w-full max-w-[480px] p-6 animate-pulse">
                <div className="bg-white rounded-[40px] shadow-2xl p-12 text-center">
                    <div className="flex justify-center mb-8">
                        <img
                            src="/logo-smarteros.jpg"
                            alt="SmarterOS"
                            className="h-16 w-auto object-contain rounded-2xl"
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900">Procesando acceso...</h2>
                        <p className="text-slate-500 font-medium">Estamos validando tus credenciales para iniciar sesión.</p>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#FFCE00] animate-[shimmer_1.5s_infinite] w-1/2"></div>
                        </div>
                    </div>
                    <div className="hidden">
                        <AuthenticateWithRedirectCallback />
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    )
}
