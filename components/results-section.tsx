"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Percent,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChartContainer } from "@/components/ui/chart"
import type { CompanyStocks, StockData } from "./stock-prediction-app"

interface ResultsSectionProps {
  companyStocks: CompanyStocks | null
}

export function ResultsSection({ companyStocks }: ResultsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [animatedText, setAnimatedText] = useState("Search a stock")
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)
  const stocksPerPage = 3

  // Animation for placeholder text
  useEffect(() => {
    const texts = [
      "Search a stock",
      "Discover predictions",
      "Find opportunities",
      "Analyze markets",
      "Make smart investments",
    ]
    let index = 0

    const interval = setInterval(() => {
      index = (index + 1) % texts.length
      setAnimatedText(texts[index])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Reset pagination and selected stock when company changes
  useEffect(() => {
    setCurrentPage(1)
    setSelectedStock(null)
  }, [companyStocks])

  if (!companyStocks) {
    return (
      <section className="w-full py-16 bg-slate-50" style={{ height: "70vh" }}>
        <div className="container px-4 md:px-6 mx-auto h-full">
          <div className="max-w-5xl mx-auto h-full">
            <Card className="shadow-lg h-full flex flex-col justify-center items-center">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Stock Prediction Tool</CardTitle>
                <CardDescription className="text-center text-lg">
                  Enter a stock symbol or select from popular stocks to see predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="text-4xl font-bold text-emerald-600 mb-8 transition-all duration-500">
                  {animatedText}
                </div>
                <Search className="h-24 w-24 text-slate-300 animate-pulse" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  // Calculate pagination
  const totalStocks = companyStocks.stocks.length
  const totalPages = Math.ceil(totalStocks / stocksPerPage)
  const indexOfLastStock = currentPage * stocksPerPage
  const indexOfFirstStock = indexOfLastStock - stocksPerPage
  const currentStocks = companyStocks.stocks.slice(indexOfFirstStock, indexOfLastStock)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      setSelectedStock(null)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      setSelectedStock(null)
    }
  }

  const handleStockSelect = (stock: StockData) => {
    setSelectedStock(stock)
  }

  const closeDetailView = () => {
    setSelectedStock(null)
  }

  return (
    <section className="w-full py-16 bg-slate-50" style={{ minHeight: "70vh" }}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {companyStocks.companyName} ({companyStocks.companySymbol})
              </h2>
              <p className="text-slate-500">
                Showing {indexOfFirstStock + 1}-{Math.min(indexOfLastStock, totalStocks)} of {totalStocks} stocks
              </p>
            </div>
            {selectedStock && (
              <Button variant="ghost" size="sm" onClick={closeDetailView} className="flex items-center">
                <X className="h-4 w-4 mr-1" /> Close Detail View
              </Button>
            )}
          </div>

          {selectedStock ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 transition-all duration-500 transform translate-x-0">
                <DetailedStockCard stockData={selectedStock} />
              </div>
              <div className="lg:col-span-2 transition-all duration-500">
                <DetailedStockChart stockData={selectedStock} />
              </div>
              <div className="lg:col-span-3 mt-6">
                <h3 className="text-xl font-semibold mb-4">Other Stocks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentStocks
                    .filter((stock) => stock.symbol !== selectedStock.symbol)
                    .map((stock) => (
                      <div
                        key={stock.symbol}
                        className="cursor-pointer transform transition-all duration-300 hover:scale-105"
                        onClick={() => handleStockSelect(stock)}
                      >
                        <MiniStockCard stockData={stock} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => handleStockSelect(stock)}
                  >
                    <StockCard stockData={stock} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="h-8 w-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm">
                      Page {currentPage} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

interface StockCardProps {
  stockData: StockData
}

function StockCard({ stockData }: StockCardProps) {
  const isPriceUp = stockData.predictedPrice > stockData.currentPrice
  const priceDifference = stockData.predictedPrice - stockData.currentPrice
  const percentChange = (priceDifference / stockData.currentPrice) * 100

  // Format the chart data
  const chartData = stockData.historicalData.map((item) => ({
    date: item.date,
    price: item.price,
  }))

  // Add the predicted price point
  chartData.push({
    date: stockData.predictionDate,
    price: stockData.predictedPrice,
  })

  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>{stockData.symbol}</span>
          <Badge className="bg-slate-200 text-slate-800 hover:bg-slate-200">{stockData.name}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="h-[150px] w-full mb-4">
          <ChartContainer data={chartData} xAxisKey="date" yAxisKey="price">
            <></>
          </ChartContainer>
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex justify-between items-center py-1 border-b">
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 text-slate-500 mr-2" />
              <span className="text-sm">Current</span>
            </div>
            <span className="font-bold">${stockData.currentPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b">
            <div className="flex items-center">
              {isPriceUp ? (
                <TrendingUp className="h-4 w-4 text-emerald-500 mr-2" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
              )}
              <span className="text-sm">Predicted</span>
            </div>
            <span className="font-bold">${stockData.predictedPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b">
            <div className="flex items-center">
              <Percent className="h-4 w-4 text-slate-500 mr-2" />
              <span className="text-sm">Change</span>
            </div>
            <span className={`font-bold ${isPriceUp ? "text-emerald-600" : "text-red-600"}`}>
              {isPriceUp ? "+" : ""}
              {percentChange.toFixed(2)}%
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-slate-500 mr-2" />
              <span className="text-sm">Date</span>
            </div>
            <span className="text-sm">{stockData.predictionDate}</span>
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Confidence</span>
              <Badge
                className={`${
                  stockData.confidenceScore > 85
                    ? "bg-emerald-100 text-emerald-800"
                    : stockData.confidenceScore > 70
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {stockData.confidenceScore}%
              </Badge>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
              <div
                className={`h-2 rounded-full ${
                  stockData.confidenceScore > 85
                    ? "bg-emerald-500"
                    : stockData.confidenceScore > 70
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${stockData.confidenceScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DetailedStockCard({ stockData }: StockCardProps) {
  const isPriceUp = stockData.predictedPrice > stockData.currentPrice
  const priceDifference = stockData.predictedPrice - stockData.currentPrice
  const percentChange = (priceDifference / stockData.currentPrice) * 100

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-2xl">{stockData.symbol}</CardTitle>
        <CardDescription className="text-lg font-medium">{stockData.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-slate-500 mr-2" />
              <span className="text-base font-medium">Current Price</span>
            </div>
            <span className="text-xl font-bold">${stockData.currentPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <div className="flex items-center">
              {isPriceUp ? (
                <TrendingUp className="h-5 w-5 text-emerald-500 mr-2" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className="text-base font-medium">Predicted Price</span>
            </div>
            <span className="text-xl font-bold">${stockData.predictedPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <div className="flex items-center">
              <Percent className="h-5 w-5 text-slate-500 mr-2" />
              <span className="text-base font-medium">Expected Change</span>
            </div>
            <span className={`text-xl font-bold ${isPriceUp ? "text-emerald-600" : "text-red-600"}`}>
              {isPriceUp ? "+" : ""}
              {percentChange.toFixed(2)}%
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-slate-500 mr-2" />
              <span className="text-base font-medium">Prediction Date</span>
            </div>
            <span className="text-base font-medium">{stockData.predictionDate}</span>
          </div>

          <div className="mt-4 pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-medium">Confidence Score</span>
              <Badge
                className={`text-base px-3 py-1 ${
                  stockData.confidenceScore > 85
                    ? "bg-emerald-100 text-emerald-800"
                    : stockData.confidenceScore > 70
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {stockData.confidenceScore}%
              </Badge>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 mt-1">
              <div
                className={`h-3 rounded-full ${
                  stockData.confidenceScore > 85
                    ? "bg-emerald-500"
                    : stockData.confidenceScore > 70
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${stockData.confidenceScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DetailedStockChart({ stockData }: StockCardProps) {
  // Generate more detailed historical data for the detailed chart
  const detailedChartData = [...stockData.historicalData]

  // Add the predicted price point
  detailedChartData.push({
    date: stockData.predictionDate,
    price: stockData.predictedPrice,
  })

  // Format the chart data
  const chartData = detailedChartData.map((item) => ({
    date: item.date,
    price: item.price,
  }))

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>Detailed Price Prediction</CardTitle>
        <CardDescription>Historical data and AI prediction for {stockData.symbol} with trend analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ChartContainer data={chartData} xAxisKey="date" yAxisKey="price">
            <></>
          </ChartContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-1">30-Day Trend</h4>
            <p className="text-sm text-slate-600">
              {stockData.predictedPrice > stockData.currentPrice
                ? "Upward trend with steady growth potential"
                : "Downward trend with potential recovery"}
            </p>
          </div>
          <div className="bg-slate-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-1">Volatility</h4>
            <p className="text-sm text-slate-600">
              {stockData.confidenceScore > 85
                ? "Low volatility expected"
                : stockData.confidenceScore > 70
                  ? "Moderate volatility expected"
                  : "High volatility expected"}
            </p>
          </div>
          <div className="bg-slate-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-1">AI Recommendation</h4>
            <p className="text-sm text-slate-600">
              {stockData.predictedPrice > stockData.currentPrice && stockData.confidenceScore > 80
                ? "Strong Buy"
                : stockData.predictedPrice > stockData.currentPrice && stockData.confidenceScore > 70
                  ? "Buy"
                  : stockData.predictedPrice > stockData.currentPrice
                    ? "Hold"
                    : stockData.confidenceScore < 70
                      ? "Sell"
                      : "Hold"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MiniStockCard({ stockData }: StockCardProps) {
  const isPriceUp = stockData.predictedPrice > stockData.currentPrice
  const percentChange = ((stockData.predictedPrice - stockData.currentPrice) / stockData.currentPrice) * 100

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">{stockData.symbol}</h3>
            <p className="text-xs text-slate-500">{stockData.name}</p>
          </div>
          <Badge
            className={`${
              stockData.confidenceScore > 85
                ? "bg-emerald-100 text-emerald-800"
                : stockData.confidenceScore > 70
                  ? "bg-amber-100 text-amber-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {stockData.confidenceScore}%
          </Badge>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm">${stockData.currentPrice.toFixed(2)}</span>
          <span className={`text-sm font-medium ${isPriceUp ? "text-emerald-600" : "text-red-600"}`}>
            {isPriceUp ? "+" : ""}
            {percentChange.toFixed(2)}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
