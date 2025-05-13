"use client"

import { useState } from "react"
import { HeroSection } from "./hero-section"
import { SearchSection } from "./search-section"
import { ResultsSection } from "./results-section"

export type StockData = {
  symbol: string
  name: string
  currentPrice: number
  predictedPrice: number
  confidenceScore: number
  predictionDate: string
  historicalData: { date: string; price: number }[]
}

export function StockPredictionApp() {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)

  const handleSearch = (symbol: string) => {
    // Generate dummy data for the selected stock
    const dummyStocks: Record<string, StockData> = {
      AAPL: {
        symbol: "AAPL",
        name: "Apple Inc.",
        currentPrice: 187.68,
        predictedPrice: 205.42,
        confidenceScore: 87,
        predictionDate: "2025-06-06",
        historicalData: generateHistoricalData(180, 150, 190),
      },
      GOOG: {
        symbol: "GOOG",
        name: "Alphabet Inc.",
        currentPrice: 176.32,
        predictedPrice: 192.15,
        confidenceScore: 82,
        predictionDate: "2025-06-06",
        historicalData: generateHistoricalData(170, 140, 180),
      },
      TSLA: {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        currentPrice: 245.67,
        predictedPrice: 278.92,
        confidenceScore: 75,
        predictionDate: "2025-06-06",
        historicalData: generateHistoricalData(240, 200, 280),
      },
      MSFT: {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        currentPrice: 412.76,
        predictedPrice: 445.18,
        confidenceScore: 91,
        predictionDate: "2025-06-06",
        historicalData: generateHistoricalData(410, 380, 430),
      },
      AMZN: {
        symbol: "AMZN",
        name: "Amazon.com, Inc.",
        currentPrice: 178.25,
        predictedPrice: 195.37,
        confidenceScore: 84,
        predictionDate: "2025-06-06",
        historicalData: generateHistoricalData(175, 150, 190),
      },
      META: {
        symbol: "META",
        name: "Meta Platforms, Inc.",
        currentPrice: 472.14,
        predictedPrice: 515.63,
        confidenceScore: 88,
        predictionDate: "2025-06-06",
        historicalData: generateHistoricalData(470, 430, 500),
      },
      NFLX: {
        symbol: "NFLX",
        name: "Netflix, Inc.",
        currentPrice: 632.89,
        predictedPrice: 685.52,
        confidenceScore: 79,
        predictionDate: "2025-06-06",
        historicalData: generateHistoricalData(630, 580, 650),
      },
      NVDA: {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        currentPrice: 924.73,
        predictedPrice: 1025.18,
        confidenceScore: 93,
        predictionDate: "2025-06-06",
        historicalData: generateHistoricalData(920, 850, 950),
      },
    }

    setSelectedStock(dummyStocks[symbol] || null)
  }

  // Function to generate random historical data
  function generateHistoricalData(basePrice: number, min: number, max: number) {
    const data = []
    const today = new Date()

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      // Generate a random price within the range
      const randomFactor = 0.5 + Math.random()
      const range = max - min
      const price = min + range * randomFactor

      data.push({
        date: date.toISOString().split("T")[0],
        price: Number(price.toFixed(2)),
      })
    }

    return data
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <SearchSection onSearch={handleSearch} />
      {selectedStock && <ResultsSection stockData={selectedStock} />}
    </main>
  )
}
