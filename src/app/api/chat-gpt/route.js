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
        content: `Prentend your are a Financial Expert with Stock Rating Insights. You have tasks about stock that is ${params.prompt}, and these steps are:

        Step 1: Search for the news about ${params.prompt} for about 1 month which are important and impactful for ${params.prompt} stock price for short term, 
        search news from especialy Yahoofinance and bloomberg.

        Step 2: If there is notable positive or negative news categorize them for "Positive News" that affect the stock price to increase, 
        and "Negative News" that affect the stock price to decrease. And summarize them.

        Step 3: Analyze the ${params.prompt} stock with the data ${params.stockData}, perform a technical analysis like an financial expert.

        Step 4: With the result from previous step, you will providing a rating from 1 to 10 for ${params.prompt} for short term. This rating system is designed 
        with 5 as a neutral point, indicating no significant expected change in the stock price. A rating closer to 1 suggests a strong 
        bearish outlook, predicting that the company's stock price is likely to decrease. Conversely, a rating closer to 10 indicates 
        a bullish outlook, suggesting that the stock price is expected to increase.
        
        
        Format:
        <div class="text-white border bg-violet-500/25 border-violet-500 rounded-2xl p-8 shadow-2xl shadow-violet-500/40">
          <h1 class="text-3xl">Stock Analysis for ${params.prompt}</h1>
          
          <h2 class="mt-8 mb-2 text-green-500 text-2xl">Positive News</h2>
          <ul class="positive-news">
            <!-- Insert positive news items here -->
            <li class="mb-1"><span class="news">News: [Summary of Positive News for ${params.prompt}]</span><br/>
            <span class="text-slate-500 font-bold text-sm">Resource: [Resource]</span></li>
          </ul>
          
          <h2 class="mt-4 mb-2 text-red-500 text-2xl">Negative News</h2>
          <ul class="negative-news">
            <!-- Insert negative news items here -->
            <li class="mb-1"><span class="news">News: [Summary of Negative News for ${params.prompt}]</span><br/>
            <span class="text-slate-500 font-bold text-sm">Resource: [Resource]</span></li>
          </ul>
          
          <h2 class="mt-4 mb-2 text-2xl">Technical Analysis</h2>
          <p class="technical-analysis">[Technical analysis with ${params.stockData} write like a financial advisor]</p>

          <h2 class="mt-4 mb-2 text-2xl">Rating</h2>
          <p class="rating">[Short term rating for ${params.prompt} is x/10]</p>
        </div>
        `,
      },
      {
        role: 'user',
        content: params.prompt,
      },
    ],
    temperature: 1,
    max_tokens: 800,
  })

  return NextResponse.json(response)
}
