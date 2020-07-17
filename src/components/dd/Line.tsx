import React from 'react'
import {
    LineChart, 
    Line as ChartLine, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend,
    ResponsiveContainer
} from 'recharts'


type LineChartsData = { [chartLabel: string]: number | string } & { x: number | string}

interface LineChartsProps {
    yLabels: string[]
    data: LineChartsData[]
}

const strokeColors = [
    "#a3a1fb",
    "#56d9fe",
    "#74e2b7",
    "#f2efa0"
]

export default function Line({
    yLabels,
    data
} : LineChartsProps) {

    return (
        <ResponsiveContainer height={280}>
            <LineChart data={data} margin={{ right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Legend />

                {yLabels.map((key, i) => <ChartLine dataKey={key} stroke={strokeColors[i]} />)}
                
            </LineChart>
        </ResponsiveContainer>
    )
}
