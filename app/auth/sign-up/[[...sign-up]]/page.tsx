import { SignUp } from "@clerk/nextjs";
import { Bot } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFCE00] p-6 selection:bg-slate-900 selection:text-[#FFCE00]">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-slate-900 rounded-[22px] shadow-xl mb-4">
            <Bot className="h-10 w-10 text-[#FFCE00]" />
          </div>
          <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter italic">
            Smarter<span className="text-white">OS</span>
          </h1>
        </div>

        <div className="relative bg-white rounded-[44px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-white overflow-hidden p-2">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-none p-6 sm:p-10",
                headerTitle: "text-slate-900 font-black tracking-tight text-2xl mb-1",
                headerSubtitle: "text-slate-400 font-bold mb-6 text-sm",
                socialButtonsBlockButton: "rounded-2xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all h-12",
                formButtonPrimary: "bg-slate-900 hover:bg-black text-[#FFCE00] font-black rounded-2xl h-14 shadow-xl shadow-yellow-500/10 transition-all border-none normal-case tracking-widest",
                formFieldInput: "bg-slate-50 border-2 border-slate-100 focus:border-[#FFCE00] focus:ring-4 focus:ring-[#FFCE00]/10 rounded-2xl h-14 transition-all px-6",
                footerActionLink: "text-slate-900 font-black hover:text-[#FFCE00] transition-colors"
              }
            }}
          />
        </div>
        
        <div className="mt-8 text-center opacity-30">
          <p className="text-[9px] font-black text-slate-900 tracking-[0.5em] uppercase">SmarterOS Network • 2026</p>
        </div>
      </div>
    </div>
  );
}