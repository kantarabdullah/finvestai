'use client'

import { useState } from 'react'
import PromptForm from '@/components/PromptForm'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [choices, setChoices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [stocks, setStocks] = useState([])

  return (
    <main className="bg-black min-h-screen flex flex-col items-center justify-center">
      <div className="p-8 w-3/4 bg-gray-800 rounded-lg shadow-md">
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
            setStocks(stockData)

            const chatgpt = await fetch('/api/chat-gpt', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt, stockData
              }),
            })

            setIsLoading(false)

            const chatgptData = await chatgpt.json()
            setChoices(chatgptData.choices)
          }}
        />

        {choices.map((choice) => {
          return (
            <div className="text-white mt-8 w-full" key={choice.index}>
              <div dangerouslySetInnerHTML={{ __html: choice.message.content }} />
            </div>
          )
        })}
      </div>
    </main>
  )
}
