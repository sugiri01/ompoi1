import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Phone,
  MessageCircle,
  Navigation,
  Calendar,
  DollarSign,
  Shield,
  ChevronLeft,
  Download,
  Camera,
  FileText,
  Star
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("timeline");

  const mockOrderData = {
    id: "ORD-2024-001",
    orderNumber: "ORD-2024-001",
    product: "Premium Raw Cashew Nuts",
    quantity: 10,
    unit: "MT",
    buyer: "ABC Traders Ltd",
    seller: "Malabar Cashew Co.",
    totalAmount: 850000,
    status: "in_transit",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-20T16:00:00Z",
    
    shipping: {
      carrier: "Blue Dart Express",
      trackingNumber: "BD12345678901",
      vehicleNumber: "KL-07-BC-1234",
      driverName: "Ravi Kumar",
      driverPhone: "+91-9876543210",
      currentLocation: {
        latitude: 10.8505,
        longitude: 76.2711,
        address: "NH-47, Thrissur, Kerala",
        lastUpdated: "2024-01-18T14:30:00Z"
      },
      route: [
        { name: "Kochi, Kerala", status: "completed", timestamp: "2024-01-16T08:00:00Z" },
        { name: "Thrissur, Kerala", status: "completed", timestamp: "2024-01-17T12:00:00Z" },
        { name: "Coimbatore, Tamil Nadu", status: "in_progress", timestamp: null },
        { name: "Bangalore, Karnataka", status: "pending", timestamp: null },
        { name: "Mumbai, Maharashtra", status: "pending", timestamp: null }
      ]
    },
    
    timeline: [
      {
        step: "order_placed",
        title: "Order Placed",
        description: "Order confirmed and payment terms agreed",
        status: "completed",
        timestamp: "2024-01-15T10:30:00Z",
        details: "Order placed successfully with advance payment of ₹2,55,000"
      },
      {
        step: "payment_processed",
        title: "Payment Processed",
        description: "Payment verified and processing initiated",
        status: "completed",
        timestamp: "2024-01-15T14:20:00Z",
        details: "Advance payment processed through NEFT"
      },
      {
        step: "quality_passed",
        title: "Quality Check Passed",
        description: "Quality verification completed successfully",
        status: "completed",
        timestamp: "2024-01-16T16:45:00Z",
        details: "All quality parameters met. Certificate generated."
      },
      {
        step: "shipment_prepared",
        title: "Shipment Prepared",
        description: "Order packed and ready for dispatch",
        status: "completed",
        timestamp: "2024-01-17T09:15:00Z",
        details: "10 MT packed in 400 bags of 25kg each"
      },
      {
        step: "dispatched",
        title: "Dispatched",
        description: "Shipment dispatched from seller location",
        status: "completed",
        timestamp: "2024-01-17T14:00:00Z",
        details: "Dispatched via Blue Dart Express - Tracking: BD12345678901"
      },
      {
        step: "in_transit",
        title: "In Transit",
        description: "Shipment is on the way to destination",
        status: "in_progress", 
        timestamp: "2024-01-17T14:30:00Z",
        details: "Currently at Thrissur, Kerala. Next stop: Coimbatore, Tamil Nadu"
      },
      {
        step: "out_for_delivery",
        title: "Out for Delivery",
        description: "Shipment reached destination city and out for delivery",
        status: "pending",
        timestamp: null,
        details: "Will be updated once shipment reaches Mumbai"
      },
      {
        step: "delivered",
        title: "Delivered",
        description: "Order delivered successfully",
        status: "pending",
        timestamp: null,
        details: "Final delivery confirmation pending"
      }
    ],
    
    priceLock: {
      lockedPrice: 85000,
      lockedAt: "2024-01-15T10:30:00Z",
      currentMarketPrice: 86500,
      savings: 1500,
      validUntil: "2024-01-20T23:59:59Z"
    },
    
    documents: [
      { name: "Quality Certificate", available: true, type: "pdf" },
      { name: "Invoice", available: true, type: "pdf" },
      { name: "Shipping Documents", available: true, type: "pdf" },
      { name: "Delivery Receipt", available: false, type: "pdf" }
    ],
    
    payments: [
      {
        type: "advance",
        amount: 255000,
        status: "completed",
        date: "2024-01-15T14:20:00Z",
        method: "NEFT",
        reference: "TXN123456789"
      },
      {
        type: "balance",
        amount: 595000,
        status: "pending",
        dueDate: "2024-01-22T23:59:59Z",
        method: "Bank Transfer",
        reference: null
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
      case "completed": return "bg-success text-white";
      case "in_progress": return "bg-warning text-white";
      case "pending": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCurrentProgress = () => {
    const completedSteps = order?.timeline.filter(step => step.status === "completed").length || 0;
    const totalSteps = order?.timeline.length || 1;
    return Math.round((completedSteps / totalSteps) * 100);
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
          <span className="text-foreground">Order Tracking</span>
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
                    variant={order.status === "in_transit" ? "default" : "secondary"}
                    className="text-sm px-3 py-1"
                  >
                    {order.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <div className="font-semibold text-foreground">{order.quantity} {order.unit}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Seller</span>
                    <div className="font-semibold text-foreground">{order.seller}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Carrier</span>
                    <div className="font-semibold text-foreground">{order.shipping.carrier}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Total Value</span>
                    <div className="font-semibold text-foreground">₹{order.totalAmount.toLocaleString()}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Delivery Progress</span>
                    <span className="text-sm text-muted-foreground">{getCurrentProgress()}%</span>
                  </div>
                  <Progress value={getCurrentProgress()} className="h-3" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Expected Delivery:</span>
                    <span className="font-medium text-foreground">
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Current Location:</span>
                    <span className="font-medium text-foreground">
                      {order.shipping.currentLocation.address.split(',')[0]}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Driver & Vehicle Info */}
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Driver</span>
                <div className="font-semibold text-foreground">{order.shipping.driverName}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Vehicle</span>
                <div className="font-semibold text-foreground">{order.shipping.vehicleNumber}</div>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Tracking ID</span>
                <div className="font-semibold text-foreground">{order.shipping.trackingNumber}</div>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <div className="font-semibold text-foreground">
                  {new Date(order.shipping.currentLocation.lastUpdated).toLocaleString()}
                </div>
              </div>

              <Button className="w-full">
                <Navigation className="h-4 w-4 mr-2" />
                Live Tracking
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Price Lock Information */}
        <Card className="bg-gradient-card border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Price Lock Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">₹{order.priceLock.lockedPrice.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Locked Price/MT</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">₹{order.priceLock.currentMarketPrice.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Current Market Price/MT</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">₹{(order.priceLock.savings * order.quantity).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {Math.ceil((new Date(order.priceLock.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-muted-foreground">Days Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tracking Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">Shipment Timeline</TabsTrigger>
            <TabsTrigger value="route">Route & Map</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Detailed Timeline</CardTitle>
                <CardDescription>Complete journey of your order from placement to delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                  <div className="space-y-8">
                    {order.timeline.map((step, index) => (
                      <div key={step.step} className="relative flex items-start space-x-4">
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStatusColor(step.status)}`}>
                          {step.status === "completed" ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : step.status === "in_progress" ? (
                            <Clock className="h-6 w-6" />
                          ) : (
                            <AlertCircle className="h-6 w-6" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 pb-8">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                            {step.timestamp && (
                              <span className="text-sm text-muted-foreground">
                                {new Date(step.timestamp).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">{step.description}</p>
                          <p className="text-sm text-muted-foreground">{step.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="route" className="space-y-4">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Shipping Route</CardTitle>
                <CardDescription>Track the journey from origin to destination</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Route Progress */}
                <div className="space-y-4 mb-6">
                  {order.shipping.route.map((location, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full border-2 ${getStatusColor(location.status)}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{location.name}</span>
                          {location.timestamp && (
                            <span className="text-sm text-muted-foreground">
                              {new Date(location.timestamp).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="bg-primary-soft/20 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground mb-4">Real-time location tracking would be displayed here</p>
                    <Button variant="outline">
                      <Navigation className="h-4 w-4 mr-2" />
                      Open in Maps
                    </Button>
                  </div>
                </div>

                {/* Current Location Info */}
                <div className="mt-6 p-4 bg-primary-soft/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Current Location</span>
                  </div>
                  <p className="text-muted-foreground">{order.shipping.currentLocation.address}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Last updated: {new Date(order.shipping.currentLocation.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Order Documents</CardTitle>
                <CardDescription>Download and view all order-related documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {order.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium text-foreground">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{doc.type.toUpperCase()} Document</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.available ? (
                          <Badge variant="default">Available</Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={!doc.available}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upload Additional Documents */}
                <div className="mt-6 p-4 border-2 border-dashed border-border rounded-lg text-center">
                  <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload delivery receipts or additional documents
                  </p>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Payment Schedule</CardTitle>
                <CardDescription>Track all payments related to this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.payments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium text-foreground capitalize">
                            {payment.type} Payment
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {payment.method} • {payment.reference || "Reference pending"}
                          </p>
                          {payment.dueDate && (
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(payment.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-foreground">
                          ₹{payment.amount.toLocaleString()}
                        </div>
                        <Badge 
                          variant={payment.status === "completed" ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {payment.status.toUpperCase()}
                        </Badge>
                        {payment.date && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(payment.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Summary */}
                <div className="mt-6 p-4 bg-primary-soft/30 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-success">
                        ₹{order.payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Amount Paid</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-warning">
                        ₹{order.payments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Amount Due</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default OrderTracking;