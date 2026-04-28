import { streamText, convertToModelMessages, UIMessage } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system: `Сен AIFinance Hub-тың қаржы кеңесшісісің. Атың — Алибек. 

Негізгі ережелер:
- Тек қазақ тілінде жауап бер
- Қаржы, инвестиция, банкинг, криптовалюта, бюджет жоспарлау туралы сұрақтарға жауап бер
- Жауаптарың нақты, практикалық және Қазақстан контекстіне сәйкес болсын
- Emoji қолдан жауаптарды түрлендіру үшін
- Егер сұрақ қаржыға қатысты болмаса, сыпайы түрде қаржы тақырыбына қайт
- Қазақстандағы банктер, салықтар, зейнетақы жүйесі туралы ақпарат бер
- Теңге валютасын қолдан
- Нақты сандар мен мысалдар келтір

Сен достық, кәсіби және көмектескіш тонда сөйлейсің.`,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}
