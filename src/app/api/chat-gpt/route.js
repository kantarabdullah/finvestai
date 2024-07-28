import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const params = await request.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: `Pretend you are a Financial Expert with Stock Rating Insights. You have tasks related to the stock ${params.prompt}, and these steps are:

        Step 1: Search the web for news and data such as indicators, market trends, financial reports, industry news, and broader economic factors about ${params.prompt}.

        Step 2: If there is notable data for ${params.prompt}, categorize them into "Strengthening Signals" that indicate the stock price may increase, 
        and "Weakening Signals" that indicate the stock price may decrease. Write a paragraph about the collected data and its effect on ${params.prompt}.

        Step 3: Analyze the ${params.prompt} stock with the data ${params.stockData}. Perform a technical analysis as a financial expert would.

        Format:
        <div class="text-white border bg-violet-500/25 border-violet-500 p-8">
          <h1 class="text-3xl">Stock Analysis for ${params.prompt}</h1>
          
          <h2 class="mt-8 mb-2 text-green-500 text-2xl">Strengthening Signals</h2>
          <p class="mb-1">
            [Strengthening Signals for ${params.prompt}]
          </p>
          
          <h2 class="mt-4 mb-2 text-red-500 text-2xl">Weakening Signals</h2>
          <p class="mb-1">
            [Weakening Signals for ${params.prompt}]
          </p>
          
          <h2 class="mt-4 mb-2 text-2xl">Technical Analysis</h2>
          <p class="technical-analysis">[Technical analysis with ${params.stockData} written like a financial advisor]</p>
        </div>`,
      },
      {
        role: 'user',
        content: params.prompt,
      },
    ],
    temperature: 1,
    max_tokens: 1000,
  })

  return NextResponse.json(response)
}
