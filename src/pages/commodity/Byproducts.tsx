import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recycle, Leaf, Factory, TrendingUp, Package, Globe } from "lucide-react";

export default function Byproducts() {
  const byproducts = [
    {
      name: "Cashew Shell",
      price: 12,
      applications: ["Fuel briquettes", "Biomass energy", "Organic fertilizer"],
      sustainability: "High",
      volume: "85%"
    },
    {
      name: "Cashew Apple",
      price: 8,
      applications: ["Juice production", "Alcoholic beverages", "Vinegar"],
      sustainability: "Medium",
      volume: "60%"
    },
    {
      name: "Testa (Skin)",
      price: 15,
      applications: ["Animal feed", "Organic fertilizer", "Mulching"],
      sustainability: "High",
      volume: "95%"
    },
    {
      name: "Broken Kernels",
      price: 450,
      applications: ["Food processing", "Confectionery", "Paste production"],
      sustainability: "Low",
      volume: "5-8%"
    }
  ];

  const sustainabilityMetrics = {
    wasteReduction: "92%",
    valueAddition: "₹180 Cr",
    co2Reduction: "45%",
    circularEconomy: "Enabled"
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cashew By-products</h1>
            <p className="text-muted-foreground">Sustainable value creation from cashew processing waste streams</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground">
              <Recycle className="w-4 h-4 mr-2" />
              Sustainability Report
            </Button>
            <Button variant="outline">
              <Factory className="w-4 h-4 mr-2" />
              Processing Partners
            </Button>
          </div>
        </div>

        {/* Sustainability Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Waste Reduction</p>
                  <p className="text-2xl font-bold text-foreground">{sustainabilityMetrics.wasteReduction}</p>
                  <p className="text-xs text-success mt-1">Zero-waste goal</p>
                </div>
                <Recycle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Value Addition</p>
                  <p className="text-2xl font-bold text-foreground">{sustainabilityMetrics.valueAddition}</p>
                  <p className="text-xs text-muted-foreground mt-1">Annual industry value</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CO₂ Reduction</p>
                  <p className="text-2xl font-bold text-foreground">{sustainabilityMetrics.co2Reduction}</p>
                  <p className="text-xs text-success mt-1">Environmental impact</p>
                </div>
                <Leaf className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Circular Economy</p>
                  <p className="text-2xl font-bold text-foreground">{sustainabilityMetrics.circularEconomy}</p>
                  <p className="text-xs text-muted-foreground mt-1">Full utilization</p>
                </div>
                <Globe className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">By-products</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="processing">Processing Tech</TabsTrigger>
            <TabsTrigger value="markets">Market Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Cashew By-products Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {byproducts.map((product, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{product.name}</h3>
                            <Badge className={
                              product.sustainability === 'High' ? 'bg-success text-success-foreground' :
                              product.sustainability === 'Medium' ? 'bg-primary text-primary-foreground' :
                              'bg-secondary text-secondary-foreground'
                            }>
                              {product.sustainability} Impact
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Utilization Rate: {product.volume} of waste stream
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {product.applications.map((app, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {app}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">₹{product.price}</p>
                          <p className="text-xs text-muted-foreground">per kg</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Sustainability & Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-success/10 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-3">Environmental Benefits</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Reduces agricultural waste by 92%</li>
                        <li>• Prevents 45% CO₂ emissions from landfills</li>
                        <li>• Creates renewable energy sources</li>
                        <li>• Supports organic farming practices</li>
                        <li>• Promotes circular economy principles</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-3">Economic Impact</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Generates additional ₹180 Cr annually</li>
                        <li>• Creates rural employment opportunities</li>
                        <li>• Reduces processing costs by 15%</li>
                        <li>• Enables premium sustainability certification</li>
                        <li>• Opens new revenue streams for farmers</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">Circular Economy Model</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <Package className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">Raw Material</p>
                        <p className="text-xs text-muted-foreground">Cashew processing</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <Factory className="w-6 h-6 text-success mx-auto mb-2" />
                        <p className="text-sm font-medium">Value Addition</p>
                        <p className="text-xs text-muted-foreground">By-product processing</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <Globe className="w-6 h-6 text-accent mx-auto mb-2" />
                        <p className="text-sm font-medium">Market Integration</p>
                        <p className="text-xs text-muted-foreground">Multiple applications</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <Recycle className="w-6 h-6 text-success mx-auto mb-2" />
                        <p className="text-sm font-medium">Circular Loop</p>
                        <p className="text-xs text-muted-foreground">Zero waste achieved</p>
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
                  Processing Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Factory className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Advanced Processing Solutions</h3>
                  <p className="text-muted-foreground mb-4">
                    Innovative technologies for maximum value extraction from cashew by-products
                  </p>
                  <Button className="bg-primary text-primary-foreground">
                    Explore Technologies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="markets">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Market Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Emerging Markets</h3>
                  <p className="text-muted-foreground mb-4">
                    Growing demand for sustainable by-products across various industries
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button className="bg-primary text-primary-foreground">
                      Market Analysis
                    </Button>
                    <Button variant="outline">
                      Partnership Opportunities
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