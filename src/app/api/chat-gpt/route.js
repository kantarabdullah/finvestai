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
        content: `As a Financial Expert with Stock Rating Insights, I have analyzed the stock data for ${params.prompt}.
         Do technical analysis with the data ${params.stockData}. when doing technical analysis use the term that are given in data, forexample volume,open,high,close etc.
      
        Format:
        
        ### Stock Analysis for ${params.prompt}
        ### Conclusion
        - **Financial Data Summary**: 
        - **Volume**: [Volume value]
        - **open**: [Volume value]
        - **close**: [Volume value]
        - **Market Cap**: [Market Cap value]
        - **Technical Analysis**: [Short summary of technical analysis],`
      },
      {
        role: 'user',
        content: params.prompt,
      },
    ],
    temperature: 1,
    max_tokens: 324,
  })

  return NextResponse.json(response)
}
