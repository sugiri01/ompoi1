import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, MapPin, Star, Shield, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const marketplaceData = {
  listings: [
    {
      id: 1,
      seller: "Vietnam Cashew Corp",
      rating: 4.8,
      verified: true,
      product: "W240 Cashew Kernels",
      grade: "W240",
      quantity: "50 MT",
      price: 9.80,
      location: "Ho Chi Minh City, Vietnam",
      certification: ["ISO 22000", "HACCP"],
      description: "Premium quality W240 cashew kernels from direct factory processing. Available for immediate shipment.",
      postedTime: "2 hours ago",
      minOrder: "5 MT"
    },
    {
      id: 2,
      seller: "Ivory Gold Trading",
      rating: 4.6,
      verified: true,
      product: "Raw Cashew Nuts",
      grade: "RCN",
      quantity: "200 MT",
      price: 2.15,
      location: "Abidjan, Ivory Coast",
      certification: ["Organic", "Fair Trade"],
      description: "Fresh crop raw cashew nuts from certified organic farms. Excellent quality with low moisture content.",
      postedTime: "4 hours ago",
      minOrder: "20 MT"
    },
    {
      id: 3,
      seller: "Kerala Nuts Ltd",
      rating: 4.9,
      verified: true,
      product: "W320 Cashew Kernels",
      grade: "W320",
      quantity: "100 MT",
      price: 8.95,
      location: "Kollam, Kerala, India",
      certification: ["BRC", "FDA"],
      description: "High-grade W320 cashew kernels processed using latest technology. Ready for export packaging.",
      postedTime: "6 hours ago",
      minOrder: "10 MT"
    },
    {
      id: 4,
      seller: "Golden Cashew Co",
      rating: 4.7,
      verified: false,
      product: "CNSL (Technical Grade)",
      grade: "CNSL",
      quantity: "25 MT",
      price: 0.85,
      location: "Mangalore, Karnataka, India",
      certification: ["ISO 9001"],
      description: "Industrial grade cashew nut shell liquid for resin and coating applications.",
      postedTime: "1 day ago",
      minOrder: "1 MT"
    },
    {
      id: 5,
      seller: "Ghana Premium Nuts",
      rating: 4.5,
      verified: true,
      product: "W450 Cashew Kernels",
      grade: "W450",
      quantity: "75 MT",
      price: 7.45,
      location: "Tema, Ghana",
      certification: ["Global GAP", "Rainforest Alliance"],
      description: "Sustainably sourced W450 cashew kernels with full traceability documentation.",
      postedTime: "1 day ago",
      minOrder: "15 MT"
    }
  ]
};

const ListingCard = ({ listing }: { listing: any }) => (
  <Card className="hover:shadow-medium transition-all cursor-pointer">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{listing.seller.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{listing.seller}</h3>
              {listing.verified && <Shield className="h-4 w-4 text-success" />}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{listing.rating}</span>
              <span className="text-muted-foreground">• {listing.postedTime}</span>
            </div>
          </div>
        </div>
        <Badge variant="secondary">{listing.grade}</Badge>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-lg font-medium">{listing.product}</h4>
          <p className="text-sm text-muted-foreground">{listing.description}</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{listing.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Min Order: {listing.minOrder}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {listing.certification.map((cert: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {cert}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div>
            <span className="text-2xl font-bold">${listing.price}</span>
            <span className="text-muted-foreground ml-1">/kg</span>
            <div className="text-sm text-muted-foreground">Quantity: {listing.quantity}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/product/${listing.id}`}>View Details</Link>
            </Button>
            <Button size="sm">Request Quote</Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredListings = marketplaceData.listings.filter(listing => {
    const matchesSearch = listing.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || 
                      (activeTab === "kernels" && listing.grade.startsWith("W")) ||
                      (activeTab === "raw" && listing.grade === "RCN") ||
                      (activeTab === "byproducts" && listing.grade === "CNSL");
    return matchesSearch && matchesTab;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">Connect with verified cashew traders globally</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post Listing
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products or sellers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Product Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="kernels">Cashew Kernels</TabsTrigger>
            <TabsTrigger value="raw">Raw Cashew Nuts</TabsTrigger>
            <TabsTrigger value="byproducts">By-products</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredListings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No listings found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Load More */}
        {filteredListings.length > 0 && (
          <div className="flex justify-center">
            <Button variant="outline">Load More Listings</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Marketplace;