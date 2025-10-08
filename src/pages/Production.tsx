import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Inbox, Droplet, CircleDot, Filter, PackageCheck, CheckCircle2, TrendingUp } from "lucide-react";

export default function Production() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Production Management</h1>
          <p className="text-muted-foreground">Manage cashew processing operations from raw to finished</p>
        </div>

        <Tabs defaultValue="receiving" className="w-full">
          <TabsList className="bg-muted">
            <TabsTrigger value="receiving">Receiving</TabsTrigger>
            <TabsTrigger value="steaming">Steaming</TabsTrigger>
            <TabsTrigger value="shelling">Shelling</TabsTrigger>
            <TabsTrigger value="grading">Grading</TabsTrigger>
            <TabsTrigger value="packaging">Packaging</TabsTrigger>
            <TabsTrigger value="quality">Quality Control</TabsTrigger>
            <TabsTrigger value="yield">Yield Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="receiving" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-primary" />
                  Receiving
                </CardTitle>
                <CardDescription>Log and inspect incoming raw materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Receiving interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="steaming" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-primary" />
                  Steaming
                </CardTitle>
                <CardDescription>Manage steaming process and parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Steaming interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shelling" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleDot className="w-5 h-5 text-primary" />
                  Shelling
                </CardTitle>
                <CardDescription>Track shelling operations and efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Shelling interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grading" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Grading
                </CardTitle>
                <CardDescription>Grade and sort cashew kernels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Grading interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packaging" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PackageCheck className="w-5 h-5 text-primary" />
                  Packaging
                </CardTitle>
                <CardDescription>Manage packaging operations and labeling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Packaging interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Quality Control
                </CardTitle>
                <CardDescription>Monitor quality standards and testing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Quality control interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yield" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Yield Tracking
                </CardTitle>
                <CardDescription>Track production yields and efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Yield tracking interface coming soon...</p>
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
