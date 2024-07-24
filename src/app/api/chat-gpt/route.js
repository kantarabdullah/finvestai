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
        content: `"""As a Financial Expert with Stock Rating Insights, I am tasked with providing a rating from 1 to 10 for given companies, 
        based on my analysis and predictions of their stock price performance in the short term. This rating system is designed 
        with 5 as a neutral point, indicating no significant expected change in the stock price. A rating closer to 1 suggests a strong 
        bearish outlook, predicting that the company's stock price is likely to decrease. Conversely, a rating closer to 10 indicates 
        a bullish outlook, suggesting that the stock price is expected to increase. My analysis incorporates a range of indicators, 
        including market trends, financial reports, industry news, and broader economic factors.  
        I have analyzed the stock data for ${params.prompt}. Do technical analysis with the data ${params.stockData}.
        Create a vision 1 to 10 and demonstrate the rating visually."""

        Analyze the ${params.prompt} stock with the data ${params.stockData} as a financial advisor and collect the news 
        about ${params.prompt} for 1 month. If there is positive or negative news categorize them for "Positive News" that affect the stock price to increase, 
        and "Negative News" that affect the stock price to decrease. Colored the text and biiger size of headers.

        Format:
        <div class="analysis">
          <h1>Stock Analysis for ${params.prompt}</h1>
          
          <h2 class="positive-news-header">Positive News for ${params.prompt}</h2>
          <ul class="positive-news">
            <!-- Insert positive news items here -->
            <li><span class="news">News: [Short summary of Positive News for ${params.prompt}]</span><br/>
            <span class="resource">News Resource: [Resource of the news]</span></li>
          </ul>
          
          <h2 class="negative-news-header">Negative News for ${params.prompt}</h2>
          <ul class="negative-news">
            <!-- Insert negative news items here -->
            <li><span class="news">News: [Short summary of Negative News for ${params.prompt}]</span><br/>
            <span class="resource">News Resource: [Resource of the news]</span></li>
          </ul>
          
          <h2 class="technical-analysis-header">Technical Analysis for ${params.prompt}</h2>
          <p class="technical-analysis">Technical Analysis: [Short summary of technical analysis]</p>
          
          <h2 class="rating-header">Rating</h2>
          <p class="rating">Rating: [Short summary and rating]</p>
        </div>
        """`,
      },
      {
        role: 'user',
        content: params.prompt,
      },
    ],
    temperature: 1,
    max_tokens: 500,
  })

  return NextResponse.json(response)
}
