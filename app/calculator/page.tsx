'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BackgroundPattern, CardCornerOrnament } from '@/components/kazakh-ornaments'
import { Wallet, Building2, ArrowLeftRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const tabs = [
  { id: 'investment', label: 'Инвестиция Калькуляторы', icon: Wallet },
  { id: 'loan', label: 'Несие Калькуляторы', icon: Building2 },
  { id: 'currency', label: 'Валюта Конвертері', icon: ArrowLeftRight },
]

// Currency rates based on user-provided data
const currencyRates: Record<string, Record<string, number>> = {
  KZT: { KZT: 1, USD: 0.00219, EUR: 0.00187, RUB: 0.1645, CNY: 0.01495, GBP: 0.00162 },
  USD: { KZT: 457.21, USD: 1, EUR: 0.8554, RUB: 75.20, CNY: 6.832, GBP: 0.7407 },
  EUR: { KZT: 534.62, USD: 1.1690, EUR: 1, RUB: 87.93, CNY: 7.992, GBP: 0.8661 },
  RUB: { KZT: 6.08, USD: 0.01330, EUR: 0.01137, RUB: 1, CNY: 0.09095, GBP: 0.009853 },
  CNY: { KZT: 66.89, USD: 0.14633, EUR: 0.12513, RUB: 11.004, CNY: 1, GBP: 0.1083 },
  GBP: { KZT: 616.50, USD: 1.3501, EUR: 1.1548, RUB: 101.53, CNY: 9.2267, GBP: 1 },
}

const currencies = ['KZT', 'USD', 'EUR', 'RUB', 'CNY', 'GBP']

const currencySymbols: Record<string, string> = {
  KZT: '₸',
  USD: '$',
  EUR: '€',
  RUB: '₽',
  CNY: '¥',
  GBP: '£',
}

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState('investment')

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundPattern />
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gold-text">Қаржы</span>{' '}
            <span className="text-foreground">Калькуляторы</span>
          </h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Инвестициялар, несиелер және валюта конверсиясы үшін арнайы құралдар
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                <tab.icon size={20} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Calculator Content */}
          <div className="glass-card p-6 md:p-8 relative">
            <CardCornerOrnament position="top-left" />
            <CardCornerOrnament position="top-right" />
            <CardCornerOrnament position="bottom-left" />
            <CardCornerOrnament position="bottom-right" />
            
            {activeTab === 'investment' && <InvestmentCalculator />}
            {activeTab === 'loan' && <LoanCalculator />}
            {activeTab === 'currency' && <CurrencyConverter />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function InvestmentCalculator() {
  const [principal, setPrincipal] = useState(1000000)
  const [monthly, setMonthly] = useState(50000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const r = rate / 100 / 12
    const n = years * 12
    
    // Future value of initial principal
    const fvPrincipal = principal * Math.pow(1 + r, n)
    
    // Future value of monthly contributions
    const fvMonthly = monthly * ((Math.pow(1 + r, n) - 1) / r)
    
    const total = fvPrincipal + fvMonthly
    const totalContributed = principal + (monthly * n)
    const profit = total - totalContributed

    // Generate yearly data for chart
    const yearlyData = []
    for (let y = 1; y <= years; y++) {
      const months = y * 12
      const fvP = principal * Math.pow(1 + r, months)
      const fvM = monthly * ((Math.pow(1 + r, months) - 1) / r)
      yearlyData.push({
        year: `${y} жыл`,
        value: Math.round(fvP + fvM),
        contribution: principal + (monthly * months),
      })
    }

    return { total, profit, totalContributed, yearlyData }
  }, [principal, monthly, rate, years])

  const riskLevel = useMemo(() => {
    if (rate <= 8) return { text: 'Төмен тәуекел', color: 'text-green-400' }
    if (rate <= 15) return { text: 'Орташа тәуекел', color: 'text-yellow-400' }
    return { text: 'Жоғары тәуекел', color: 'text-red-400' }
  }, [rate])

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold gold-text mb-6">Деректерді енгізіңіз</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Бастапқы сома (₸): <span className="text-primary">{principal.toLocaleString('kk-KZ')}</span>
          </label>
          <input
            type="range"
            min={100000}
            max={50000000}
            step={100000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>₸100,000</span>
            <span>₸50,000,000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Ай сайынғы толықтыру (₸): <span className="text-primary">{monthly.toLocaleString('kk-KZ')}</span>
          </label>
          <input
            type="range"
            min={0}
            max={1000000}
            step={10000}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>₸0</span>
            <span>₸1,000,000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Жылдық пайыз мөлшерлемесі: <span className="text-primary">{rate}%</span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1%</span>
            <span>30%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Мерзім: <span className="text-primary">{years} жыл</span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 жыл</span>
            <span>30 жыл</span>
          </div>
        </div>

        {/* AI Prediction Card */}
        <div className="glass-card p-4 border-accent/30">
          <p className="text-sm text-muted-foreground mb-1">ЖИ болжамы:</p>
          <p className="font-medium">
            Осы стратегия <span className={riskLevel.color}>{riskLevel.text}</span> деңгейінде.
            {rate > 12 && ' Жоғары пайыздық мөлшерлеме нарық тәуекелдерін арттырады.'}
            {rate <= 8 && ' Консервативті тәсіл ұзақ мерзімді тұрақтылықты қамтамасыз етеді.'}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold gold-text mb-6">Нәтижелер</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-1">Қорытынды сома</p>
            <p className="text-2xl font-bold gold-text">
              ₸{Math.round(result.total).toLocaleString('kk-KZ')}
            </p>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-1">Пайда</p>
            <p className="text-2xl font-bold teal-text">
              ₸{Math.round(result.profit).toLocaleString('kk-KZ')}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={result.yearlyData}>
              <XAxis 
                dataKey="year" 
                stroke="#ffffff60" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#ffffff60" 
                fontSize={12}
                tickFormatter={(value) => `₸${(value / 1000000).toFixed(1)}M`}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0A0F2C', 
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`₸${value.toLocaleString('kk-KZ')}`, '']}
                labelStyle={{ color: '#D4AF37' }}
              />
              <Bar dataKey="contribution" fill="#00D4FF40" name="Салымдар" radius={[4, 4, 0, 0]} />
              <Bar dataKey="value" fill="#D4AF37" name="Жалпы" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function LoanCalculator() {
  const [amount, setAmount] = useState(5000000)
  const [rate, setRate] = useState(18)
  const [months, setMonths] = useState(24)

  const result = useMemo(() => {
    const r = rate / 100 / 12
    const emi = amount * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)
    const totalPayment = emi * months
    const totalInterest = totalPayment - amount

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principalPercent: Math.round((amount / totalPayment) * 100),
      interestPercent: Math.round((totalInterest / totalPayment) * 100),
    }
  }, [amount, rate, months])

  const pieData = [
    { name: 'Негізгі қарыз', value: amount, color: '#D4AF37' },
    { name: 'Пайыздар', value: result.totalInterest, color: '#00D4FF' },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold gold-text mb-6">Несие деректері</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Несие сомасы (₸): <span className="text-primary">{amount.toLocaleString('kk-KZ')}</span>
          </label>
          <input
            type="range"
            min={100000}
            max={100000000}
            step={100000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>₸100,000</span>
            <span>₸100,000,000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Жылдық мөлшерлеме: <span className="text-primary">{rate}%</span>
          </label>
          <input
            type="range"
            min={5}
            max={50}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5%</span>
            <span>50%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Мерзім: <span className="text-primary">{months} ай</span>
          </label>
          <input
            type="range"
            min={3}
            max={360}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>3 ай</span>
            <span>360 ай (30 жыл)</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold gold-text mb-6">Төлем кестесі</h3>
        
        <div className="space-y-4">
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-1">Ай сайынғы төлем</p>
            <p className="text-3xl font-bold gold-text">
              ₸{result.emi.toLocaleString('kk-KZ')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Жалпы төлем</p>
              <p className="text-xl font-bold text-foreground">
                ₸{result.totalPayment.toLocaleString('kk-KZ')}
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="text-sm text-muted-foreground mb-1">Артық төлем</p>
              <p className="text-xl font-bold teal-text">
                ₸{result.totalInterest.toLocaleString('kk-KZ')}
              </p>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0A0F2C', 
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`₸${value.toLocaleString('kk-KZ')}`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Негізгі қарыз ({result.principalPercent}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Пайыздар ({result.interestPercent}%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CurrencyConverter() {
  const [amount, setAmount] = useState(100000)
  const [fromCurrency, setFromCurrency] = useState('KZT')
  const [toCurrency, setToCurrency] = useState('USD')

  const convertedAmount = useMemo(() => {
    const rate = currencyRates[fromCurrency][toCurrency]
    return amount * rate
  }, [amount, fromCurrency, toCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Converter */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold gold-text mb-6">Валюта конверсиясы</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Сома</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full p-4 bg-muted/50 border border-border rounded-lg text-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Қайдан</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-4 bg-muted/50 border border-border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>{c} ({currencySymbols[c]})</option>
                ))}
              </select>
            </div>

            <button
              onClick={swapCurrencies}
              className="mt-6 p-3 glass-card hover:border-primary transition-colors rounded-full"
            >
              <ArrowLeftRight size={20} className="text-primary" />
            </button>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Қайда</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-4 bg-muted/50 border border-border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>{c} ({currencySymbols[c]})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Нәтиже</p>
            <p className="text-4xl font-bold gold-text">
              {currencySymbols[toCurrency]}{convertedAmount.toLocaleString('kk-KZ', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              1 {fromCurrency} = {currencyRates[fromCurrency][toCurrency].toFixed(4)} {toCurrency}
            </p>
          </div>
        </div>

        {/* Rate Table */}
        <div>
          <h3 className="text-xl font-semibold gold-text mb-6">Айырбас бағамдары</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium"></th>
                  {currencies.map((c) => (
                    <th key={c} className="text-right py-3 px-2 text-muted-foreground font-medium">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currencies.map((from) => (
                  <tr key={from} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-2 font-medium text-primary">{from}</td>
                    {currencies.map((to) => (
                      <td key={to} className="text-right py-3 px-2 tabular-nums">
                        {from === to ? '1' : currencyRates[from][to].toFixed(
                          currencyRates[from][to] < 0.01 ? 5 : 
                          currencyRates[from][to] < 1 ? 4 : 2
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
