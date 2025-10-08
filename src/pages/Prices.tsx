import { useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const priceData = {
  kernels: [
    { grade: "W180", price: 11.25, change: 2.8, volume: "450 MT", origin: "Vietnam" },
    { grade: "W210", price: 10.80, change: 1.9, volume: "320 MT", origin: "Ivory Coast" },
    { grade: "W240", price: 9.80, change: 2.4, volume: "680 MT", origin: "India" },
    { grade: "W320", price: 8.95, change: 3.1, volume: "890 MT", origin: "Vietnam" },
    { grade: "W450", price: 7.45, change: -0.8, volume: "230 MT", origin: "Ghana" },
    { grade: "LWP", price: 6.20, change: 1.5, volume: "150 MT", origin: "Nigeria" },
    { grade: "SW", price: 5.80, change: -1.2, volume: "95 MT", origin: "India" },
  ],
  raw: [
    { origin: "Ivory Coast", price: 2.15, change: -1.2, volume: "2,400 MT" },
    { origin: "Vietnam", price: 2.28, change: 0.8, volume: "1,800 MT" },
    { origin: "Ghana", price: 2.10, change: -0.5, volume: "1,200 MT" },
    { origin: "Nigeria", price: 1.95, change: 1.8, volume: "850 MT" },
  ],
  byproducts: [
    { product: "CNSL", price: 0.85, change: 0.8, volume: "120 MT", usage: "Industrial" },
    { product: "Cashew Oil", price: 3.20, change: 2.1, volume: "45 MT", usage: "Cosmetic" },
    { product: "Shell Cake", price: 0.12, change: -0.3, volume: "380 MT", usage: "Fuel" },
  ]
};

const PriceCard = ({ item, type }: { item: any; type: string }) => (
  <Card className="hover:shadow-medium transition-shadow">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg">
            {type === 'kernels' ? item.grade : type === 'raw' ? item.origin : item.product}
          </h3>
          {type === 'kernels' && (
            <Badge variant="secondary" className="text-xs">{item.origin}</Badge>
          )}
          {type === 'byproducts' && (
            <Badge variant="outline" className="text-xs">{item.usage}</Badge>
          )}
        </div>
        <div className={`flex items-center gap-1 ${item.change > 0 ? 'text-success' : 'text-destructive'}`}>
          {item.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span className="text-sm font-medium">{item.change > 0 ? '+' : ''}{item.change}%</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <span className="text-2xl font-bold">${item.price}</span>
          <span className="text-muted-foreground ml-1">/kg</span>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Volume: {item.volume}</span>
          <span>24h</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Prices = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Live Market Prices</h1>
            <p className="text-muted-foreground">Real-time pricing from major cashew trading ports</p>
          </div>
          <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Market Status Alert */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <div>
                <h4 className="font-medium">Market Alert</h4>
                <p className="text-sm text-muted-foreground">
                  Elevated volatility detected in W240 grade due to supply constraints from Vietnam
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Tables */}
        <Tabs defaultValue="kernels" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="kernels">Cashew Kernels</TabsTrigger>
            <TabsTrigger value="raw">Raw Cashew Nuts</TabsTrigger>
            <TabsTrigger value="byproducts">By-products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kernels" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {priceData.kernels.map((item, index) => (
                <PriceCard key={index} item={item} type="kernels" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="raw" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceData.raw.map((item, index) => (
                <PriceCard key={index} item={item} type="raw" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="byproducts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceData.byproducts.map((item, index) => (
                <PriceCard key={index} item={item} type="byproducts" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Prices;