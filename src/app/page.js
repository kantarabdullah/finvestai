'use client'

import { useState } from 'react'
import PromptForm from '@/components/PromptForm'
import TVWidget from '@/components/TradingViewWidget'

export default function Home() {
  const [choices, setChoices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [tvSymbol, setTvSymbol] = useState('AAPL')
  const [tvBlur, setTvBlur] = useState(true)

  return (
    <main>
      <div className="p-8">
        <h1 className="text-center text-4xl font-bold my-8 text-white">
          Stock Analysis
        </h1>

        <PromptForm
          isLoading={isLoading}
          onSubmit={async (prompt) => {
            setIsLoading(true)

            const stock = await fetch('/api/stock', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt,
              }),
            })
            const stockData = await stock.json()

            const chatgpt = await fetch('/api/chat-gpt', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt,
                stockData,
              }),
            })

            setIsLoading(false)

            setTvSymbol(prompt)
            setTvBlur(false)

            const chatgptData = await chatgpt.json()
            setChoices(chatgptData.choices)
          }}
        />

        {choices.map((choice) => {
          return (
            <div className="text-white mt-8 w-full" key={choice.index}>
              <div
                dangerouslySetInnerHTML={{ __html: choice.message.content }}
              />
            </div>
          )
        })}

        <div className="mt-8 h-[610px]">
          <TVWidget symbol={tvSymbol} blur={tvBlur} />
        </div>
      </div>
    </main>
  )
}
