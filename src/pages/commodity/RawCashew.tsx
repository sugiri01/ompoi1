import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart3, Globe, MapPin, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function RawCashew() {
  const { toast } = useToast();
  const [priceData, setPriceData] = useState<any[]>([]);
  const [marketIntelligence, setMarketIntelligence] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPriceData();
    fetchMarketIntelligence();
  }, []);

  const fetchPriceData = async () => {
    try {
      const { data, error } = await supabase
        .from("price_history")
        .select("*")
        .ilike("location", "%cashew%")
        .order("recorded_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setPriceData(data || []);
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  };

  const fetchMarketIntelligence = async () => {
    try {
      const { data, error } = await supabase
        .from("market_intelligence")
        .select("*")
        .order("analysis_date", { ascending: false })
        .limit(5);

      if (error) throw error;
      setMarketIntelligence(data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching market intelligence:", error);
      setIsLoading(false);
    }
  };

  const mockRegionalPrices = [
    { region: "Kerala", price: 85, change: 2.3, trend: "up" },
    { region: "Karnataka", price: 82, change: -1.5, trend: "down" },
    { region: "Goa", price: 88, change: 3.1, trend: "up" },
    { region: "Tamil Nadu", price: 84, change: 0.8, trend: "up" },
  ];

  const mockMarketData = {
    currentPrice: 85.50,
    dailyChange: 2.3,
    weeklyChange: -1.8,
    monthlyChange: 4.2,
    volume: "2,847 MT",
    marketCap: "₹12.4 Cr"
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-pulse text-muted-foreground">Loading raw cashew data...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Raw Cashew Nuts</h1>
            <p className="text-muted-foreground">Market prices, analysis, and trading opportunities</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground">
              <BarChart3 className="w-4 h-4 mr-2" />
              Price Alerts
            </Button>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Price</p>
                  <p className="text-2xl font-bold text-foreground">₹{mockMarketData.currentPrice}/kg</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs text-success">+{mockMarketData.dailyChange}% today</span>
                  </div>
                </div>
                <div className="p-2 bg-success/10 rounded-full">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trading Volume</p>
                  <p className="text-2xl font-bold text-foreground">{mockMarketData.volume}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Market Cap</p>
                  <p className="text-2xl font-bold text-foreground">{mockMarketData.marketCap}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total market value</p>
                </div>
                <div className="p-2 bg-accent/10 rounded-full">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Change</p>
                  <p className="text-2xl font-bold text-foreground">+{mockMarketData.monthlyChange}%</p>
                  <p className="text-xs text-success mt-1">Strong growth trend</p>
                </div>
                <div className="p-2 bg-success/10 rounded-full">
                  <Calendar className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="regional" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="regional">Regional Prices</TabsTrigger>
            <TabsTrigger value="analysis">Market Analysis</TabsTrigger>
            <TabsTrigger value="forecast">Price Forecast</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
          </TabsList>

          <TabsContent value="regional">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Regional Price Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRegionalPrices.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{region.region}</h3>
                          <p className="text-sm text-muted-foreground">Raw Cashew Market</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">₹{region.price}/kg</p>
                        <div className="flex items-center gap-1">
                          {region.trend === "up" ? (
                            <TrendingUp className="w-3 h-3 text-success" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-destructive" />
                          )}
                          <span className={`text-xs ${region.trend === "up" ? "text-success" : "text-destructive"}`}>
                            {region.change > 0 ? "+" : ""}{region.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Market Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-success/10 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">Supply Status</h3>
                      <Badge className="bg-success text-success-foreground">Balanced</Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        Current supply levels are meeting demand expectations
                      </p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">Demand Level</h3>
                      <Badge className="bg-primary text-primary-foreground">High</Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        Strong export demand driving prices upward
                      </p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">Price Trend</h3>
                      <Badge className="bg-accent text-accent-foreground">Increasing</Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        Positive momentum expected to continue
                      </p>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">Key Market Factors</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Seasonal harvest patterns affecting supply</li>
                      <li>• Strong international demand from Vietnam and Brazil</li>
                      <li>• Weather conditions in key growing regions</li>
                      <li>• Processing capacity utilization rates</li>
                      <li>• Government export incentive policies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Price Forecast & Projections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Price Forecasting</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced analytics and machine learning models for price prediction
                  </p>
                  <Button className="bg-primary text-primary-foreground">
                    View Detailed Forecast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Trading Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Raw Cashew Trading</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with verified buyers and sellers in the raw cashew market
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button className="bg-primary text-primary-foreground">
                      Browse Listings
                    </Button>
                    <Button variant="outline">
                      Post Requirement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}