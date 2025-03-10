import React from "react";
import {  Line, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts";
import { chartData } from "./common";


const Charts: React.FC = () => { 

  const updatedData = chartData.map(({ week, gmDollars, salesDollars }) => ({
    week,
    gmDollars,
    gmPercent: salesDollars ? (gmDollars / salesDollars) * 100 : 0
  }));
  
  console.log(updatedData);
  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Gross Margin</h2>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={updatedData}>
          <XAxis dataKey="week" stroke="#fff" />
          <YAxis yAxisId="left" stroke="#82ca9d" />
          <YAxis yAxisId="right" orientation="right" stroke="#ff7300" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="gmDollars" fill="#3498db" name="GM Dollars" />
          <Line yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#ff7300" strokeWidth={2} name="GM %" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
