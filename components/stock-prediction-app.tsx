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

export type CompanyStocks = {
  companySymbol: string
  companyName: string
  stocks: StockData[]
}

export function StockPredictionApp() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyStocks | null>(null)

  const handleSearch = (symbol: string) => {
    // Generate dummy data for the selected stock
    const dummyCompanies: Record<string, CompanyStocks> = {
      AAPL: {
        companySymbol: "AAPL",
        companyName: "Apple Inc.",
        stocks: [
          {
            symbol: "AAPL-TECH",
            name: "Apple Technology Division",
            currentPrice: 187.68,
            predictedPrice: 205.42,
            confidenceScore: 87,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(180, 150, 190),
          },
          {
            symbol: "AAPL-RETAIL",
            name: "Apple Retail Division",
            currentPrice: 192.35,
            predictedPrice: 210.18,
            confidenceScore: 82,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(190, 160, 200),
          },
          {
            symbol: "AAPL-SERVICES",
            name: "Apple Services Division",
            currentPrice: 201.42,
            predictedPrice: 225.87,
            confidenceScore: 89,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(200, 180, 220),
          },
          {
            symbol: "AAPL-WEARABLES",
            name: "Apple Wearables Division",
            currentPrice: 175.29,
            predictedPrice: 195.63,
            confidenceScore: 78,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(175, 150, 190),
          },
          {
            symbol: "AAPL-RD",
            name: "Apple R&D Division",
            currentPrice: 210.76,
            predictedPrice: 245.32,
            confidenceScore: 91,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(210, 190, 230),
          },
        ],
      },
      GOOG: {
        companySymbol: "GOOG",
        companyName: "Alphabet Inc.",
        stocks: [
          {
            symbol: "GOOG-SEARCH",
            name: "Google Search Division",
            currentPrice: 176.32,
            predictedPrice: 192.15,
            confidenceScore: 82,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(170, 140, 180),
          },
          {
            symbol: "GOOG-CLOUD",
            name: "Google Cloud Division",
            currentPrice: 182.47,
            predictedPrice: 201.36,
            confidenceScore: 85,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(180, 160, 190),
          },
          {
            symbol: "GOOG-ADS",
            name: "Google Ads Division",
            currentPrice: 168.93,
            predictedPrice: 185.27,
            confidenceScore: 79,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(165, 140, 175),
          },
          {
            symbol: "GOOG-YOUTUBE",
            name: "YouTube Division",
            currentPrice: 195.62,
            predictedPrice: 215.38,
            confidenceScore: 88,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(195, 170, 210),
          },
        ],
      },
      TSLA: {
        companySymbol: "TSLA",
        companyName: "Tesla, Inc.",
        stocks: [
          {
            symbol: "TSLA-AUTO",
            name: "Tesla Automotive Division",
            currentPrice: 245.67,
            predictedPrice: 278.92,
            confidenceScore: 75,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(240, 200, 280),
          },
          {
            symbol: "TSLA-ENERGY",
            name: "Tesla Energy Division",
            currentPrice: 235.18,
            predictedPrice: 262.43,
            confidenceScore: 72,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(230, 200, 250),
          },
          {
            symbol: "TSLA-TECH",
            name: "Tesla Technology Division",
            currentPrice: 258.92,
            predictedPrice: 295.37,
            confidenceScore: 81,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(255, 220, 290),
          },
        ],
      },
      MSFT: {
        companySymbol: "MSFT",
        companyName: "Microsoft Corporation",
        stocks: [
          {
            symbol: "MSFT-CLOUD",
            name: "Microsoft Cloud Division",
            currentPrice: 412.76,
            predictedPrice: 445.18,
            confidenceScore: 91,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(410, 380, 430),
          },
          {
            symbol: "MSFT-OS",
            name: "Microsoft OS Division",
            currentPrice: 405.32,
            predictedPrice: 432.67,
            confidenceScore: 87,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(400, 370, 420),
          },
          {
            symbol: "MSFT-GAMING",
            name: "Microsoft Gaming Division",
            currentPrice: 395.48,
            predictedPrice: 425.93,
            confidenceScore: 83,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(390, 360, 410),
          },
          {
            symbol: "MSFT-OFFICE",
            name: "Microsoft Office Division",
            currentPrice: 418.25,
            predictedPrice: 452.76,
            confidenceScore: 89,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(415, 390, 440),
          },
          {
            symbol: "MSFT-HARDWARE",
            name: "Microsoft Hardware Division",
            currentPrice: 385.19,
            predictedPrice: 412.37,
            confidenceScore: 78,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(380, 350, 400),
          },
          {
            symbol: "MSFT-AI",
            name: "Microsoft AI Division",
            currentPrice: 425.83,
            predictedPrice: 468.42,
            confidenceScore: 93,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(425, 400, 450),
          },
          {
            symbol: "MSFT-SECURITY",
            name: "Microsoft Security Division",
            currentPrice: 402.57,
            predictedPrice: 435.18,
            confidenceScore: 85,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(400, 380, 420),
          },
        ],
      },
      AMZN: {
        companySymbol: "AMZN",
        companyName: "Amazon.com, Inc.",
        stocks: [
          {
            symbol: "AMZN-RETAIL",
            name: "Amazon Retail Division",
            currentPrice: 178.25,
            predictedPrice: 195.37,
            confidenceScore: 84,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(175, 150, 190),
          },
          {
            symbol: "AMZN-AWS",
            name: "Amazon Web Services",
            currentPrice: 185.63,
            predictedPrice: 205.42,
            confidenceScore: 92,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(185, 160, 200),
          },
          {
            symbol: "AMZN-PRIME",
            name: "Amazon Prime Division",
            currentPrice: 172.48,
            predictedPrice: 188.75,
            confidenceScore: 81,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(170, 150, 185),
          },
        ],
      },
      META: {
        companySymbol: "META",
        companyName: "Meta Platforms, Inc.",
        stocks: [
          {
            symbol: "META-FB",
            name: "Meta Facebook Division",
            currentPrice: 472.14,
            predictedPrice: 515.63,
            confidenceScore: 88,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(470, 430, 500),
          },
          {
            symbol: "META-IG",
            name: "Meta Instagram Division",
            currentPrice: 485.27,
            predictedPrice: 532.18,
            confidenceScore: 86,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(480, 450, 510),
          },
          {
            symbol: "META-VR",
            name: "Meta VR/AR Division",
            currentPrice: 458.92,
            predictedPrice: 495.37,
            confidenceScore: 75,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(455, 420, 480),
          },
        ],
      },
      NFLX: {
        companySymbol: "NFLX",
        companyName: "Netflix, Inc.",
        stocks: [
          {
            symbol: "NFLX-STREAM",
            name: "Netflix Streaming Division",
            currentPrice: 632.89,
            predictedPrice: 685.52,
            confidenceScore: 79,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(630, 580, 650),
          },
          {
            symbol: "NFLX-CONTENT",
            name: "Netflix Content Production",
            currentPrice: 645.32,
            predictedPrice: 702.18,
            confidenceScore: 83,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(640, 600, 670),
          },
          {
            symbol: "NFLX-INTL",
            name: "Netflix International Division",
            currentPrice: 625.47,
            predictedPrice: 672.93,
            confidenceScore: 77,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(620, 580, 640),
          },
        ],
      },
      NVDA: {
        companySymbol: "NVDA",
        companyName: "NVIDIA Corporation",
        stocks: [
          {
            symbol: "NVDA-GPU",
            name: "NVIDIA GPU Division",
            currentPrice: 924.73,
            predictedPrice: 1025.18,
            confidenceScore: 93,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(920, 850, 950),
          },
          {
            symbol: "NVDA-AI",
            name: "NVIDIA AI Division",
            currentPrice: 945.28,
            predictedPrice: 1052.67,
            confidenceScore: 95,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(940, 880, 980),
          },
          {
            symbol: "NVDA-AUTO",
            name: "NVIDIA Automotive Division",
            currentPrice: 895.42,
            predictedPrice: 975.83,
            confidenceScore: 87,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(890, 830, 920),
          },
        ],
      },
      JPM: {
        companySymbol: "JPM",
        companyName: "JPMorgan Chase & Co.",
        stocks: [
          {
            symbol: "JPM-BANK",
            name: "JPMorgan Banking Division",
            currentPrice: 187.35,
            predictedPrice: 205.42,
            confidenceScore: 86,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(185, 160, 200),
          },
          {
            symbol: "JPM-INVEST",
            name: "JPMorgan Investment Division",
            currentPrice: 195.63,
            predictedPrice: 215.28,
            confidenceScore: 89,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(195, 170, 210),
          },
          {
            symbol: "JPM-WEALTH",
            name: "JPMorgan Wealth Management",
            currentPrice: 182.47,
            predictedPrice: 198.75,
            confidenceScore: 82,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(180, 160, 190),
          },
        ],
      },
      V: {
        companySymbol: "V",
        companyName: "Visa Inc.",
        stocks: [
          {
            symbol: "V-CREDIT",
            name: "Visa Credit Division",
            currentPrice: 275.42,
            predictedPrice: 298.63,
            confidenceScore: 87,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(270, 250, 290),
          },
          {
            symbol: "V-DEBIT",
            name: "Visa Debit Division",
            currentPrice: 268.75,
            predictedPrice: 289.32,
            confidenceScore: 84,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(265, 240, 280),
          },
          {
            symbol: "V-FINTECH",
            name: "Visa Fintech Division",
            currentPrice: 282.18,
            predictedPrice: 310.47,
            confidenceScore: 89,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(280, 260, 300),
          },
        ],
      },
      WMT: {
        companySymbol: "WMT",
        companyName: "Walmart Inc.",
        stocks: [
          {
            symbol: "WMT-RETAIL",
            name: "Walmart Retail Division",
            currentPrice: 68.92,
            predictedPrice: 75.37,
            confidenceScore: 81,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(65, 55, 70),
          },
          {
            symbol: "WMT-ECOM",
            name: "Walmart E-Commerce Division",
            currentPrice: 72.48,
            predictedPrice: 80.25,
            confidenceScore: 83,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(70, 60, 75),
          },
          {
            symbol: "WMT-INTL",
            name: "Walmart International Division",
            currentPrice: 65.73,
            predictedPrice: 71.42,
            confidenceScore: 78,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(65, 55, 70),
          },
        ],
      },
      DIS: {
        companySymbol: "DIS",
        companyName: "The Walt Disney Company",
        stocks: [
          {
            symbol: "DIS-MEDIA",
            name: "Disney Media Division",
            currentPrice: 112.37,
            predictedPrice: 125.82,
            confidenceScore: 80,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(110, 95, 120),
          },
          {
            symbol: "DIS-PARKS",
            name: "Disney Parks Division",
            currentPrice: 118.75,
            predictedPrice: 132.48,
            confidenceScore: 85,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(115, 100, 125),
          },
          {
            symbol: "DIS-STREAM",
            name: "Disney Streaming Division",
            currentPrice: 105.63,
            predictedPrice: 118.27,
            confidenceScore: 77,
            predictionDate: "2025-06-06",
            historicalData: generateHistoricalData(105, 90, 115),
          },
        ],
      },
    }

    setSelectedCompany(dummyCompanies[symbol] || null)
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
      <ResultsSection companyStocks={selectedCompany} />
    </main>
  )
}
