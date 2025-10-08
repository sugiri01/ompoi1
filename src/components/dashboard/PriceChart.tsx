import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { date: "Jan", price: 8.50, volume: 1200 },
  { date: "Feb", price: 8.75, volume: 1350 },
  { date: "Mar", price: 9.20, volume: 1100 },
  { date: "Apr", price: 8.95, volume: 1400 },
  { date: "May", price: 9.45, volume: 1250 },
  { date: "Jun", price: 9.80, volume: 1300 },
];

const timeRanges = [
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
  { label: "3Y", value: "3y" },
  { label: "5Y", value: "5y" },
];

export function PriceChart() {
  const [activeRange, setActiveRange] = useState("6m");

  return (
    <Card className="col-span-full bg-gradient-card border-0 shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Cashew Kernel Prices (W240)</CardTitle>
            <CardDescription>Historical price trends and volume data</CardDescription>
          </div>
          <div className="flex gap-1">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={activeRange === range.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveRange(range.value)}
                className="h-8"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-muted-foreground"
                fontSize={12}
              />
              <YAxis 
                className="text-muted-foreground"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}