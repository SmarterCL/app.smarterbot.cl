import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500">
        {/* Logo overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-4 drop-shadow-lg">
              Smarter<span className="text-white">OS</span>
            </h1>
            <p className="text-xl text-black/80 max-w-md">
              Únete a la revolución de la automatización inteligente
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-200 rounded-full blur-2xl"></div>
        </div>
        {/* Lightning bolt decoration */}
        <div className="absolute bottom-10 left-10 text-black/20">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
          </svg>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 px-4 py-12 lg:px-8">
        {/* Mobile Logo (shown only on mobile) */}
        <div className="lg:hidden mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Smarter<span className="text-yellow-500">OS</span>
          </h1>
          <p className="text-sm text-slate-400">
            Crea tu cuenta gratis
          </p>
        </div>

        {/* Clerk SignUp Component */}
        <div className="w-full max-w-md">
          <SignUp
            routing="path"
            path="/auth/sign-up"
            signInUrl="/auth/sign-in"
            forceRedirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl p-2",
                headerTitle: "text-xl font-semibold text-gray-900",
                headerSubtitle: "text-sm text-gray-500",
                socialButtonsBlockButton: "border border-gray-200 hover:bg-gray-50 transition-colors font-medium",
                socialButtonsBlockButtonText: "text-gray-700",
                formButtonPrimary: "bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-lg transition-all hover:shadow-xl",
                footerActionLink: "text-yellow-600 hover:text-yellow-700 font-medium",
                formFieldInput: "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-400",
                logoImage: "h-10 w-auto",
                logoBox: "justify-center mb-2",
              },
              layout: {
                logoPlacement: "inside",
                socialButtonsPlacement: "top",
                showOptionalFields: false,
              },
            }}
          />
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          © 2026 SmarterOS. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}