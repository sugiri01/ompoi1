import { TrendingUp, Brain, BarChart3, Target, Calendar, Download } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analysis = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Market Analysis</h1>
            <p className="text-muted-foreground">AI-powered insights and predictive analytics</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* AI Predictions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-primary text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Price Forecast
              </CardTitle>
              <CardDescription className="text-white/80">
                30-day prediction model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>W240 Kernels</span>
                  <Badge className="bg-white/20 text-white">+5.2%</Badge>
                </div>
                <Progress value={75} className="bg-white/20" />
                <p className="text-sm text-white/80">
                  Expected price increase to $10.35/kg based on supply analysis
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-success" />
                Market Sentiment
              </CardTitle>
              <CardDescription>
                Current market confidence index
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-success">Bullish</div>
                <Progress value={68} className="bg-muted" />
                <p className="text-sm text-muted-foreground">
                  68% positive sentiment based on trade volumes and price trends
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-warning" />
                Volatility Index
              </CardTitle>
              <CardDescription>
                30-day price volatility measure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-warning">Moderate</div>
                <Progress value={42} className="bg-muted" />
                <p className="text-sm text-muted-foreground">
                  4.2% average daily price variation across major grades
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Price Trends</TabsTrigger>
            <TabsTrigger value="supply">Supply Chain</TabsTrigger>
            <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Price Analysis</CardTitle>
                  <CardDescription>
                    Comparative pricing across major production regions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Vietnam (W320)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-success">+3.1%</span>
                        <span className="font-medium">$8.95</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>India (W240)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-success">+2.4%</span>
                        <span className="font-medium">$9.80</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ivory Coast (W320)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-destructive">-0.8%</span>
                        <span className="font-medium">$8.75</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                  <CardDescription>
                    Historical seasonal price variations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Q1 (Harvest Season)</span>
                      <Badge variant="secondary">-12% avg</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Q2 (Processing Peak)</span>
                      <Badge variant="secondary">+5% avg</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Q3 (Export Rush)</span>
                      <Badge variant="secondary">+8% avg</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Q4 (Holiday Demand)</span>
                      <Badge variant="secondary">+15% avg</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="supply" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Analytics</CardTitle>
                <CardDescription>
                  Current supply chain status and bottlenecks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">85%</div>
                    <p className="text-sm text-muted-foreground">Port Capacity Utilization</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">12 days</div>
                    <p className="text-sm text-muted-foreground">Avg Processing Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">3 days</div>
                    <p className="text-sm text-muted-foreground">Shipping Delays</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demand" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Global Demand Forecast</CardTitle>
                <CardDescription>
                  Predicted demand patterns by region and grade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">North America</h4>
                      <p className="text-sm text-muted-foreground">Premium grades (W180, W210)</p>
                    </div>
                    <Badge className="bg-success text-white">+12%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Europe</h4>
                      <p className="text-sm text-muted-foreground">Organic certified products</p>
                    </div>
                    <Badge className="bg-success text-white">+8%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Asia Pacific</h4>
                      <p className="text-sm text-muted-foreground">Standard grades (W320, W450)</p>
                    </div>
                    <Badge className="bg-warning text-white">+3%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Report</CardTitle>
                  <CardDescription>Comprehensive market analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>December 2024</span>
                    </div>
                    <Button size="sm">Download PDF</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly Outlook</CardTitle>
                  <CardDescription>Q1 2025 predictions and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Q1 2025 Forecast</span>
                    </div>
                    <Button size="sm" variant="outline">Preview</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analysis;