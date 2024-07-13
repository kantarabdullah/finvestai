'use client'

import { useState } from 'react'
import PromptForm from '@/components/PromptForm'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [choices, setChoices] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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

            const response = await fetch('/api/chat-gpt', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt,
              }),
            })

            setIsLoading(false)

            const result = await response.json()
            setChoices(result.choices)
          }}
        />

        {choices.map((choice) => {
          return (
            <p className="text-white mt-8 w-full" key={choice.index}>
              <ReactMarkdown>{choice.message.content}</ReactMarkdown>
            </p>
          )
        })}
      </div>
    </main>
  )
}
