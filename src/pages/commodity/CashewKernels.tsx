import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Award, Package, Globe, Star, Users } from "lucide-react";

export default function CashewKernels() {
  const gradeData = [
    { grade: "W180", price: 1250, change: 3.2, description: "Premium white kernels, 180 pieces per lb" },
    { grade: "W210", price: 1180, change: 2.8, description: "Standard white kernels, 210 pieces per lb" },
    { grade: "W240", price: 1120, change: 1.5, description: "Medium white kernels, 240 pieces per lb" },
    { grade: "W320", price: 980, change: -0.8, description: "Small white kernels, 320 pieces per lb" },
    { grade: "SLW", price: 890, change: 2.1, description: "Scorched lightly wholes" },
    { grade: "DW", price: 850, change: 1.9, description: "Dessert wholes" },
  ];

  const qualityMetrics = [
    { metric: "Moisture Content", value: "≤ 5%", status: "optimal" },
    { metric: "Broken Pieces", value: "≤ 5%", status: "good" },
    { metric: "Foreign Matter", value: "≤ 1%", status: "excellent" },
    { metric: "Defective Kernels", value: "≤ 3%", status: "good" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cashew Kernels</h1>
            <p className="text-muted-foreground">Premium processed cashew kernels - grades, pricing, and quality standards</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground">
              <Package className="w-4 h-4 mr-2" />
              Quality Certificate
            </Button>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Export Inquiry
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Grades</p>
                  <p className="text-2xl font-bold text-foreground">15+</p>
                  <p className="text-xs text-muted-foreground mt-1">International standards</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Premium Grade</p>
                  <p className="text-2xl font-bold text-foreground">W180</p>
                  <p className="text-xs text-success mt-1">₹1,250/kg</p>
                </div>
                <Star className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Export Markets</p>
                  <p className="text-2xl font-bold text-foreground">45+</p>
                  <p className="text-xs text-muted-foreground mt-1">Countries worldwide</p>
                </div>
                <Globe className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verified Suppliers</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                  <p className="text-xs text-muted-foreground mt-1">Quality assured</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grades" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="grades">Grades & Pricing</TabsTrigger>
            <TabsTrigger value="quality">Quality Standards</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="export">Export Markets</TabsTrigger>
          </TabsList>

          <TabsContent value="grades">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Cashew Kernel Grades & Current Prices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {gradeData.map((item, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-primary text-primary-foreground font-mono">
                              {item.grade}
                            </Badge>
                            <h3 className="font-semibold text-foreground">{item.description}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Current market price with quality specifications
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">₹{item.price}</p>
                          <div className="flex items-center gap-1 justify-end">
                            <TrendingUp className={`w-3 h-3 ${item.change >= 0 ? 'text-success' : 'text-destructive'}`} />
                            <span className={`text-xs ${item.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                              {item.change > 0 ? '+' : ''}{item.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Quality Standards & Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {qualityMetrics.map((metric, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">{metric.metric}</h3>
                          <Badge className={
                            metric.status === 'excellent' ? 'bg-success text-success-foreground' :
                            metric.status === 'good' ? 'bg-primary text-primary-foreground' :
                            'bg-secondary text-secondary-foreground'
                          }>
                            {metric.status}
                          </Badge>
                        </div>
                        <p className="text-lg font-bold text-foreground">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border border-border rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-4">Certification Standards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-success/10 rounded-lg">
                        <Award className="w-8 h-8 text-success mx-auto mb-2" />
                        <h4 className="font-medium text-foreground">ISO 22000</h4>
                        <p className="text-xs text-muted-foreground">Food Safety Management</p>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-medium text-foreground">HACCP</h4>
                        <p className="text-xs text-muted-foreground">Hazard Analysis Control</p>
                      </div>
                      <div className="text-center p-4 bg-accent/10 rounded-lg">
                        <Globe className="w-8 h-8 text-accent mx-auto mb-2" />
                        <h4 className="font-medium text-foreground">Organic</h4>
                        <p className="text-xs text-muted-foreground">Certified Organic Process</p>
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
                  <Package className="w-5 h-5" />
                  Processing & Value Addition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Processing Operations</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced processing techniques and quality control measures
                  </p>
                  <Button className="bg-primary text-primary-foreground">
                    View Processing Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Export Markets & Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Global Export Markets</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with international buyers and explore export opportunities
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button className="bg-primary text-primary-foreground">
                      Export Inquiry
                    </Button>
                    <Button variant="outline">
                      Market Reports
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