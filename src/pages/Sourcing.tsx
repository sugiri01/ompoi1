import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, FileQuestion, Award, Star, CheckSquare } from "lucide-react";

export default function Sourcing() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sourcing Portal</h1>
          <p className="text-muted-foreground">Connect with suppliers and manage sourcing operations</p>
        </div>

        <Tabs defaultValue="directory" className="w-full">
          <TabsList className="bg-muted">
            <TabsTrigger value="directory">Supplier Directory</TabsTrigger>
            <TabsTrigger value="rfq">RFQ Management</TabsTrigger>
            <TabsTrigger value="qualification">Qualification</TabsTrigger>
            <TabsTrigger value="rating">Performance Rating</TabsTrigger>
            <TabsTrigger value="acceptance">Quote Acceptance</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Supplier Directory
                </CardTitle>
                <CardDescription>Browse and search verified suppliers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Supplier directory interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rfq" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-primary" />
                  RFQ Management
                </CardTitle>
                <CardDescription>Create and manage requests for quotation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">RFQ management interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qualification" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Supplier Qualification
                </CardTitle>
                <CardDescription>Assess and qualify potential suppliers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Supplier qualification interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rating" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Performance Rating
                </CardTitle>
                <CardDescription>Rate and review supplier performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Performance rating interface coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="acceptance" className="mt-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-primary" />
                  Quote Acceptance
                </CardTitle>
                <CardDescription>Review and accept supplier quotes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg border border-border">
                    <p className="text-sm text-foreground">Quote acceptance interface coming soon...</p>
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
