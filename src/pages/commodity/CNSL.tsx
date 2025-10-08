import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, TrendingUp, Factory, Beaker, Globe, Truck } from "lucide-react";

export default function CNSL() {
  const applicationAreas = [
    { name: "Friction Materials", usage: "35%", description: "Brake linings, clutch facings" },
    { name: "Resins & Adhesives", usage: "25%", description: "Industrial adhesives, coatings" },
    { name: "Surface Coatings", usage: "20%", description: "Paints, varnishes, protective coatings" },
    { name: "Foundry Chemicals", usage: "15%", description: "Shell molding, core binders" },
    { name: "Others", usage: "5%", description: "Specialty applications" },
  ];

  const marketData = {
    currentPrice: 45,
    dailyChange: 1.8,
    volume: "1,250 MT",
    purity: "≥90%",
    applications: "15+",
    exportMarkets: "25+"
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cashew Nut Shell Liquid (CNSL)</h1>
            <p className="text-muted-foreground">Industrial raw material with diverse applications in manufacturing</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground">
              <Beaker className="w-4 h-4 mr-2" />
              Technical Specs
            </Button>
            <Button variant="outline">
              <Factory className="w-4 h-4 mr-2" />
              Processing Units
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Price</p>
                  <p className="text-2xl font-bold text-foreground">₹{marketData.currentPrice}/kg</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs text-success">+{marketData.dailyChange}%</span>
                  </div>
                </div>
                <Droplets className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trading Volume</p>
                  <p className="text-2xl font-bold text-foreground">{marketData.volume}</p>
                  <p className="text-xs text-muted-foreground mt-1">Monthly average</p>
                </div>
                <Truck className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold text-foreground">{marketData.applications}</p>
                  <p className="text-xs text-muted-foreground mt-1">Industrial uses</p>
                </div>
                <Factory className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Export Markets</p>
                  <p className="text-2xl font-bold text-foreground">{marketData.exportMarkets}</p>
                  <p className="text-xs text-muted-foreground mt-1">Countries served</p>
                </div>
                <Globe className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="technical">Technical Data</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Factory className="w-5 h-5" />
                  Industrial Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationAreas.map((app, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{app.name}</h3>
                        <Badge className="bg-primary text-primary-foreground">
                          {app.usage}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{app.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Key Benefits</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Natural phenolic compound with unique properties</li>
                    <li>• Excellent heat resistance and chemical stability</li>
                    <li>• Renewable and sustainable raw material</li>
                    <li>• Cost-effective alternative to synthetic compounds</li>
                    <li>• Environmentally friendly industrial solution</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5" />
                  Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Chemical Properties</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Cardanol Content</span>
                        <span className="text-foreground">60-65%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Cardol Content</span>
                        <span className="text-foreground">15-20%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">2-Methyl Cardol</span>
                        <span className="text-foreground">2-8%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Polymeric Material</span>
                        <span className="text-foreground">10-15%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Physical Properties</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Specific Gravity</span>
                        <span className="text-foreground">0.925-0.935</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Viscosity (25°C)</span>
                        <span className="text-foreground">20-300 cP</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Flash Point</span>
                        <span className="text-foreground">180-200°C</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Color</span>
                        <span className="text-foreground">Dark Brown</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Factory className="w-5 h-5" />
                  Processing & Extraction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Factory className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">CNSL Processing Units</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced extraction and purification processes for high-quality CNSL production
                  </p>
                  <Button className="bg-primary text-primary-foreground">
                    View Processing Technologies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Market Analysis & Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-success/10 rounded-lg text-center">
                      <h3 className="font-semibold text-foreground mb-2">Market Growth</h3>
                      <p className="text-2xl font-bold text-success">12%</p>
                      <p className="text-xs text-muted-foreground">Annual growth rate</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <h3 className="font-semibold text-foreground mb-2">Global Demand</h3>
                      <p className="text-2xl font-bold text-primary">↑</p>
                      <p className="text-xs text-muted-foreground">Increasing trend</p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg text-center">
                      <h3 className="font-semibold text-foreground mb-2">Price Outlook</h3>
                      <p className="text-2xl font-bold text-accent">Stable</p>
                      <p className="text-xs text-muted-foreground">Medium term</p>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">Market Drivers</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Growing automotive industry demand for friction materials</li>
                      <li>• Increasing focus on renewable industrial chemicals</li>
                      <li>• Expanding applications in coatings and adhesives</li>
                      <li>• Rising environmental awareness driving bio-based alternatives</li>
                      <li>• Strong growth in Asian manufacturing sectors</li>
                    </ul>
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