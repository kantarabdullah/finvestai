import React, { useEffect, useRef, memo } from 'react'

function TradingViewWidget({ symbol, blur }) {
  const container = useRef()

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ''
    }

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
          {
            "autosize": true,
            "symbol": "NASDAQ:${symbol}",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "backgroundColor": "rgb(139 92 246 / 0.25)",
            "hide_top_toolbar": true,
            "details": true,
            "hotlist": false,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
          }`

    container.current.appendChild(script)
  }, [symbol])

  return (
    <div
      className={`${blur ? 'blur-sm' : ''} z-10 tradingview-widget-container`}
      ref={container}
      style={{ height: '100%', width: '100%' }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: 'calc(100% - 32px)', width: '100%' }}
      ></div>
    </div>
  )
}

export default memo(TradingViewWidget)
