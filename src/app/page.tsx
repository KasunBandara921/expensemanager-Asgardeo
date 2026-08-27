import { auth } from "@/lib/auth"
import Link from "next/link"
import { LandingHeader } from "@/components/landing/landing-header"
import { InteractivePlayground } from "@/components/landing/interactive-playground"
import { Button } from "@/components/ui/button"
import {
  Wallet,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  TrendingDown,
  LineChart,
} from "lucide-react"

export default async function Home() {
  const session = await auth()
  const isAuthenticated = !!session?.user
  const userName = session?.user?.name

  return (
    <div className="min-h-screen text-gray-900 dark:text-zinc-50 relative overflow-hidden transition-colors duration-300 font-sans">
      {/* Landing Header */}
      <LandingHeader isAuthenticated={isAuthenticated} userName={userName} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-400/20 animate-bounce">
            <Sparkles className="h-3 w-3" />
            <span>Smart Personal Finance Manager</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
            Take Control of Your Wealth,{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent block sm:inline">
              Seamlessly.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Track daily expenses, visualize category distributions, and unlock personalized
            financial recommendations powered by Google Gemini AI. Securely synced with WSO2 Asgardeo.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {isAuthenticated ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold shadow-md hover:shadow-indigo-500/20 gap-2 transition-all duration-200 cursor-pointer">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold shadow-md hover:shadow-indigo-500/20 gap-2 transition-all duration-200 cursor-pointer">
                  <span>Start Tracking Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <a href="#simulator" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-gray-300 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 hover:bg-white/80 dark:hover:bg-zinc-900/60 font-semibold cursor-pointer">
                Try Live Simulator
              </Button>
            </a>
          </div>
        </div>

        {/* Dashboard Mockup Showcase */}
        <div className="mt-16 md:mt-20 border border-gray-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl relative">
          {/* Mockup Header bar */}
          <div className="flex items-center justify-between border-b border-gray-200/50 dark:border-zinc-800/50 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="text-xs text-gray-400 dark:text-zinc-500 bg-gray-100/50 dark:bg-zinc-900/50 px-3 py-1 rounded-md border border-gray-200/30 dark:border-zinc-800/30">
              smartspend.io/dashboard
            </div>
            <div className="w-12" />
          </div>

          {/* Grid representing mock dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/60 dark:bg-zinc-900/60 p-5 rounded-xl border border-gray-200/50 dark:border-zinc-800/40">
              <h3 className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                Total Balance
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                Rs. 64,800.00
              </p>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5 mt-2">
                <TrendingDown className="h-3 w-3 inline" />
                Expenses decreased by 8.4% this month
              </span>
            </div>

            <div className="bg-white/60 dark:bg-zinc-900/60 p-5 rounded-xl border border-gray-200/50 dark:border-zinc-800/40">
              <h3 className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                Daily Average
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                Rs. 1,480.00
              </p>
              <div className="w-full bg-gray-200 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-indigo-500 h-full w-[65%]" />
              </div>
            </div>

            <div className="bg-white/60 dark:bg-zinc-900/60 p-5 rounded-xl border border-gray-200/50 dark:border-zinc-800/40">
              <h3 className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                AI Budget Insight
              </h3>
              <p className="text-xs text-gray-600 dark:text-zinc-400 mt-2 leading-relaxed font-sans">
                💡 "Based on your weekend transactions, dining out amounts to 38% of your expenses. Cook meals at home tomorrow to save approx. Rs. 1,500."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Section */}
      <section id="features" className="py-20 bg-gray-50/20 dark:bg-zinc-950/20 border-y border-gray-200/30 dark:border-zinc-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Features Built to Empower You
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-sm sm:text-base">
              SmartSpend bundles modern, robust tools under a simplified interface to give you instant command over your budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200/50 dark:border-zinc-800/50 p-6 rounded-2xl backdrop-blur-xs flex flex-col space-y-4 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Wallet className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-100">
                Intelligent Tracking
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-sans">
                Log expenses fast with descriptive details and custom categories. Add transactions on the fly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200/50 dark:border-zinc-800/50 p-6 rounded-2xl backdrop-blur-xs flex flex-col space-y-4 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 dark:bg-violet-400/10 flex items-center justify-center text-violet-600 dark:text-violet-400">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-100">
                Visual Analytics
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-sans">
                Gain instant clarity. Spot recurring spending habits via beautiful monthly charts and daily metrics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200/50 dark:border-zinc-800/50 p-6 rounded-2xl backdrop-blur-xs flex flex-col space-y-4 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-100">
                Gemini AI Insights
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-sans">
                Personalized budget reviews. Let Google Gemini generate saving strategies based on your database logs.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200/50 dark:border-zinc-800/50 p-6 rounded-2xl backdrop-blur-xs flex flex-col space-y-4 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-100">
                Asgardeo Security
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-sans">
                Log in and register safely. We protect your logs utilizing WSO2 Asgardeo cloud encryption services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulator" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Try SmartSpend Live
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-sm sm:text-base">
            Add mock values in the panel below and see budget bars and AI advices change dynamically!
          </p>
        </div>

        {/* Embedded Playground */}
        <InteractivePlayground />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50/10 dark:bg-zinc-950/10 border-t border-gray-200/30 dark:border-zinc-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Pricing Options
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-sm sm:text-base">
              Choose the tier that fits your tracking needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200/60 dark:border-zinc-800/60 p-8 rounded-3xl backdrop-blur-md flex flex-col justify-between hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-colors">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-100">Free Tier</h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Excellent for personal budgets</p>
                </div>
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  Rs. 0 <span className="text-sm font-normal text-gray-400 dark:text-zinc-500">/ forever</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Unlimited expense logging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Monthly category breakdowns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Asgardeo authentication safety</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <Link href="/login" className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold cursor-pointer">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pro Tier (Coming soon) */}
            <div className="bg-indigo-950/20 dark:bg-zinc-900/20 border-2 border-indigo-500/40 dark:border-indigo-400/20 p-8 rounded-3xl backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
              {/* Highlight badge */}
              <div className="absolute top-0 right-0 bg-indigo-500 text-white font-semibold text-[10px] px-3 py-1 rounded-bl-xl tracking-wider uppercase">
                Future Update
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-100 flex items-center gap-2">
                    SmartSpend Pro
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">For advanced financial planning</p>
                </div>
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  Rs. 990 <span className="text-sm font-normal text-gray-400 dark:text-zinc-500">/ month</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    <span>Everything in Free tier</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    <span>AI Spending Insights (Google Gemini)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    <span>PDF/Excel monthly data exports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    <span>Custom category limits & alerts</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <Button variant="outline" className="w-full border-indigo-400 text-indigo-600 hover:bg-indigo-50/50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-zinc-800/80 font-bold cursor-pointer">
                  Join the Waitlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Loved by Budget Trackers
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-sm sm:text-base">
            See what our early users say about managing their money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200/50 dark:border-zinc-800/50 p-6 rounded-2xl backdrop-blur-xs flex flex-col space-y-4">
            <p className="text-sm text-gray-600 dark:text-zinc-300 italic font-sans leading-relaxed">
              "SmartSpend completely altered how I handle my budget. Adding items is extremely quick, and the AI suggestions saved me over Rs. 5,000 in food orders last month!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-sm">
                KB
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-100">Kasun Bandara</h4>
                <p className="text-[10px] text-gray-400 dark:text-zinc-500">Software Engineer</p>
              </div>
            </div>
          </div>

          <div className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200/50 dark:border-zinc-800/50 p-6 rounded-2xl backdrop-blur-xs flex flex-col space-y-4">
            <p className="text-sm text-gray-600 dark:text-zinc-300 italic font-sans leading-relaxed">
              "WSO2 Asgardeo sign-in gives me complete peace of mind. Knowing my personal spending records are secure makes it much easier to commit to budgeting."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">
                SP
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-100">Sajith Perera</h4>
                <p className="text-[10px] text-gray-400 dark:text-zinc-500">Project Architect</p>
              </div>
            </div>
          </div>

          <div className="bg-white/40 dark:bg-zinc-900/40 border border-gray-200/50 dark:border-zinc-800/50 p-6 rounded-2xl backdrop-blur-xs flex flex-col space-y-4">
            <p className="text-sm text-gray-600 dark:text-zinc-300 italic font-sans leading-relaxed">
              "The monthly breakdown graphs are beautifully clean. I love being able to quickly identify where my money leaks occur and how to fix them."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">
                AD
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-100">Anusha Dilhani</h4>
                <p className="text-[10px] text-gray-400 dark:text-zinc-500">Digital Creator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-zinc-900/60 dark:to-zinc-950/60 border border-indigo-500/20 dark:border-zinc-800/60 rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Ready to Take Control of Your Financial Future?
          </h2>
          <p className="text-indigo-100 dark:text-zinc-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Join thousands of trackers managing their daily logs and saving money securely.
          </p>
          <div className="pt-2">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white font-extrabold shadow-md cursor-pointer">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white font-extrabold shadow-md cursor-pointer">
                  Create Free Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
