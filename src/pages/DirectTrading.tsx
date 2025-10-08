import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageCircle, 
  Handshake, 
  MapPin,
  Clock,
  Star,
  Search,
  Filter,
  ArrowRight,
  Phone,
  Mail,
  Building,
  Truck
} from "lucide-react";

interface BuyerRequest {
  id: string;
  buyerName: string;
  company: string;
  product: string;
  quantity: number;
  targetPrice: number;
  location: string;
  deadline: string;
  requirements: string[];
  postedTime: string;
  verified: boolean;
  rating: number;
  image: string;
}

interface DirectConnection {
  id: string;
  name: string;
  type: "buyer" | "seller";
  company: string;
  location: string;
  rating: number;
  verified: boolean;
  lastActive: string;
  specialization: string[];
  contactInfo: {
    phone: string;
    email: string;
  };
}

const mockBuyerRequests: BuyerRequest[] = [
  {
    id: "1",
    buyerName: "Rajesh Kumar",
    company: "Kerala Spice Traders",
    product: "Raw Cashew Nuts",
    quantity: 10000,
    targetPrice: 82000,
    location: "Kochi, Kerala",
    deadline: "2024-02-15",
    requirements: ["Organic Certified", "Grade A", "Moisture < 5%"],
    postedTime: "2 hours ago",
    verified: true,
    rating: 4.7,
    image: "🥜"
  },
  {
    id: "2",
    buyerName: "Priya Sharma",
    company: "Mumbai Food Processing",
    product: "Cashew Kernels W240",
    quantity: 2500,
    targetPrice: 950000,
    location: "Mumbai, Maharashtra",
    deadline: "2024-02-20",
    requirements: ["HACCP Certified", "Export Quality", "White Wholes"],
    postedTime: "4 hours ago",
    verified: true,
    rating: 4.9,
    image: "🥜"
  },
  {
    id: "3",
    buyerName: "Ahmed Hassan",
    company: "Gulf Trading Co.",
    product: "CNSL Oil",
    quantity: 5000,
    targetPrice: 85000,
    location: "Dubai, UAE",
    deadline: "2024-02-25",
    requirements: ["Industrial Grade", "Bulk Packaging", "FOB Pricing"],
    postedTime: "6 hours ago",
    verified: false,
    rating: 4.2,
    image: "🛢️"
  }
];

const mockConnections: DirectConnection[] = [
  {
    id: "1",
    name: "Arjun Patel",
    type: "buyer",
    company: "Gujarat Agro Industries",
    location: "Ahmedabad, Gujarat",
    rating: 4.8,
    verified: true,
    lastActive: "Online",
    specialization: ["Raw Materials", "Bulk Orders", "Export"],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "arjun@gujaratagro.com"
    }
  },
  {
    id: "2",
    name: "Meera Krishnan",
    type: "seller",
    company: "Tamil Nadu Cashew Co-op",
    location: "Tuticorin, Tamil Nadu",
    rating: 4.6,
    verified: true,
    lastActive: "2 minutes ago",
    specialization: ["Organic Cashews", "Quality Processing", "Direct Farm"],
    contactInfo: {
      phone: "+91 97654 32109",
      email: "meera@tncashew.coop"
    }
  },
  {
    id: "3",
    name: "Vikram Singh",
    type: "buyer",
    company: "Delhi Premium Foods",
    location: "New Delhi, Delhi",
    rating: 4.5,
    verified: true,
    lastActive: "15 minutes ago",
    specialization: ["Premium Products", "Retail Distribution", "Fast Payment"],
    contactInfo: {
      phone: "+91 96543 21098",
      email: "vikram@delhipremium.com"
    }
  }
];

export default function DirectTrading() {
  const [activeTab, setActiveTab] = useState("requests");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Direct-to-Buyer Channels</h1>
            <p className="text-muted-foreground">Connect directly with buyers and sellers without intermediaries</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              My Messages
            </Button>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Post Requirement
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Requests</p>
                  <p className="text-2xl font-bold">247</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Direct Connections</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Handshake className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Successful Deals</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Star className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Response</p>
                  <p className="text-2xl font-bold">2.4h</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">Buyer Requests</TabsTrigger>
            <TabsTrigger value="connections">My Connections</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search buyer requests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Buyer Requests */}
            <div className="space-y-4">
              {mockBuyerRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-medium transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{request.image}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{request.buyerName}</h3>
                            {request.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{request.company}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{request.rating}</span>
                            </div>
                            <span className="text-muted-foreground text-sm">•</span>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {request.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">
                          ₹{request.targetPrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Target Price</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Product</p>
                        <p className="font-medium">{request.product}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{request.quantity.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Deadline</p>
                        <p className="font-medium">{request.deadline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Posted</p>
                        <p className="font-medium">{request.postedTime}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Requirements</p>
                      <div className="flex flex-wrap gap-2">
                        {request.requirements.map((req, index) => (
                          <Badge key={index} variant="outline">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button size="sm">
                        Submit Proposal
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockConnections.map((connection) => (
                <Card key={connection.id} className="hover:shadow-medium transition-smooth">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {connection.name}
                          {connection.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{connection.company}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={connection.type === "buyer" ? "default" : "secondary"}>
                            {connection.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{connection.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          connection.lastActive === "Online" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}>
                          {connection.lastActive}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{connection.location}</span>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Specialization</p>
                        <div className="flex flex-wrap gap-1">
                          {connection.specialization.map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{connection.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{connection.contactInfo.email}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Expand Your Network</CardTitle>
                <CardDescription>
                  Discover and connect with new buyers and sellers in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Building className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Network Discovery Coming Soon</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We're building advanced matching algorithms to help you find the perfect trading partners based on location, product preferences, and trading history.
                  </p>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Join Waitlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}