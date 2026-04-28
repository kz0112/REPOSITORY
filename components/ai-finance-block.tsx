'use client'

import { useState } from 'react'
import { Brain, TrendingUp, Shield, Zap, ChevronRight, Sparkles, BarChart3, Globe, Lock, Cpu } from 'lucide-react'
import { CardCornerOrnament } from './kazakh-ornaments'

const topics = [
  {
    id: 'trading',
    icon: TrendingUp,
    title: 'Алгоритмдік сауда',
    subtitle: 'ЖИ нарықты талдап, автоматты шешімдер қабылдайды',
    color: 'from-amber-500 to-yellow-600',
    stats: [
      { label: 'Сауда жылдамдығы', value: '0.001 сек', icon: Zap },
      { label: 'Дәлдігі', value: '94%', icon: BarChart3 },
      { label: 'Нарық үлесі', value: '73%', icon: Globe },
    ],
    content: {
      description: 'Алгоритмдік сауда — бұл компьютерлік бағдарламалар арқылы автоматты түрде сауда жасау процесі. ЖИ миллисекундтарда мыңдаған деректерді талдап, адамнан әлдеқайда жылдам шешім қабылдайды.',
      benefits: [
        'Эмоциясыз, логикалық шешімдер',
        'Бір мезетте мыңдаған активтерді бақылау',
        'Нарық өзгерістеріне лезде бейімделу',
        '24/7 үздіксіз жұмыс істеу мүмкіндігі',
      ],
      futureText: '2030 жылға қарай алгоритмдік сауда жаһандық нарықтардың 90%-ын басқарады деп болжануда.',
    },
  },
  {
    id: 'fraud',
    icon: Shield,
    title: 'Алаяқтықты анықтау',
    subtitle: 'Күдікті транзакцияларды бірден табады',
    color: 'from-cyan-500 to-teal-600',
    stats: [
      { label: 'Анықтау уақыты', value: '< 1 сек', icon: Zap },
      { label: 'Дәлдігі', value: '99.7%', icon: Shield },
      { label: 'Жылдық үнемдеу', value: '$25B+', icon: TrendingUp },
    ],
    content: {
      description: 'ЖИ-негізді алаяқтықты анықтау жүйелері миллиондаған транзакцияларды нақты уақытта талдап, күдікті әрекеттерді бірден анықтайды. Бұл банктер мен клиенттерге миллиардтаған долларды үнемдеуге көмектеседі.',
      benefits: [
        'Нақты уақыттағы мониторинг',
        'Жалған оң нәтижелердің азаюы',
        'Жаңа алаяқтық схемаларын үйрену',
        'Көп арналы талдау (IP, құрылғы, мінез-құлық)',
      ],
      futureText: 'Келешекте ЖИ биометриялық деректермен біріктіріліп, алаяқтықты толығымен жоюға жақындайды.',
    },
  },
  {
    id: 'risk',
    icon: BarChart3,
    title: 'Тәуекелді бағалау',
    subtitle: 'Несие тәуекелін дәлірек есептейді',
    color: 'from-violet-500 to-purple-600',
    stats: [
      { label: 'Деректер көзі', value: '1000+', icon: Globe },
      { label: 'Болжам дәлдігі', value: '89%', icon: Brain },
      { label: 'Шешім уақыты', value: '< 5 мин', icon: Zap },
    ],
    content: {
      description: 'Дәстүрлі несие скорингі тек қаржылық тарихты ескерсе, ЖИ мыңдаған параметрлерді талдайды: әлеуметтік медиа, онлайн мінез-құлық, жұмыс тұрақтылығы және т.б.',
      benefits: [
        'Дәстүрлі деректері жоқ адамдарға несие беру',
        'Тәуекел факторларын тереңірек түсіну',
        'Динамикалық несие лимиттері',
        'Дефолт ықтималдығын дәлірек болжау',
      ],
      futureText: 'ЖИ банктік емес деректерді қолданып, әркімге әділ несие мүмкіндігін ұсынады.',
    },
  },
  {
    id: 'automation',
    icon: Cpu,
    title: 'Қаржылық автоматтандыру',
    subtitle: 'Рутиналық жұмыстарды ЖИ орындайды',
    color: 'from-emerald-500 to-green-600',
    stats: [
      { label: 'Уақыт үнемдеу', value: '85%', icon: Zap },
      { label: 'Қате азаюы', value: '95%', icon: Shield },
      { label: 'Шығын үнемдеу', value: '40%', icon: TrendingUp },
    ],
    content: {
      description: 'ЖИ бухгалтерия, есептілік, аудит және басқа рутиналық қаржылық процестерді автоматтандырады. Бұл адамдарға стратегиялық шешімдерге көбірек уақыт бөлуге мүмкіндік береді.',
      benefits: [
        'Автоматты шот-фактура өңдеу',
        'Нақты уақыттағы қаржылық есептілік',
        'Ақша ағынын болжау',
        'Сәйкестік мониторингі',
      ],
      futureText: 'Болашақта қаржылық операциялардың 90%-ы толығымен автоматтандырылады.',
    },
  },
]

export function AIFinanceBlock() {
  const [activeTopic, setActiveTopic] = useState(topics[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const handleTopicChange = (topic: typeof topics[0]) => {
    if (topic.id === activeTopic.id) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveTopic(topic)
      setIsAnimating(false)
    }, 150)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Интерактивті зерттеу</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gold-text">Жасанды интеллект</span>{' '}
            <span className="text-foreground">және қаржы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Болашақ экономиканың жаңа моделі — ЖИ қаржы саласын қалай өзгертіп жатқанын зерттеңіз
          </p>
        </div>

        {/* Interactive Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Topic Selector */}
          <div className="lg:col-span-1 space-y-3">
            {topics.map((topic) => {
              const Icon = topic.icon
              const isActive = activeTopic.id === topic.id
              return (
                <button
                  key={topic.id}
                  onClick={() => handleTopicChange(topic)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 group ${
                    isActive
                      ? 'glass-card border-primary/50 shadow-lg shadow-primary/10'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${topic.color} ${
                        isActive ? 'scale-110' : 'opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{topic.subtitle}</p>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-all ${
                        isActive ? 'text-primary rotate-90' : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Content Display */}
          <div className="lg:col-span-2">
            <div
              className={`glass-card p-8 relative overflow-hidden transition-all duration-300 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <CardCornerOrnament position="top-left" />
              <CardCornerOrnament position="top-right" />
              <CardCornerOrnament position="bottom-left" />
              <CardCornerOrnament position="bottom-right" />

              {/* Gradient Background */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br ${activeTopic.color} opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2`}
              />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {activeTopic.stats.map((stat, index) => {
                  const StatIcon = stat.icon
                  return (
                    <div
                      key={index}
                      className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <StatIcon className="w-5 h-5 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold gold-text">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Бұл не?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {activeTopic.content.description}
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Артықшылықтары
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeTopic.content.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Future Prediction */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Болашақ болжамы</h4>
                    <p className="text-sm text-muted-foreground">{activeTopic.content.futureText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
