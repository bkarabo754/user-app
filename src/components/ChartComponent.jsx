// ChartComponents.jsx
import React from "react";

export const ChartContainer = ({ children, className }) => {
  return <div className={`relative ${className}`}>{children}</div>;
};

export const ChartTooltipContent = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border border-gray-300 p-2 rounded'>
        <p className='text-sm font-medium'>{payload[0].name}</p>
        <p className='text-sm'>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
