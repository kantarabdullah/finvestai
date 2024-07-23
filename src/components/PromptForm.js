import { useEffect, useRef, useState } from 'react'

export default function PromptForm({ onSubmit, isLoading }) {
  const [stocks, setStocks] = useState([])
  const [prompt, setPrompt] = useState('')
  const [focus, setFocus] = useState(false)
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  const trends = ['NVDA', 'TSLA', 'AAPL', 'AMZN', 'MSFT', 'META']

  useEffect(() => {
    fetch('/stocks.json')
      .then((response) => response.json())
      .then((data) => {
        const stock = data.data.map((d) => {
          return d.symbol
        })
        setStocks(stock)
      })
  }, [])

  const filterStock = () => {
    const filter = stocks.filter((item) =>
      item.toUpperCase().includes(prompt.toUpperCase())
    )
    return filter
  }
  const containsStock = () => {
    const contains = stocks.includes(prompt.toUpperCase())
    return contains
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        if (!containsStock()) {
          setError(true)
          return
        }

        setError(false)
        onSubmit(prompt)
        setPrompt('')
      }}
      className="flex flex-col items-center justify-center"
    >
      <label
        for="search"
        className="mb-2 text-sm font-medium sr-only text-white"
      >
        Search
      </label>

      {error && (
        <div
          className="flex items-center p-3 mb-4 text-sm border rounded-lg bg-gray-800 text-red-400 border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">
              Change the symbol and try again.
            </span>
          </div>
        </div>
      )}

      <div className="relative w-full lg:w-auto">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          onFocus={(e) => {
            setFocus(true)
          }}
          onBlur={(e) => {
            if (e.relatedTarget && e.relatedTarget.id === 'preventBlurDiv') {
              e.preventDefault()
              return
            }
            setFocus(false)
          }}
          type="search"
          id="search"
          disabled={isLoading}
          value={prompt}
          className={`${filterStock().length !== 0 ? 'focus:border-b-gray-700 focus:rounded-b-none' : null} shadow-2xl shadow-violet-500/40 block w-full lg:w-[48rem] p-4 ps-12 focus:outline-none border rounded-2xl bg-gray-700 border-violet-500 placeholder-gray-400 text-white`}
          placeholder="Enter a stock symbol"
          autocomplete="off"
          onChange={(e) => {
            setPrompt(e.target.value)
          }}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="text-white absolute end-[7px] bottom-[7px] bg-violet-500 focus:ring-4 focus:outline-none focus:ring-violet-600 hover:bg-violet-400 duration-200 font-medium rounded-2xl w-24 py-2.5"
        >
          {isLoading ? (
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-center m-auto animate-spin text-gray-600 fill-violet-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {focus && filterStock().length ? (
        <div
          id="preventBlurDiv"
          onMouseDown={(e) => {
            e.preventDefault()
            if (inputRef.current) {
              inputRef.current.focus()
            }
          }}
          className="flex justify-center relative w-full lg:w-auto"
        >
          {prompt.length > 1 ? (
            <ul className="flex absolute overflow-y-scroll scroll-smooth bg-scroll max-h-60 font-medium justify-start text-sm flex-col w-full lg:w-[48rem] border border-t-0 rounded-b-2xl bg-gray-700 border-violet-500 placeholder-gray-400 text-white">
              {filterStock().map((stock, index) => (
                <li
                  onClick={(e) => {
                    setPrompt(stock)
                  }}
                  key={index}
                  className="last:rounded-b-2xl flex flex-row items-center gap-2 py-2 px-4 hover:bg-gray-600 cursor-pointer"
                >
                  <svg
                    className="w-3 h-3 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <p>{stock}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex absolute overflow-y-scroll scroll-smooth bg-scroll max-h-60 font-medium justify-center text-sm flex-col w-full lg:w-[48rem] border border-t-0 rounded-b-2xl bg-gray-700 border-violet-500 placeholder-gray-400 text-white">
              {trends.map((trend, index) => (
                <li
                  onClick={(e) => {
                    setPrompt(trend)
                  }}
                  key={index}
                  className="last:rounded-b-2xl flex flex-row items-center gap-2 py-2 px-4 hover:bg-gray-600 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 17.5l6-6 4 4L21.5 7"
                    ></path>
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15.5 7h6v6"
                    ></path>
                  </svg>
                  <p>{trend}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </form>
  )
}
