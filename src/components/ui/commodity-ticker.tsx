import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CommodityPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const commodities: CommodityPrice[] = [
  { symbol: "WHEAT", name: "Wheat", price: 2850, change: 25, changePercent: 0.89 },
  { symbol: "CORN", name: "Corn", price: 1950, change: -15, changePercent: -0.76 },
  { symbol: "COFFEE", name: "Coffee", price: 18500, change: 180, changePercent: 0.98 },
  { symbol: "RICE", name: "Rice", price: 3200, change: 45, changePercent: 1.43 },
  { symbol: "COTTON", name: "Cotton", price: 8750, change: -120, changePercent: -1.35 },
  { symbol: "SOYBEAN", name: "Soybean", price: 4500, change: 65, changePercent: 1.47 },
  { symbol: "CASHEW", name: "Cashew W180", price: 92000, change: 1200, changePercent: 1.32 },
  { symbol: "SUGAR", name: "Sugar", price: 3800, change: -25, changePercent: -0.65 },
];

export function CommodityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % commodities.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentCommodity = commodities[currentIndex];
  const isPositive = currentCommodity.change >= 0;

  return (
    <div className="bg-gradient-primary text-primary-foreground py-2 px-4 overflow-hidden">
      <div className="flex items-center justify-center space-x-6 animate-pulse">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{currentCommodity.symbol}</span>
          <span className="text-sm opacity-90">₹{currentCommodity.price}/MT</span>
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {isPositive ? '+' : ''}{currentCommodity.change}
          </span>
          <span className="text-sm">
            ({isPositive ? '+' : ''}{currentCommodity.changePercent}%)
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-sm opacity-90">
          {commodities.slice(0, 3).map((commodity, index) => (
            <div key={commodity.symbol} className="flex items-center space-x-1">
              <span>{commodity.symbol}</span>
              <span>₹{commodity.price}</span>
              <span className={commodity.change >= 0 ? 'text-green-200' : 'text-red-200'}>
                {commodity.change >= 0 ? '+' : ''}{commodity.changePercent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}