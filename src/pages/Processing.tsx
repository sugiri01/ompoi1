import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Factory, Package2, Truck, BarChart3, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProcessingFacility {
  id: string;
  name: string;
  facility_type: string;
  location: any;
  capacity: number;
  capacity_unit: string;
  certifications: string[];
}

interface ProcessingBatch {
  id: string;
  batch_number: string;
  raw_material_quantity: number;
  processed_quantity: number;
  processing_date: string;
  quality_grade: string;
  status: string;
}

export default function Processing() {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.userRole;
  const isOwner = userRole === 'processor';
  const { toast } = useToast();
  const [facilities, setFacilities] = useState<ProcessingFacility[]>([]);
  const [batches, setBatches] = useState<ProcessingBatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFacilities();
      fetchBatches();
    }
  }, [user]);

  const fetchFacilities = async () => {
    try {
      const { data, error } = await supabase
        .from("processing_facilities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFacilities(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch processing facilities",
        variant: "destructive",
      });
    }
  };

  const fetchBatches = async () => {
    try {
      const { data, error } = await supabase
        .from("processing_batches")
        .select("*")
        .order("processing_date", { ascending: false });

      if (error) throw error;
      setBatches(data || []);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch processing batches",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress": return "bg-primary text-primary-foreground";
      case "completed": return "bg-success text-success-foreground";
      case "rejected": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getFacilityTypeIcon = (type: string) => {
    switch (type) {
      case "processing_unit": return Factory;
      case "warehouse": return Package2;
      case "cold_storage": return Truck;
      default: return Factory;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-pulse text-muted-foreground">Loading processing data...</div>
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
            <h1 className="text-3xl font-bold text-foreground">Processing & Value Addition</h1>
            <p className="text-muted-foreground">Manage processing facilities, batches, and quality control</p>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Factory className="w-4 h-4 mr-2" />
            Add Facility
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="batches">Processing Batches</TabsTrigger>
            <TabsTrigger value="quality">Quality Control</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              {/* Processing Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Facilities</p>
                        <p className="text-2xl font-bold text-foreground">{facilities.length}</p>
                      </div>
                      <Factory className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                        <p className="text-2xl font-bold text-foreground">
                          {facilities.reduce((acc, facility) => acc + facility.capacity, 0)} MT
                        </p>
                      </div>
                      <Package2 className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Batches</p>
                        <p className="text-2xl font-bold text-foreground">
                          {batches.filter(batch => batch.status === 'in_progress').length}
                        </p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                        <p className="text-2xl font-bold text-foreground">
                          {batches.filter(batch => 
                            batch.status === 'completed' && 
                            new Date(batch.processing_date).toDateString() === new Date().toDateString()
                          ).length}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-gradient-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Recent Processing Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {batches.length === 0 ? (
                    <div className="text-center py-12">
                      <Package2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No processing batches</h3>
                      <p className="text-muted-foreground mb-4">Start your first processing batch to begin value addition operations.</p>
                      <Button className="bg-primary text-primary-foreground">Start Processing</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {batches.slice(0, 5).map((batch) => (
                        <div key={batch.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              <Badge className={getStatusColor(batch.status)}>
                                {batch.status === 'in_progress' && <Factory className="w-3 h-3 mr-1" />}
                                {batch.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {batch.status === 'rejected' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {batch.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Batch #{batch.batch_number}</p>
                              <p className="text-sm text-muted-foreground">
                                {batch.raw_material_quantity} MT → {batch.processed_quantity || 0} MT
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{batch.quality_grade || 'Pending'}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(batch.processing_date).toLocaleDateString()}
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

          <TabsContent value="facilities">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="w-5 h-5" />
                    Processing Facilities
                  </CardTitle>
                  <Button className="bg-primary text-primary-foreground">
                    <Factory className="w-4 h-4 mr-2" />
                    Add Facility
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {facilities.length === 0 ? (
                  <div className="text-center py-12">
                    <Factory className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No processing facilities</h3>
                    <p className="text-muted-foreground mb-4">Add your first processing facility to start managing production.</p>
                    <Button className="bg-primary text-primary-foreground">Add Processing Facility</Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {facilities.map((facility) => {
                      const IconComponent = getFacilityTypeIcon(facility.facility_type);
                      return (
                        <div key={facility.id} className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <IconComponent className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-1">{facility.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {facility.facility_type.replace('_', ' ').toUpperCase()}
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium text-foreground">Capacity:</span>{' '}
                                    <span className="text-muted-foreground">{facility.capacity} {facility.capacity_unit}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-foreground">Location:</span>{' '}
                                    <span className="text-muted-foreground">{facility.location?.address || 'Not set'}</span>
                                  </div>
                                </div>
                                {facility.certifications && facility.certifications.length > 0 && (
                                  <div className="flex gap-2 mt-3">
                                    {facility.certifications.map((cert, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {cert}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batches">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Package2 className="w-5 h-5" />
                    Processing Batches
                  </CardTitle>
                  <Button className="bg-primary text-primary-foreground">
                    <Package2 className="w-4 h-4 mr-2" />
                    New Batch
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {batches.length === 0 ? (
                  <div className="text-center py-12">
                    <Package2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No processing batches</h3>
                    <p className="text-muted-foreground mb-4">Create your first processing batch to begin production tracking.</p>
                    <Button className="bg-primary text-primary-foreground">Create Batch</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {batches.map((batch) => {
                      const progress = batch.processed_quantity 
                        ? (batch.processed_quantity / batch.raw_material_quantity) * 100 
                        : 0;
                      
                      return (
                        <div key={batch.id} className="border border-border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-foreground">Batch #{batch.batch_number}</h3>
                                <Badge className={getStatusColor(batch.status)}>
                                  {batch.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Started: {new Date(batch.processing_date).toLocaleDateString()}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                            <div>
                              <span className="font-medium text-foreground">Raw Material:</span>{' '}
                              <span className="text-muted-foreground">{batch.raw_material_quantity} MT</span>
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Processed:</span>{' '}
                              <span className="text-muted-foreground">{batch.processed_quantity || 0} MT</span>
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Quality Grade:</span>{' '}
                              <span className="text-muted-foreground">{batch.quality_grade || 'Pending'}</span>
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Progress:</span>{' '}
                              <span className="text-muted-foreground">{progress.toFixed(1)}%</span>
                            </div>
                          </div>
                          
                          <Progress value={progress} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Quality Control & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Quality Management System</h3>
                  <p className="text-muted-foreground mb-4">Track quality parameters, certifications, and compliance standards.</p>
                  <Button className="bg-primary text-primary-foreground">Setup Quality Control</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}