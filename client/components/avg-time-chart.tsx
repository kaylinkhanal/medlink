'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000 },
  { name: 'Page B', uv: 3000 },
  { name: 'Page C', uv: -1000 },
  { name: 'Page D', uv: 500 },
  { name: 'Page E', uv: -2000 },
  { name: 'Page F', uv: -250 },
  { name: 'Page G', uv: 3490 },
];

// Helper to calculate the 0 offset for the gradient
const getGradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.uv));
  const dataMin = Math.min(...data.map((i) => i.uv));

  if (dataMax <= 0) return 0;
  if (dataMin >= 0) return 1;

  return dataMax / (dataMax - dataMin);
};

const off = getGradientOffset();

const AvgTimeChart = () => {
  return (
    <div style={{ width: '100%', maxWidth: '700px', aspectRatio: 1.618 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="uv" 
            stroke="#000" 
            fill="url(#splitColor)" 
            baseValue={0} // Crucial: tells the area to fill towards 0
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AvgTimeChart;