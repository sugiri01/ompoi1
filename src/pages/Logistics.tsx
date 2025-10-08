import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Warehouse, Truck, Package, TrendingUp, Thermometer, Clock } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WarehouseData {
  id: string;
  name: string;
  location: any;
  total_capacity: number;
  available_capacity: number;
  storage_conditions: any;
  certifications: string[];
}

interface InventoryMovement {
  id: string;
  warehouse_id: string;
  movement_type: string;
  quantity: number;
  batch_number: string;
  movement_date: string;
  notes: string;
}

export default function Logistics() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [warehouses, setWarehouses] = useState<WarehouseData[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWarehouses();
      fetchMovements();
    }
  }, [user]);

  const fetchWarehouses = async () => {
    try {
      const { data, error } = await supabase
        .from("warehouses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWarehouses(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch warehouses",
        variant: "destructive",
      });
    }
  };

  const fetchMovements = async () => {
    try {
      const { data, error } = await supabase
        .from("inventory_movements")
        .select("*")
        .order("movement_date", { ascending: false })
        .limit(10);

      if (error) throw error;
      setMovements(data || []);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch inventory movements",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const getMovementTypeColor = (type: string) => {
    switch (type) {
      case "inbound": return "bg-success text-success-foreground";
      case "outbound": return "bg-destructive text-destructive-foreground";
      case "transfer": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "inbound": return "↓";
      case "outbound": return "↑";
      case "transfer": return "↔";
      default: return "•";
    }
  };

  const calculateUtilization = (warehouse: WarehouseData) => {
    if (!warehouse.total_capacity) return 0;
    const used = warehouse.total_capacity - warehouse.available_capacity;
    return (used / warehouse.total_capacity) * 100;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-pulse text-muted-foreground">Loading logistics data...</div>
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
            <h1 className="text-3xl font-bold text-foreground">Logistics & Warehousing</h1>
            <p className="text-muted-foreground">Manage warehouses, inventory, and supply chain operations</p>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Warehouse className="w-4 h-4 mr-2" />
            Add Warehouse
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="logistics">Fleet Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              {/* Logistics Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Warehouses</p>
                        <p className="text-2xl font-bold text-foreground">{warehouses.length}</p>
                      </div>
                      <Warehouse className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                        <p className="text-2xl font-bold text-foreground">
                          {warehouses.reduce((acc, w) => acc + w.total_capacity, 0)} MT
                        </p>
                      </div>
                      <Package className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Available Capacity</p>
                        <p className="text-2xl font-bold text-foreground">
                          {warehouses.reduce((acc, w) => acc + w.available_capacity, 0)} MT
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Recent Movements</p>
                        <p className="text-2xl font-bold text-foreground">
                          {movements.filter(m => 
                            new Date(m.movement_date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                          ).length}
                        </p>
                      </div>
                      <Truck className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Warehouse Utilization */}
              <Card className="bg-gradient-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Warehouse className="w-5 h-5" />
                    Warehouse Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {warehouses.length === 0 ? (
                    <div className="text-center py-12">
                      <Warehouse className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No warehouses configured</h3>
                      <p className="text-muted-foreground mb-4">Add your first warehouse to start tracking inventory and storage.</p>
                      <Button className="bg-primary text-primary-foreground">Add Warehouse</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {warehouses.map((warehouse) => {
                        const utilization = calculateUtilization(warehouse);
                        return (
                          <div key={warehouse.id} className="p-4 border border-border rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-medium text-foreground">{warehouse.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {warehouse.location?.address || 'Location not set'}
                                </p>
                              </div>
                              <Badge variant={utilization > 80 ? "destructive" : utilization > 60 ? "default" : "secondary"}>
                                {utilization.toFixed(1)}% Used
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                              <div>
                                <span className="font-medium text-foreground">Total:</span>{' '}
                                <span className="text-muted-foreground">{warehouse.total_capacity} MT</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Available:</span>{' '}
                                <span className="text-muted-foreground">{warehouse.available_capacity} MT</span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Used:</span>{' '}
                                <span className="text-muted-foreground">
                                  {warehouse.total_capacity - warehouse.available_capacity} MT
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-foreground">Conditions:</span>{' '}
                                <span className="text-muted-foreground">
                                  {warehouse.storage_conditions?.temperature || 'N/A'}°C
                                </span>
                              </div>
                            </div>
                            
                            <Progress value={utilization} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Inventory Movements */}
              <Card className="bg-gradient-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Recent Inventory Movements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {movements.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No inventory movements recorded</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {movements.slice(0, 5).map((movement) => (
                        <div key={movement.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <Badge className={getMovementTypeColor(movement.movement_type)}>
                                {getMovementIcon(movement.movement_type)} {movement.movement_type.toUpperCase()}
                              </Badge>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {movement.quantity} MT
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Batch: {movement.batch_number || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              {new Date(movement.movement_date).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(movement.movement_date).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="warehouses">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Warehouse className="w-5 h-5" />
                    Warehouse Management
                  </CardTitle>
                  <Button className="bg-primary text-primary-foreground">
                    <Warehouse className="w-4 h-4 mr-2" />
                    Add Warehouse
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {warehouses.length === 0 ? (
                  <div className="text-center py-12">
                    <Warehouse className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No warehouses</h3>
                    <p className="text-muted-foreground mb-4">Add your first warehouse to start managing inventory and storage operations.</p>
                    <Button className="bg-primary text-primary-foreground">Add First Warehouse</Button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {warehouses.map((warehouse) => {
                      const utilization = calculateUtilization(warehouse);
                      return (
                        <div key={warehouse.id} className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="p-3 bg-primary/10 rounded-lg">
                                <Warehouse className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-1">{warehouse.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {warehouse.location?.address || 'Location not set'}
                                </p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                  <div>
                                    <span className="font-medium text-foreground">Capacity:</span>{' '}
                                    <span className="text-muted-foreground">{warehouse.total_capacity} MT</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-foreground">Available:</span>{' '}
                                    <span className="text-muted-foreground">{warehouse.available_capacity} MT</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-foreground">Utilization:</span>{' '}
                                    <span className="text-muted-foreground">{utilization.toFixed(1)}%</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-foreground">Temperature:</span>{' '}
                                    <span className="text-muted-foreground">
                                      {warehouse.storage_conditions?.temperature || 'N/A'}°C
                                    </span>
                                  </div>
                                </div>

                                <Progress value={utilization} className="h-2 mb-3" />

                                {warehouse.certifications && warehouse.certifications.length > 0 && (
                                  <div className="flex gap-2">
                                    {warehouse.certifications.map((cert, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {cert}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Inventory Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Inventory Tracking</h3>
                  <p className="text-muted-foreground mb-4">Real-time inventory tracking with FIFO management and quality monitoring.</p>
                  <Button className="bg-primary text-primary-foreground">Setup Inventory Tracking</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logistics">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Fleet Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Transportation Management</h3>
                  <p className="text-muted-foreground mb-4">Manage fleet operations, route optimization, and delivery tracking.</p>
                  <Button className="bg-primary text-primary-foreground">Setup Fleet Management</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}