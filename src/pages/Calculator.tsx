import { useState } from "react";
import { Calculator as CalcIcon, TrendingUp, RefreshCw } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Calculator = () => {
  const [priceCalc, setPriceCalc] = useState({
    rawPrice: "",
    processingCost: "",
    yieldRate: "",
    grade: ""
  });

  const [equivalenceCalc, setEquivalenceCalc] = useState({
    sourceGrade: "",
    targetGrade: "",
    quantity: "",
    sourcePrice: ""
  });

  const [cnslCalc, setCnslCalc] = useState({
    rawQuantity: "",
    cnslYield: "22",
    marketPrice: ""
  });

  const calculateKernelPrice = () => {
    const raw = parseFloat(priceCalc.rawPrice);
    const processing = parseFloat(priceCalc.processingCost);
    const yieldValue = parseFloat(priceCalc.yieldRate) / 100;
    
    if (raw && processing && yieldValue) {
      return ((raw / yieldValue) + processing).toFixed(2);
    }
    return "0.00";
  };

  const calculateEquivalentPrice = () => {
    const price = parseFloat(equivalenceCalc.sourcePrice);
    const qty = parseFloat(equivalenceCalc.quantity);
    
    // Mock conversion rates between grades
    const conversionRates: any = {
      "W240-W320": 0.92,
      "W320-W240": 1.09,
      "W180-W240": 1.15,
      "W240-W180": 0.87
    };
    
    const conversionKey = `${equivalenceCalc.sourceGrade}-${equivalenceCalc.targetGrade}`;
    const rate = conversionRates[conversionKey] || 1;
    
    if (price && qty) {
      return (price * rate).toFixed(2);
    }
    return "0.00";
  };

  const calculateCnslValue = () => {
    const rawQty = parseFloat(cnslCalc.rawQuantity);
    const yieldValue = parseFloat(cnslCalc.cnslYield) / 100;
    const price = parseFloat(cnslCalc.marketPrice);
    
    if (rawQty && yieldValue && price) {
      const cnslQty = rawQty * yieldValue;
      return (cnslQty * price).toFixed(2);
    }
    return "0.00";
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Price Calculator</h1>
            <p className="text-muted-foreground">Calculate pricing, conversions, and valuations</p>
          </div>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Rates
          </Button>
        </div>

        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pricing">Kernel Pricing</TabsTrigger>
            <TabsTrigger value="equivalence">Grade Equivalence</TabsTrigger>
            <TabsTrigger value="cnsl">CNSL Valuation</TabsTrigger>
            <TabsTrigger value="margin">Margin Analysis</TabsTrigger>
          </TabsList>

          {/* Kernel Pricing Calculator */}
          <TabsContent value="pricing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalcIcon className="h-5 w-5" />
                    Kernel Price Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate cashew kernel pricing based on raw material costs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rawPrice">Raw Cashew Price ($/kg)</Label>
                      <Input
                        id="rawPrice"
                        value={priceCalc.rawPrice}
                        onChange={(e) => setPriceCalc({...priceCalc, rawPrice: e.target.value})}
                        placeholder="2.15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="processingCost">Processing Cost ($/kg)</Label>
                      <Input
                        id="processingCost"
                        value={priceCalc.processingCost}
                        onChange={(e) => setPriceCalc({...priceCalc, processingCost: e.target.value})}
                        placeholder="1.50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yieldRate">Yield Rate (%)</Label>
                      <Input
                        id="yieldRate"
                        value={priceCalc.yieldRate}
                        onChange={(e) => setPriceCalc({...priceCalc, yieldRate: e.target.value})}
                        placeholder="22"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Kernel Grade</Label>
                      <Select value={priceCalc.grade} onValueChange={(value) => setPriceCalc({...priceCalc, grade: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="W180">W180</SelectItem>
                          <SelectItem value="W210">W210</SelectItem>
                          <SelectItem value="W240">W240</SelectItem>
                          <SelectItem value="W320">W320</SelectItem>
                          <SelectItem value="W450">W450</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calculated Price</CardTitle>
                  <CardDescription>
                    Based on your input parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-primary">
                      ${calculateKernelPrice()}
                    </div>
                    <p className="text-muted-foreground">per kilogram</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Raw material cost:</span>
                        <span>${(parseFloat(priceCalc.rawPrice || "0") / (parseFloat(priceCalc.yieldRate || "1") / 100)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing cost:</span>
                        <span>${priceCalc.processingCost || "0.00"}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-medium">
                        <span>Total cost:</span>
                        <span>${calculateKernelPrice()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Grade Equivalence Calculator */}
          <TabsContent value="equivalence">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Equivalence Calculator</CardTitle>
                  <CardDescription>
                    Convert pricing between different cashew kernel grades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Source Grade</Label>
                      <Select value={equivalenceCalc.sourceGrade} onValueChange={(value) => setEquivalenceCalc({...equivalenceCalc, sourceGrade: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="From grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="W180">W180</SelectItem>
                          <SelectItem value="W210">W210</SelectItem>
                          <SelectItem value="W240">W240</SelectItem>
                          <SelectItem value="W320">W320</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Target Grade</Label>
                      <Select value={equivalenceCalc.targetGrade} onValueChange={(value) => setEquivalenceCalc({...equivalenceCalc, targetGrade: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="To grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="W180">W180</SelectItem>
                          <SelectItem value="W210">W210</SelectItem>
                          <SelectItem value="W240">W240</SelectItem>
                          <SelectItem value="W320">W320</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sourcePrice">Source Price ($/kg)</Label>
                      <Input
                        id="sourcePrice"
                        value={equivalenceCalc.sourcePrice}
                        onChange={(e) => setEquivalenceCalc({...equivalenceCalc, sourcePrice: e.target.value})}
                        placeholder="9.80"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (MT)</Label>
                      <Input
                        id="quantity"
                        value={equivalenceCalc.quantity}
                        onChange={(e) => setEquivalenceCalc({...equivalenceCalc, quantity: e.target.value})}
                        placeholder="10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Equivalent Price</CardTitle>
                  <CardDescription>
                    Converted price for target grade
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-success">
                      ${calculateEquivalentPrice()}
                    </div>
                    <p className="text-muted-foreground">per kilogram ({equivalenceCalc.targetGrade})</p>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        <span>Market premium/discount applied</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CNSL Valuation */}
          <TabsContent value="cnsl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>CNSL Valuation Calculator</CardTitle>
                  <CardDescription>
                    Calculate Cashew Nut Shell Liquid value from raw cashews
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rawQuantity">Raw Cashew Quantity (MT)</Label>
                    <Input
                      id="rawQuantity"
                      value={cnslCalc.rawQuantity}
                      onChange={(e) => setCnslCalc({...cnslCalc, rawQuantity: e.target.value})}
                      placeholder="100"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cnslYield">CNSL Yield Rate (%)</Label>
                    <Input
                      id="cnslYield"
                      value={cnslCalc.cnslYield}
                      onChange={(e) => setCnslCalc({...cnslCalc, cnslYield: e.target.value})}
                      placeholder="22"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="marketPrice">CNSL Market Price ($/kg)</Label>
                    <Input
                      id="marketPrice"
                      value={cnslCalc.marketPrice}
                      onChange={(e) => setCnslCalc({...cnslCalc, marketPrice: e.target.value})}
                      placeholder="0.85"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CNSL Value</CardTitle>
                  <CardDescription>
                    Total CNSL value from processing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-warning">
                      ${calculateCnslValue()}
                    </div>
                    <p className="text-muted-foreground">total CNSL value</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>CNSL quantity:</span>
                        <span>{(parseFloat(cnslCalc.rawQuantity || "0") * parseFloat(cnslCalc.cnslYield || "0") / 100).toFixed(1)} MT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Market price:</span>
                        <span>${cnslCalc.marketPrice || "0.00"}/kg</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Margin Analysis */}
          <TabsContent value="margin">
            <Card>
              <CardHeader>
                <CardTitle>Margin Analysis</CardTitle>
                <CardDescription>
                  Comprehensive profitability analysis for cashew processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CalcIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Advanced margin analysis tools will be available in the next update
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Calculator;