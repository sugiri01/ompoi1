import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceCardProps {
  title: string;
  price: string;
  change: number;
  period: string;
  currency?: string;
}

export function PriceCard({ title, price, change, period, currency = "USD" }: PriceCardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? "text-success" : "text-destructive";
  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <Card className="bg-gradient-card border-0 shadow-medium hover:shadow-large transition-smooth">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">
            {currency} {price}
          </div>
          <div className={`flex items-center gap-1 text-sm ${changeColor}`}>
            <ChangeIcon className="h-3 w-3" />
            <span>{Math.abs(change)}%</span>
            <span className="text-muted-foreground">({period})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}