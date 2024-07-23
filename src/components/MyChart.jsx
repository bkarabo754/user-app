// MyChart.jsx
import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ChartComponent";

// Custom Tooltip Component
const CustomTooltip = ({ payload, label }) => {
  if (payload.length === 0) return null;
  return (
    <div className='bg-white p-2 border border-gray-300 rounded shadow-lg'>
      <p className='font-bold'>{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className='text-gray-600'>
          <span className='text-indigo-600'>{entry.name}:</span> {entry.value}
        </p>
      ))}
    </div>
  );
};

const MyChart = ({ data }) => {
  return (
    <ChartContainer className='p-4 bg-gradient-to-r from-gray-100 via-white to-gray-200 shadow-lg rounded-lg'>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
          <XAxis dataKey='name' tick={{ fill: "#4A5568", fontSize: 14 }} />
          <YAxis tick={{ fill: "#4A5568", fontSize: 14 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey='value' fill='url(#grad1)' radius={[10, 10, 0, 0]} />
          <defs>
            <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop
                offset='0%'
                style={{ stopColor: "#4A90E2", stopOpacity: 1 }}
              />
              <stop
                offset='100%'
                style={{ stopColor: "#D4A5A5", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MyChart;
