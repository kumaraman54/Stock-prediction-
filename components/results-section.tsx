"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, Calendar, Percent, Search, Loader2, AlertCircle } from "lucide-react"
import type { CompanyStocks, StockData } from "./stock-prediction-app"

interface ResultsSectionProps {
  companyStocks: CompanyStocks | null
  loading?: boolean
  error?: string | null
}

export function ResultsSection({ companyStocks, loading = false, error = null }: ResultsSectionProps) {
  const [animatedText, setAnimatedText] = useState("Search a stock")

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

  if (loading) {
    return (
      <section className="w-full py-16 bg-slate-50" style={{ height: "70vh" }}>
        <div className="container px-4 md:px-6 mx-auto h-full">
          <div className="max-w-5xl mx-auto h-full">
            <Card className="shadow-lg h-full flex flex-col justify-center items-center">
              <CardContent className="flex flex-col items-center">
                <Loader2 className="h-24 w-24 text-emerald-600 animate-spin mb-8" />
                <div className="text-2xl font-bold text-emerald-600 mb-4">Analyzing Stock Data...</div>
                <p className="text-slate-500 text-center">
                  Our AI models are processing the latest market data to generate predictions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full py-16 bg-slate-50" style={{ height: "70vh" }}>
        <div className="container px-4 md:px-6 mx-auto h-full">
          <div className="max-w-5xl mx-auto h-full">
            <Card className="shadow-lg h-full flex flex-col justify-center items-center">
              <CardContent className="flex flex-col items-center">
                <AlertCircle className="h-24 w-24 text-red-500 mb-8" />
                <div className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</div>
                <p className="text-slate-500 text-center">{error}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  if (!companyStocks) {
    return (
      <section className="w-full py-16 bg-slate-50" style={{ height: "70vh" }}>
        <div className="container px-4 md:px-6 mx-auto h-full">
          <div className="max-w-5xl mx-auto h-full">
            <Card className="shadow-lg h-full flex flex-col justify-center items-center">
              <CardHeader>
                <CardTitle className="text-3xl text-center">AI Stock Prediction Tool</CardTitle>
                <CardDescription className="text-center text-lg">
                  Enter a stock symbol or select from popular stocks to see AI-powered predictions
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

  // Add safety check for stocks array
  if (!companyStocks.stocks || companyStocks.stocks.length === 0) {
    return (
      <section className="w-full py-16 bg-slate-50" style={{ minHeight: "70vh" }}>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-lg h-full flex flex-col justify-center items-center">
              <CardContent className="flex flex-col items-center">
                <AlertCircle className="h-24 w-24 text-red-500 mb-8" />
                <div className="text-2xl font-bold text-red-600 mb-4">No Stock Data Available</div>
                <p className="text-slate-500 text-center">Unable to load stock data for this symbol.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  const stockData = companyStocks.stocks[0] // Since we only have one stock per company now

  return (
    <section className="w-full py-16 bg-slate-50" style={{ minHeight: "70vh" }}>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {companyStocks.companyName} ({companyStocks.companySymbol})
            </h2>
            <p className="text-slate-500">AI-powered prediction using {stockData.best_model}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <StockDetailsCard stockData={stockData} />
            </div>
            <div className="lg:col-span-2">
              <PredictionChart stockData={stockData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface StockCardProps {
  stockData: StockData
}

function StockDetailsCard({ stockData }: StockCardProps) {
  const isPriceUp = stockData.best_price_pred > stockData.current_price
  const priceDifference = stockData.best_price_pred - stockData.current_price
  const percentChange = (priceDifference / stockData.current_price) * 100

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-2xl">{stockData.ticker}</CardTitle>
        <CardDescription className="text-lg font-medium">Prediction Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-slate-500 mr-2" />
              <span className="text-base font-medium">Current Price</span>
            </div>
            <span className="text-xl font-bold">${stockData.current_price.toFixed(2)}</span>
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
            <span className="text-xl font-bold">${stockData.best_price_pred.toFixed(2)}</span>
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
              <span className="text-base font-medium">Model Used</span>
            </div>
            <span className="text-base font-medium">{stockData.best_model}</span>
          </div>

          <div className="mt-4 pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-medium">Confidence Score</span>
              <Badge
                className={`text-base px-3 py-1 ${
                  stockData.best_confidence > 85
                    ? "bg-emerald-100 text-emerald-800"
                    : stockData.best_confidence > 70
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {stockData.best_confidence.toFixed(1)}%
              </Badge>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 mt-1">
              <div
                className={`h-3 rounded-full ${
                  stockData.best_confidence > 85
                    ? "bg-emerald-500"
                    : stockData.best_confidence > 70
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${stockData.best_confidence}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Model RMSE</span>
              <span className="text-sm text-slate-600">{stockData.best_rmse.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PredictionChart({ stockData }: StockCardProps) {
  // Convert base64 string to image URL
  const imageUrl = `data:image/png;base64,${stockData.prediction_plot}`

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>AI Prediction Chart</CardTitle>
        <CardDescription>
          Historical data and prediction for {stockData.ticker} using {stockData.best_model}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] flex items-center justify-center">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={`Stock prediction chart for ${stockData.ticker}`}
            className="max-w-full max-h-full object-contain rounded-lg"
            onError={(e) => {
              console.error("Error loading prediction chart:", e)
              e.currentTarget.style.display = "none"
            }}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-1">Model Accuracy</h4>
            <p className="text-sm text-slate-600">
              {stockData.best_confidence > 90
                ? "Excellent prediction accuracy"
                : stockData.best_confidence > 80
                  ? "Good prediction accuracy"
                  : "Moderate prediction accuracy"}
            </p>
          </div>
          <div className="bg-slate-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-1">Price Movement</h4>
            <p className="text-sm text-slate-600">
              {stockData.best_price_pred > stockData.current_price
                ? "Upward trend expected"
                : stockData.best_price_pred < stockData.current_price
                  ? "Downward trend expected"
                  : "Stable price expected"}
            </p>
          </div>
          <div className="bg-slate-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-1">AI Recommendation</h4>
            <p className="text-sm text-slate-600">
              {stockData.best_price_pred > stockData.current_price && stockData.best_confidence > 85
                ? "Strong Buy"
                : stockData.best_price_pred > stockData.current_price && stockData.best_confidence > 70
                  ? "Buy"
                  : stockData.best_price_pred > stockData.current_price
                    ? "Hold"
                    : stockData.best_confidence < 70
                      ? "Sell"
                      : "Hold"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
