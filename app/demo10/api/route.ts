import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? '',
  baseURL: process.env.OPENAI_PROXY_URL ?? '',
})

const encoder = new TextEncoder()

async function* makeIterator(response: any) {
  for await (const chunk of response) {
    const delta = chunk.choices[0].delta.content

    yield encoder.encode(delta)
  }
}

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}

export async function POST(req: any) {
  const { messages } = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })

  return new Response(iteratorToStream(makeIterator(response)))
}
