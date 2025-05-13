"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
})
Chart.displayName = "Chart"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  xAxisKey: string
  yAxisKey: string
  children: React.ReactNode
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, data, xAxisKey, yAxisKey, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {children}
            <XAxis dataKey={xAxisKey} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              dataKey={yAxisKey}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                          <span className="font-bold text-xs">{payload[0].payload.date}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Price</span>
                          <span className="font-bold text-xs">${payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey={yAxisKey}
              stroke="#16a34a"
              strokeWidth={2}
              activeDot={{ r: 6, style: { fill: "#16a34a", opacity: 0.8 } }}
            />
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

// These components are now just placeholders since the actual implementation is in ChartContainer
const ChartTooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>
const ChartTooltipContent = () => <></>
const ChartLine = () => <></>
const ChartArea = () => <></>
const ChartXAxis = () => <></>
const ChartYAxis = () => <></>
const ChartGrid = () => <></>

export {
  Chart,
  ChartLine,
  ChartArea,
  ChartXAxis,
  ChartYAxis,
  ChartGrid,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
}
