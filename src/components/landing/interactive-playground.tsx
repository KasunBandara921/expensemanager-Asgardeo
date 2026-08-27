"use client"

import { useState } from "react"
import { Plus, Trash2, Sparkles, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type MockExpense = {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  Food: { bg: "bg-amber-500/10 dark:bg-amber-500/20", text: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500" },
  Entertainment: { bg: "bg-violet-500/10 dark:bg-violet-500/20", text: "text-violet-600 dark:text-violet-400", bar: "bg-violet-500" },
  Utilities: { bg: "bg-blue-500/10 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400", bar: "bg-blue-500" },
  Fitness: { bg: "bg-emerald-500/10 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500" },
  Transport: { bg: "bg-rose-500/10 dark:bg-rose-500/20", text: "text-rose-600 dark:text-rose-400", bar: "bg-rose-500" },
}

const INITIAL_EXPENSES: MockExpense[] = [
  { id: "1", description: "Venti Iced Latte", amount: 450, category: "Food", date: "Today" },
  { id: "2", description: "Monthly Gym Membership", amount: 4500, category: "Fitness", date: "Yesterday" },
  { id: "3", description: "Fiber Internet Subscription", amount: 3200, category: "Utilities", date: "2 days ago" },
  { id: "4", description: "Movie Tickets & Popcorn", amount: 1800, category: "Entertainment", date: "3 days ago" },
]

export function InteractivePlayground() {
  const [expenses, setExpenses] = useState<MockExpense[]>(INITIAL_EXPENSES)
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")
  const [budgetLimit, setBudgetLimit] = useState(20000)
  const [insightsActive, setInsightsActive] = useState(false)

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0)
  const budgetPercentage = Math.min((totalSpent / budgetLimit) * 100, 100)

  // Calculate category totals
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim() || !amount) return

    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) return

    const newExpense: MockExpense = {
      id: Date.now().toString(),
      description: description.trim(),
      amount: numericAmount,
      category,
      date: "Just now",
    }

    setExpenses([newExpense, ...expenses])
    setDescription("")
    setAmount("")
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const handleReset = () => {
    setExpenses(INITIAL_EXPENSES)
    setInsightsActive(false)
  }

  // AI Mock Insights
  const generateAIMockInsights = () => {
    setInsightsActive(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Input Form & Stats */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-gray-200/60 dark:border-zinc-800/60 shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Live Expense Simulator
            </CardTitle>
            <CardDescription>
              Test out the core interface features instantly. No account required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1">
                  Description
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Weekly Grocery Run"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/40 dark:bg-zinc-950/40 border-gray-200 dark:border-zinc-800 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1">
                    Amount (Rs.)
                  </label>
                  <Input
                    type="number"
                    placeholder="1200"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-white/40 dark:bg-zinc-950/40 border-gray-200 dark:border-zinc-800 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 text-sm text-gray-800 dark:text-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
                  >
                    {Object.keys(CATEGORY_COLORS).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium shadow-sm transition-all duration-200 mt-2 gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Mock Expense
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Budget Progress Card */}
        <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-gray-200/60 dark:border-zinc-800/60 shadow-lg">
          <CardHeader className="pb-3 flex flex-row justify-between items-center space-y-0">
            <div>
              <CardTitle className="text-sm font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                Monthly Budget Limit
              </CardTitle>
              <p className="text-xl font-bold text-gray-800 dark:text-zinc-100 mt-1">
                Rs. {totalSpent.toLocaleString()} / Rs. {budgetLimit.toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-indigo-500 transition-colors"
              title="Reset Simulator"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress Bar Container */}
            <div className="relative w-full h-3 bg-gray-200/60 dark:bg-zinc-800/60 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  budgetPercentage > 85
                    ? "bg-rose-500"
                    : budgetPercentage > 60
                    ? "bg-amber-500"
                    : "bg-indigo-600 dark:bg-indigo-500"
                }`}
                style={{ width: `${budgetPercentage}%` }}
              />
            </div>
            {budgetPercentage >= 100 ? (
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Over budget! Consider reducing entertainment or dining out.</span>
              </div>
            ) : budgetPercentage > 80 ? (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Approaching budget limit. 80% used.</span>
              </div>
            ) : (
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                Budget resets at the end of the month. Add items above to test alerts.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Expense List & AI Recommendation Box */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-gray-200/60 dark:border-zinc-800/60 shadow-lg min-h-[300px] flex flex-col">
          <CardHeader className="border-b border-gray-200/40 dark:border-zinc-800/40 pb-4">
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-zinc-100">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow pt-4">
            {expenses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400 dark:text-zinc-500">
                <p className="text-sm">No expenses remaining. Add some to populate the tracker.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {expenses.map((expense) => {
                  const colors = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Food
                  return (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-100/60 dark:border-zinc-800/40 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-xs hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:bg-white/80 dark:hover:bg-zinc-900/40 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                          {expense.category}
                        </span>
                        <div>
                          <p className="font-semibold text-sm text-gray-800 dark:text-zinc-100">
                            {expense.description}
                          </p>
                          <p className="text-[10px] text-gray-400 dark:text-zinc-500">
                            {expense.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-gray-800 dark:text-zinc-100">
                          Rs. {expense.amount.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Delete Expense"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dynamic Category Breakdown */}
        <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-gray-200/60 dark:border-zinc-800/60 shadow-lg">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-gray-800 dark:text-zinc-100">
              Category Breakdown
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={generateAIMockInsights}
              className="gap-1.5 text-xs border-indigo-200 hover:bg-indigo-50/50 dark:border-zinc-800 dark:hover:bg-zinc-900/80 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
              Analyze Category Spending
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenses.length === 0 ? (
              <p className="text-xs text-gray-400 dark:text-zinc-500 text-center py-4">
                Add mock expenses to see breakdowns.
              </p>
            ) : (
              <div className="space-y-3">
                {Object.keys(CATEGORY_COLORS).map((cat) => {
                  const amt = categoryTotals[cat] || 0
                  const pct = totalSpent > 0 ? (amt / totalSpent) * 100 : 0
                  const colors = CATEGORY_COLORS[cat]

                  if (amt === 0) return null

                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-zinc-300">
                        <span>{cat}</span>
                        <span>Rs. {amt.toLocaleString()} ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200/50 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Simulated Gemini Recommendation box */}
            {insightsActive && (
              <div className="border border-indigo-200/60 dark:border-indigo-900/30 bg-gradient-to-br from-indigo-50/50 to-violet-50/30 dark:from-indigo-950/20 dark:to-zinc-950/40 p-4 rounded-xl space-y-2 animate-fadeIn">
                <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 font-sans">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  Gemini Smart Recommendation
                </h4>
                <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed font-sans">
                  {categoryTotals["Fitness"] && categoryTotals["Fitness"] > 4000 ? (
                    "Your Fitness spending represents a significant portion of your budget. Consider swapping your premium gym membership for budget-friendly alternatives or pay-per-visit plans to save up to Rs. 2,000 this month."
                  ) : categoryTotals["Food"] && categoryTotals["Food"] > 2000 ? (
                    "We noticed multiple transaction logs for small snacks and coffee. Consolidating your dining expenses or planning grocery meal prep can cut down food expenses by 15-20%."
                  ) : (
                    "Great work on tracking your items! Your category spending distribution looks healthy. Keep logging expenses to help Gemini construct more targeted recommendations."
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
