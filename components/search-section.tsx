"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SearchSectionProps {
  onSearch: (symbol: string) => void
}

export function SearchSection({ onSearch }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const popularStocksRef = useRef<HTMLDivElement>(null)

  const popularStocks = [
    { symbol: "AAPL", name: "Apple" },
    { symbol: "GOOG", name: "Google" },
    { symbol: "TSLA", name: "Tesla" },
    { symbol: "MSFT", name: "Microsoft" },
    { symbol: "AMZN", name: "Amazon" },
    { symbol: "META", name: "Meta" },
    { symbol: "NFLX", name: "Netflix" },
    { symbol: "NVDA", name: "NVIDIA" },
    { symbol: "JPM", name: "JPMorgan" },
    { symbol: "V", name: "Visa" },
    { symbol: "WMT", name: "Walmart" },
    { symbol: "DIS", name: "Disney" },
  ]

  const allStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "GOOG", name: "Alphabet Inc." },
    { symbol: "TSLA", name: "Tesla, Inc." },
    { symbol: "MSFT", name: "Microsoft Corporation" },
    { symbol: "AMZN", name: "Amazon.com, Inc." },
    { symbol: "META", name: "Meta Platforms, Inc." },
    { symbol: "NFLX", name: "Netflix, Inc." },
    { symbol: "NVDA", name: "NVIDIA Corporation" },
    { symbol: "JPM", name: "JPMorgan Chase & Co." },
    { symbol: "V", name: "Visa Inc." },
    { symbol: "WMT", name: "Walmart Inc." },
    { symbol: "DIS", name: "The Walt Disney Company" },
  ]

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([])
      return
    }

    const term = searchTerm.toUpperCase()
    const filtered = allStocks
      .filter((stock) => stock.symbol.includes(term) || stock.name.toUpperCase().includes(term))
      .map((stock) => `${stock.symbol} - ${stock.name}`)
      .slice(0, 5)

    setSuggestions(filtered)
  }, [searchTerm])

  const scrollLeft = () => {
    if (popularStocksRef.current) {
      popularStocksRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (popularStocksRef.current) {
      popularStocksRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  const handleSearch = () => {
    if (searchTerm) {
      // Extract symbol if in format "SYMBOL - Company Name"
      const symbol = searchTerm.split(" - ")[0].trim().toUpperCase()
      onSearch(symbol)
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    const symbol = suggestion.split(" - ")[0].trim()
    setSearchTerm(suggestion)
    onSearch(symbol)
    setShowSuggestions(false)
  }

  const handleChipClick = (symbol: string, name: string) => {
    setSearchTerm(`${symbol} - ${name}`)
    onSearch(symbol)
  }

  return (
    <section id="search-section" className="w-full py-16 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Search for a Stock</h2>

          <div className="relative">
            <div className="flex">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Enter stock symbol or company name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSuggestions(true)
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                className="flex-1 border-2 border-r-0 rounded-r-none h-12 text-lg"
              />
              <Button onClick={handleSearch} className="h-12 rounded-l-none bg-emerald-600 hover:bg-emerald-700">
                <Search className="h-5 w-5" />
                <span className="ml-2">Search</span>
              </Button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md shadow-lg mt-1">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {searchTerm.trim() === "" && (
            <div className="mt-6">
              <p className="text-sm text-slate-500 mb-3 text-center">Popular stocks:</p>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border-slate-200"
                  onClick={scrollLeft}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="mx-10 overflow-hidden">
                  <div
                    ref={popularStocksRef}
                    className="flex overflow-x-auto py-2 px-4 scrollbar-hide"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      paddingLeft: "12px", // Add padding to the start
                      paddingRight: "12px", // Add padding to the end
                    }}
                  >
                    <div className="flex space-x-3">
                      {popularStocks.map((stock) => (
                        <Badge
                          key={stock.symbol}
                          variant="outline"
                          className="px-4 py-2 text-base cursor-pointer hover:bg-emerald-100 hover:text-emerald-800 hover:border-emerald-300 transition-all duration-200 border-slate-300 whitespace-nowrap"
                          onClick={() => handleChipClick(stock.symbol, stock.name)}
                        >
                          {stock.symbol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border-slate-200"
                  onClick={scrollRight}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
