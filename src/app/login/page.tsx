"use client"

import { useEffect } from "react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  useEffect(() => {
    // Automatically trigger WSO2 Asgardeo sign-in on mount
    signIn("wso2", { callbackUrl: "/dashboard" })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-zinc-950">
      {/* Background radial gradient decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_50%)]" />
      
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center space-y-6 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 p-8 rounded-2xl shadow-xl">
        {/* Animated spinner */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute w-full h-full border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">
            Secure Authentication
          </h1>
          <p className="text-sm text-zinc-400">
            Redirecting you to WSO2 Asgardeo...
          </p>
        </div>

        <button 
          onClick={() => signIn("wso2", { callbackUrl: "/dashboard" })}
          className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors cursor-pointer"
        >
          Not redirected? Click here to sign in
        </button>
      </div>
    </div>
  )
}