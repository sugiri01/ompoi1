import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, Users, Ship, Route, MapPin } from "lucide-react";

export default function Distribution() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Distribution Platform</h1>
          <p className="text-muted-foreground">Manage distribution networks and logistics operations</p>
        </div>

        <Tabs defaultValue="routing" className="w-full">
          <TabsList className="bg-muted">
            <TabsTrigger value="routing">Order Routing</TabsTrigger>
            <TabsTrigger value="customers">Customer Management</TabsTrigger>
            <TabsTrigger value="shipping">Shipping Integration</TabsTrigger>
            <TabsTrigger value="optimization">Route Optimization</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="routing" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  Order Routing
                </CardTitle>
                <CardDescription>Route orders to appropriate distribution centers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Order routing interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Customer Management
                </CardTitle>
                <CardDescription>Manage distribution customer database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Customer management interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="w-5 h-5 text-primary" />
                  Shipping Integration
                </CardTitle>
                <CardDescription>Integrate with shipping carriers and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Shipping integration interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="w-5 h-5 text-primary" />
                  Route Optimization
                </CardTitle>
                <CardDescription>Optimize delivery routes for efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Route optimization interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Tracking
                </CardTitle>
                <CardDescription>Track shipments and deliveries in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Tracking interface coming soon...</p>
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
