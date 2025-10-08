import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Droplets, Sprout, Package, TrendingUp, AlertTriangle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Farm {
  id: string;
  name: string;
  location: any;
  total_area: number;
  soil_type: string;
  irrigation_type: string;
}

interface CropPlan {
  id: string;
  farm_id: string;
  product_id: string;
  planned_area: number;
  planting_date: string;
  expected_harvest_date: string;
  expected_yield: number;
  status: string;
}

export default function Farm() {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.userRole;
  const isOwner = userRole === 'farmer';
  const { toast } = useToast();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [cropPlans, setCropPlans] = useState<CropPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFarms();
      fetchCropPlans();
    }
  }, [user]);

  const fetchFarms = async () => {
    try {
      const { data, error } = await supabase
        .from("farms")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFarms(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch farms",
        variant: "destructive",
      });
    }
  };

  const fetchCropPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("crop_planning")
        .select("*")
        .order("planting_date", { ascending: true });

      if (error) throw error;
      setCropPlans(data || []);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch crop plans",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned": return "bg-secondary text-secondary-foreground";
      case "planted": return "bg-primary text-primary-foreground";
      case "growing": return "bg-success text-success-foreground";
      case "harvested": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-pulse text-muted-foreground">Loading farm data...</div>
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
            <h1 className="text-3xl font-bold text-foreground">Farm Management</h1>
            <p className="text-muted-foreground">Manage your farms, crops, and agricultural operations</p>
          </div>
          {isOwner && (
            <Button className="bg-primary text-primary-foreground">
              <Sprout className="w-4 h-4 mr-2" />
              Add New Farm
            </Button>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">Crop Planning</TabsTrigger>
            <TabsTrigger value="inputs">Farm Inputs</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              {/* Farm Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Farms</p>
                        <p className="text-2xl font-bold text-foreground">{farms.length}</p>
                      </div>
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Area</p>
                        <p className="text-2xl font-bold text-foreground">
                          {farms.reduce((acc, farm) => acc + farm.total_area, 0)} acres
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Crops</p>
                        <p className="text-2xl font-bold text-foreground">
                          {cropPlans.filter(plan => plan.status === 'growing').length}
                        </p>
                      </div>
                      <Sprout className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Upcoming Harvest</p>
                        <p className="text-2xl font-bold text-foreground">
                          {cropPlans.filter(plan => plan.status === 'growing' && 
                            new Date(plan.expected_harvest_date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
                        </p>
                      </div>
                      <Package className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Farms List */}
              <Card className="bg-gradient-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Your Farms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {farms.length === 0 ? (
                    <div className="text-center py-12">
                      <Sprout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No farms registered</h3>
                      <p className="text-muted-foreground mb-4">
                        {isOwner ? "Start by adding your first farm to begin managing your agricultural operations." : "No farms available to view."}
                      </p>
                      {isOwner && <Button className="bg-primary text-primary-foreground">Add Your First Farm</Button>}
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {farms.map((farm) => (
                        <div key={farm.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{farm.name}</h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {farm.location?.address || 'Location not set'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4" />
                                  {farm.total_area} acres
                                </div>
                                <div className="flex items-center gap-1">
                                  <Package className="w-4 h-4" />
                                  {farm.soil_type || 'Soil type not set'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Droplets className="w-4 h-4" />
                                  {farm.irrigation_type || 'Irrigation not set'}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">View Details</Button>
                              {!isOwner && (
                                <Button variant="outline" size="sm">Contact Owner</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="crops">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="w-5 h-5" />
                    Crop Planning Calendar
                  </CardTitle>
                  {isOwner && (
                    <Button className="bg-primary text-primary-foreground">
                      <Sprout className="w-4 h-4 mr-2" />
                      Plan New Crop
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {cropPlans.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No crop plans</h3>
                    <p className="text-muted-foreground mb-4">Create your first crop plan to start managing your agricultural calendar.</p>
                    <Button className="bg-primary text-primary-foreground">Create Crop Plan</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cropPlans.map((plan) => (
                      <div key={plan.id} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-foreground">Crop Plan #{plan.id.slice(0, 8)}</h3>
                              <Badge className={getStatusColor(plan.status)}>
                                {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                              <div>
                                <span className="font-medium">Area:</span> {plan.planned_area} acres
                              </div>
                              <div>
                                <span className="font-medium">Planting:</span> {new Date(plan.planting_date).toLocaleDateString()}
                              </div>
                              <div>
                                <span className="font-medium">Harvest:</span> {new Date(plan.expected_harvest_date).toLocaleDateString()}
                              </div>
                              <div>
                                <span className="font-medium">Expected Yield:</span> {plan.expected_yield} MT
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inputs">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Farm Inputs Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Input Management</h3>
                  <p className="text-muted-foreground mb-4">Track seeds, fertilizers, pesticides and other farm inputs.</p>
                  <Button className="bg-primary text-primary-foreground">Add Farm Input</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weather">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  Weather & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Weather Integration</h3>
                  <p className="text-muted-foreground mb-4">Get weather forecasts and alerts for your farm locations.</p>
                  <Button className="bg-primary text-primary-foreground">Enable Weather Alerts</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Farm Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground mb-4">View yield trends, cost analysis, and performance metrics.</p>
                  <Button className="bg-primary text-primary-foreground">View Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}