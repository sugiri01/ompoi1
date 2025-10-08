import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, FileText, Ship, CheckCircle, DollarSign } from "lucide-react";

export default function ExportManagement() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Export Management</h1>
          <p className="text-muted-foreground">Manage international orders, shipments, and documentation</p>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="bg-muted">
            <TabsTrigger value="orders">Order Processing</TabsTrigger>
            <TabsTrigger value="tracking">Shipment Tracking</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="customs">Customs Clearance</TabsTrigger>
            <TabsTrigger value="currency">Multi-Currency</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Order Processing
                </CardTitle>
                <CardDescription>Process and manage international export orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Export order processing interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="w-5 h-5 text-primary" />
                  Shipment Tracking
                </CardTitle>
                <CardDescription>Track shipments in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Shipment tracking interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Documentation
                </CardTitle>
                <CardDescription>Manage export documentation and certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Documentation management interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customs" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Customs Clearance
                </CardTitle>
                <CardDescription>Handle customs procedures and compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Customs clearance interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="currency" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Multi-Currency Support
                </CardTitle>
                <CardDescription>Manage transactions in multiple currencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Currency management interface coming soon...</p>
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
