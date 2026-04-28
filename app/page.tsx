'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HorizontalDivider, BackgroundPattern, CardCornerOrnament } from '@/components/kazakh-ornaments'
import { AnimatedCounter } from '@/components/animated-counter'
import { AIFinanceBlock } from '@/components/ai-finance-block'
import { Shield, BarChart3, ArrowRight, Cpu } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { value: 2.4, prefix: '₸ ', suffix: ' трлн', label: 'ЖИ нарығының болжамды көлемі', decimals: 1 },
  { value: 85, suffix: '%', label: 'қаржы операцияларын автоматтандыру мүмкіндігі', decimals: 0 },
  { value: 3, suffix: 'x', label: 'ЖИ қолданған банктердің тиімділік өсімі', decimals: 0 },
]

const infoCards = [
  {
    icon: Cpu,
    title: 'Автоматтандыру',
    description: 'ЖИ қаржылық процестерді толығымен автоматтандырады',
  },
  {
    icon: Shield,
    title: 'Қауіпсіздік',
    description: 'Жасанды интеллект алаяқтықты бірден анықтайды',
  },
  {
    icon: BarChart3,
    title: 'Талдау',
    description: 'ЖИ мыңдаған деректерді секундтарда талдайды',
  },
]

const timeline = [
  { year: '2015', text: 'Алғашқы ЖИ чат-боттар банктерде' },
  { year: '2018', text: 'Алгоритмдік сауда үлесі 60%-ға жетті' },
  { year: '2021', text: 'DeFi және ЖИ интеграциясы басталды' },
  { year: '2023', text: 'GPT-негізді қаржы кеңесшілері шықты' },
  { year: '2025', text: 'ЖИ-банкинг толық кеңейді' },
  { year: '2030', text: '(болжам) ЖИ барлық қаржы шешімдерінің 90%-ын басқарады' },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundPattern />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in-up">
                <span className="gold-text">Жасанды Интеллект</span>
                <br />
                <span className="text-foreground">және Қаржы</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 fade-in-up delay-100">
                Болашақ экономиканың жаңа моделі
              </p>
              
              {/* CTA Button */}
              <div className="flex items-center justify-center mb-16 fade-in-up delay-200">
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
                >
                  Калькуляторды ашу
                  <ArrowRight size={20} />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto fade-in-up delay-300">
                {stats.map((stat, index) => (
                  <div key={index} className="glass-card p-6 relative">
                    <div className="text-3xl md:text-4xl font-bold gold-text mb-2">
                      <AnimatedCounter 
                        end={stat.value} 
                        prefix={stat.prefix} 
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <HorizontalDivider />
        </section>

        {/* Info Cards Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="gold-text">ЖИ Қаржыда</span>{' '}
              <span className="text-foreground">Қалай Жұмыс Істейді?</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Жасанды интеллект қаржы саласын түбегейлі өзгертуде
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {infoCards.map((card, index) => (
                <div 
                  key={index} 
                  className="glass-card p-8 relative group hover:border-primary/50 transition-all duration-300"
                >
                  <CardCornerOrnament position="top-left" />
                  <CardCornerOrnament position="bottom-right" />
                  
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HorizontalDivider />

        {/* Timeline Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="gold-text">ЖИ және Қаржының</span>{' '}
              <span className="text-foreground">Даму Жолы</span>
            </h2>
            <p className="text-muted-foreground text-center mb-16">
              Технологиялық революцияның негізг�� кезеңдері
            </p>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/30 transform md:-translate-x-px" />
              
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center mb-12 last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}>
                    <div className="glass-card p-6 inline-block">
                      <span className="text-2xl font-bold gold-text">{item.year}</span>
                      <p className="text-muted-foreground mt-2">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Finance Interactive Block */}
        <AIFinanceBlock />

        <HorizontalDivider />

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12 relative">
              <CardCornerOrnament position="top-left" />
              <CardCornerOrnament position="top-right" />
              <CardCornerOrnament position="bottom-left" />
              <CardCornerOrnament position="bottom-right" />
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Қаржылық болашағыңызды <span className="gold-text">ЖИ-мен</span> жоспарлаңыз
              </h2>
              <p className="text-muted-foreground mb-8">
                Калькуляторды қолданып, ақша басқаруды жеңілдетіңіз
              </p>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all"
              >
                Калькуляторды ашу
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
