import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Upload, 
  FileText, 
  Camera,
  Shield,
  User,
  MapPin,
  Calendar,
  TrendingUp,
  ChevronLeft,
  Download,
  MessageCircle,
  Star
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const QualityVerification = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const mockOrderData = {
    id: "ORD-2024-001",
    orderNumber: "ORD-2024-001",
    product: "Premium Raw Cashew Nuts",
    quantity: 10,
    unit: "MT",
    buyer: "ABC Traders Ltd",
    seller: "Malabar Cashew Co.",
    totalAmount: 850000,
    qualityTestType: "advanced",
    status: "quality_testing",
    createdAt: "2024-01-15T10:30:00Z",
    
    timeline: [
      {
        step: "placed",
        title: "Order Placed",
        description: "Order confirmed and payment terms agreed",
        status: "completed",
        timestamp: "2024-01-15T10:30:00Z",
        icon: CheckCircle
      },
      {
        step: "payment",
        title: "Payment Processed",
        description: "Advance payment received and verified",
        status: "completed", 
        timestamp: "2024-01-15T14:20:00Z",
        icon: CheckCircle
      },
      {
        step: "quality",
        title: "Quality Verification",
        description: "Sample collection and testing in progress",
        status: "in_progress",
        timestamp: "2024-01-16T09:00:00Z",
        icon: Clock
      },
      {
        step: "shipment",
        title: "Shipment Preparation",
        description: "Packaging and shipping arrangements",
        status: "pending",
        timestamp: null,
        icon: AlertCircle
      },
      {
        step: "delivery",
        title: "Delivery & Completion",
        description: "Final delivery and order completion",
        status: "pending",
        timestamp: null,
        icon: AlertCircle
      }
    ],
    
    qualityTest: {
      id: "QT-2024-001", 
      type: "advanced",
      inspector: {
        name: "Dr. Rajesh Kumar",
        qualification: "PhD in Food Science",
        experience: "15 years",
        rating: 4.9,
        certifications: ["NABL Certified", "ISO 17025"],
        profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100"
      },
      scheduledAt: "2024-01-16T09:00:00Z",
      location: "Inspection Center, Kochi",
      status: "in_progress",
      progress: 65,
      estimatedCompletion: "2024-01-17T16:00:00Z",
      
      parameters: [
        { name: "Moisture Content", target: "≤ 8%", actual: "7.2%", status: "pass" },
        { name: "Foreign Matter", target: "≤ 1%", actual: "0.6%", status: "pass" },
        { name: "Defective Nuts", target: "≤ 5%", actual: "3.8%", status: "pass" },
        { name: "Kernel Out-turn", target: "≥ 22%", actual: "24.1%", status: "pass" },
        { name: "Size Grading", target: "W240/W320", actual: "Testing", status: "pending" },
        { name: "Aflatoxin", target: "≤ 10 ppb", actual: "Testing", status: "pending" }
      ],
      
      images: [
        { id: 1, url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=300", caption: "Sample Collection" },
        { id: 2, url: "https://images.unsplash.com/photo-1582103820405-4e8e1f986a66?w=300", caption: "Visual Inspection" },
        { id: 3, url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300", caption: "Laboratory Testing" }
      ],
      
      report: {
        preliminaryAvailable: true,
        finalAvailable: false,
        certificateAvailable: false
      }
    },
    
    upgradeOptions: [
      {
        type: "premium_lab",
        name: "Premium Lab Testing",
        description: "Comprehensive laboratory analysis with detailed microbiological testing",
        additionalCost: 2500,
        additionalTime: "2-3 days",
        features: [
          "Microbiological analysis",
          "Heavy metals testing", 
          "Pesticide residue analysis",
          "Nutritional profiling",
          "NABL certified report"
        ]
      }
    ]
  };

  useEffect(() => {
    // In a real app, fetch order data based on ID
    setOrder(mockOrderData);
    setLoading(false);
  }, [orderId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-success";
      case "in_progress": return "bg-warning";
      case "pending": return "bg-muted";
      case "pass": return "text-success";
      case "fail": return "text-destructive";
      default: return "bg-muted";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "in_progress": return Clock;
      case "pending": return AlertCircle;
      default: return AlertCircle;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Order Not Found</h2>
          <Button asChild>
            <Link to="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/marketplace" className="hover:text-foreground flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Orders
          </Link>
          <span>/</span>
          <span className="text-foreground">Quality Verification</span>
        </div>

        {/* Order Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{order.product}</CardTitle>
                    <CardDescription className="text-lg">
                      Order #{order.orderNumber}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={order.status === "quality_testing" ? "default" : "secondary"}
                    className="text-sm px-3 py-1"
                  >
                    {order.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <div className="font-semibold text-foreground">{order.quantity} {order.unit}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Seller</span>
                    <div className="font-semibold text-foreground">{order.seller}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Test Type</span>
                    <div className="font-semibold text-foreground capitalize">{order.qualityTestType}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Total Value</span>
                    <div className="font-semibold text-foreground">₹{order.totalAmount.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg">Quality Inspector</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={order.qualityTest.inspector.profileImage}
                  alt={order.qualityTest.inspector.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{order.qualityTest.inspector.name}</div>
                  <div className="text-sm text-muted-foreground">{order.qualityTest.inspector.qualification}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{order.qualityTest.inspector.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium text-foreground">{order.qualityTest.inspector.experience}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{order.qualityTest.location}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {order.qualityTest.inspector.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Inspector
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Order Timeline */}
        <Card className="bg-gradient-card border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Order Progress</CardTitle>
            <CardDescription>Track your order through each stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
              <div className="space-y-6">
                {order.timeline.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="relative flex items-start space-x-4">
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                        step.status === "completed" ? "bg-success border-success" :
                        step.status === "in_progress" ? "bg-warning border-warning" :
                        "bg-background border-border"
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          step.status === "completed" ? "text-white" :
                          step.status === "in_progress" ? "text-white" :
                          "text-muted-foreground"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0 pb-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground">{step.title}</h3>
                          {step.timestamp && (
                            <span className="text-sm text-muted-foreground">
                              {new Date(step.timestamp).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        {step.status === "in_progress" && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="font-medium text-foreground">Progress</span>
                              <span className="text-muted-foreground">{order.qualityTest.progress}%</span>
                            </div>
                            <Progress value={order.qualityTest.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Testing Details */}
        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="parameters">Test Parameters</TabsTrigger>
            <TabsTrigger value="images">Inspection Images</TabsTrigger>
            <TabsTrigger value="reports">Reports & Certificates</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrade Options</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-4">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Quality Parameters</CardTitle>
                <CardDescription>Real-time testing results and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.qualityTest.parameters.map((param, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground">{param.name}</h4>
                          <Badge 
                            variant={param.status === "pass" ? "default" : param.status === "fail" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {param.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Target: </span>
                            <span className="font-medium text-foreground">{param.target}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Actual: </span>
                            <span className={`font-medium ${getStatusColor(param.status)}`}>
                              {param.actual}
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

          <TabsContent value="images" className="space-y-4">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Inspection Images</CardTitle>
                <CardDescription>Visual documentation of the quality testing process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {order.qualityTest.images.map((image) => (
                    <div key={image.id} className="space-y-2">
                      <div className="aspect-square bg-gradient-card rounded-lg overflow-hidden">
                        <img 
                          src={image.url} 
                          alt={image.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">{image.caption}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 border-2 border-dashed border-border rounded-lg text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload additional images or documents
                  </p>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Reports & Certificates</CardTitle>
                <CardDescription>Download available quality reports and certificates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Preliminary Test Report</h4>
                        <p className="text-sm text-muted-foreground">Initial quality assessment results</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {order.qualityTest.report.preliminaryAvailable ? (
                        <Badge variant="default">Available</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={!order.qualityTest.report.preliminaryAvailable}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Final Test Report</h4>
                        <p className="text-sm text-muted-foreground">Complete quality analysis with all parameters</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {order.qualityTest.report.finalAvailable ? (
                        <Badge variant="default">Available</Badge>
                      ) : (
                        <Badge variant="secondary">In Progress</Badge>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={!order.qualityTest.report.finalAvailable}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Quality Certificate</h4>
                        <p className="text-sm text-muted-foreground">Official quality compliance certificate</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {order.qualityTest.report.certificateAvailable ? (
                        <Badge variant="default">Available</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={!order.qualityTest.report.certificateAvailable}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary-soft/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Estimated Completion</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Final report and certificate will be available by {
                      new Date(order.qualityTest.estimatedCompletion).toLocaleDateString()
                    } at {new Date(order.qualityTest.estimatedCompletion).toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upgrade" className="space-y-4">
            {order.upgradeOptions.map((upgrade, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-medium">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{upgrade.name}</CardTitle>
                      <CardDescription>{upgrade.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">+₹{upgrade.additionalCost.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Additional cost</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Additional Features</h4>
                      <ul className="space-y-2">
                        {upgrade.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Additional Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Additional Time:</span>
                          <span className="font-medium text-foreground">{upgrade.additionalTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Certification:</span>
                          <span className="font-medium text-foreground">NABL Certified</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Report Format:</span>
                          <span className="font-medium text-foreground">Digital + Physical</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Upgrade Testing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default QualityVerification;