import React from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import '../output.css';

const data = [
  { date: "Jan 30", gpa: 3.76 },
  { date: "Feb 15", gpa: 3.62 },
  { date: "Mar 1", gpa: 3.79 },
  { date: "Mar 15", gpa: 3.21 },
  { date: "Apr 1", gpa: 3.82 },
  { date: "Apr 15", gpa: 3.79 },
]

export function GPAChart() {
  return (
    <div className="h-full w-full" style={{ height: '100%', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 4]}
            ticks={[0, 1, 2, 3, 4]}
          />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke="#a855f7"
            strokeWidth={2}
            dot={{ fill: "#a855f7" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

