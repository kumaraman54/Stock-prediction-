"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, Calendar, Percent } from "lucide-react"
import type { StockData } from "./stock-prediction-app"
import { ChartContainer } from "@/components/ui/chart"

interface ResultsSectionProps {
  stockData: StockData
}

export function ResultsSection({ stockData }: ResultsSectionProps) {
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
    <section className="w-full py-16 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="w-full md:w-1/3">
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl flex items-center">
                    {stockData.symbol}
                    <Badge className="ml-2 bg-slate-200 text-slate-800 hover:bg-slate-200">{stockData.name}</Badge>
                  </CardTitle>
                  <CardDescription>Stock Prediction Details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center">
                        <BarChart3 className="h-5 w-5 text-slate-500 mr-2" />
                        <span className="text-sm font-medium">Current Price</span>
                      </div>
                      <span className="font-bold">${stockData.currentPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center">
                        {isPriceUp ? (
                          <TrendingUp className="h-5 w-5 text-emerald-500 mr-2" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <span className="text-sm font-medium">Predicted Price</span>
                      </div>
                      <span className="font-bold">${stockData.predictedPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center">
                        <Percent className="h-5 w-5 text-slate-500 mr-2" />
                        <span className="text-sm font-medium">Expected Change</span>
                      </div>
                      <span className={`font-bold ${isPriceUp ? "text-emerald-600" : "text-red-600"}`}>
                        {isPriceUp ? "+" : ""}
                        {percentChange.toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-slate-500 mr-2" />
                        <span className="text-sm font-medium">Prediction Date</span>
                      </div>
                      <span className="font-medium">{stockData.predictionDate}</span>
                    </div>

                    <div className="mt-4 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Confidence Score</span>
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
                      <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
                        <div
                          className={`h-2.5 rounded-full ${
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
            </div>

            <div className="w-full md:w-2/3">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Price Prediction Chart</CardTitle>
                  <CardDescription>Historical data and AI prediction for {stockData.symbol}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ChartContainer data={chartData} xAxisKey="date" yAxisKey="price">
                      <></>
                    </ChartContainer>
                  </div>
                  <div className="mt-4 text-center text-sm text-slate-500">
                    <p>
                      The chart shows historical price data with our AI prediction for {stockData.predictionDate}.
                      <br />
                      <span className="text-xs italic">
                        Note: This is a simulation using dummy data for demonstration purposes.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
