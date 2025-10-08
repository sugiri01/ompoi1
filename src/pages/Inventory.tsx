import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Layers, TrendingUp, Bell, RefreshCw } from "lucide-react";

export default function Inventory() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage stock levels across warehouses</p>
        </div>

        <Tabs defaultValue="tracking" className="w-full">
          <TabsList className="bg-muted">
            <TabsTrigger value="tracking">Stock Tracking</TabsTrigger>
            <TabsTrigger value="batch">Batch Management</TabsTrigger>
            <TabsTrigger value="movements">Stock Movements</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Stock Tracking
                </CardTitle>
                <CardDescription>Monitor inventory levels in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Stock tracking interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batch" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Batch Management
                </CardTitle>
                <CardDescription>Track and manage product batches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Batch management interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movements" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Stock Movements
                </CardTitle>
                <CardDescription>View and manage inventory transfers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Stock movements interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Alerts & Notifications
                </CardTitle>
                <CardDescription>Manage low stock alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Alerts interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reconciliation" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  Reconciliation
                </CardTitle>
                <CardDescription>Reconcile physical and system inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Reconciliation interface coming soon...</p>
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
