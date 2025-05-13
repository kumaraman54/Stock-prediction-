"use client"

import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToSearch = () => {
    const searchSection = document.getElementById("search-section")
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
          Predict the Future of Stocks with ML
        </h1>
        <p className="max-w-[700px] text-lg md:text-xl text-slate-300 mb-8">
          Harness the power of machine learning to make smarter investment decisions. Our advanced algorithms
          analyze market trends to provide accurate stock predictions.
        </p>
        <Button onClick={scrollToSearch} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Get Started
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
