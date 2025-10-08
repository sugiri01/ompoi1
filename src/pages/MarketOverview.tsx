import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Users,
  Package,
  Shield,
  Download,
  RefreshCw,
  BarChart3
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const MarketOverview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [certificationFilter, setCertificationFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSellers, setSelectedSellers] = useState([]);

  const mockSellers = [
    {
      id: "1",
      name: "Malabar Cashew Co.",
      location: "Kochi, Kerala",
      rating: 4.8,
      reviews: 124,
      products: ["Raw Cashew", "W240 Kernels", "W320 Kernels", "CNSL"],
      priceRange: "₹83,000 - ₹95,000",
      certifications: ["Organic", "FSSAI", "Export Quality"],
      totalOrders: 1250,
      responseTime: "2 hours",
      successRate: 98.5,
      establishedYear: 2015,
      minOrder: "1 MT",
      paymentTerms: "30 days credit",
      profileImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100"
    },
    {
      id: "2",
      name: "Kerala Nuts Trading", 
      location: "Kollam, Kerala",
      rating: 4.6,
      reviews: 89,
      products: ["Raw Cashew", "Cashew Kernels", "Byproducts"],
      priceRange: "₹82,500 - ₹94,000",
      certifications: ["FSSAI", "ISO 22000"],
      totalOrders: 890,
      responseTime: "4 hours",
      successRate: 97.2,
      establishedYear: 2018,
      minOrder: "2 MT",
      paymentTerms: "Advance payment",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    {
      id: "3",
      name: "Cashew Direct Ltd",
      location: "Mangalore, Karnataka",
      rating: 4.9,
      reviews: 156,
      products: ["Raw Cashew", "W240 Kernels", "W320 Kernels", "W450 Kernels", "CNSL"],
      priceRange: "₹81,800 - ₹96,500",
      certifications: ["Organic", "FSSAI", "Export Quality", "Rainforest Alliance"],
      totalOrders: 1580,
      responseTime: "1 hour",
      successRate: 99.1,
      establishedYear: 2012,
      minOrder: "5 MT",
      paymentTerms: "15 days credit",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    },
    {
      id: "4",
      name: "Tamil Nadu Agro Exports",
      location: "Chennai, Tamil Nadu", 
      rating: 4.4,
      reviews: 67,
      products: ["Raw Cashew", "Processed Kernels", "Byproducts"],
      priceRange: "₹84,000 - ₹92,000",
      certifications: ["FSSAI", "Export Quality"],
      totalOrders: 520,
      responseTime: "6 hours",
      successRate: 96.8,
      establishedYear: 2020,
      minOrder: "3 MT",
      paymentTerms: "Cash on delivery",
      profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100"
    },
    {
      id: "5",
      name: "Goa Cashew Processing",
      location: "Panaji, Goa",
      rating: 4.7,
      reviews: 98,
      products: ["W240 Kernels", "W320 Kernels", "Broken Kernels"],
      priceRange: "₹85,500 - ₹98,000",
      certifications: ["Organic", "FSSAI", "ISO 22000"],
      totalOrders: 780,
      responseTime: "3 hours",
      successRate: 97.9,
      establishedYear: 2016,
      minOrder: "1 MT",
      paymentTerms: "45 days credit",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
    }
  ];

  const [filteredSellers, setFilteredSellers] = useState(mockSellers);

  const categories = ["All", "Raw Cashew", "Cashew Kernels", "CNSL", "Byproducts"];
  const locations = ["All", "Kerala", "Karnataka", "Tamil Nadu", "Goa", "Maharashtra"];
  const certifications = ["Organic", "FSSAI", "Export Quality", "ISO 22000", "Rainforest Alliance"];

  useEffect(() => {
    let filtered = mockSellers.filter(seller => {
      const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           seller.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           seller.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || 
                             seller.products.some(p => p.toLowerCase().includes(selectedCategory.toLowerCase()));
      
      const matchesLocation = selectedLocation === "all" || 
                             seller.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      const matchesRating = ratingFilter === "all" || seller.rating >= parseFloat(ratingFilter);
      
      const matchesCertification = certificationFilter.length === 0 ||
                                  certificationFilter.some(cert => seller.certifications.includes(cert));
      
      return matchesSearch && matchesCategory && matchesLocation && matchesRating && matchesCertification;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "orders":
          return b.totalOrders - a.totalOrders;
        case "response":
          return parseInt(a.responseTime) - parseInt(b.responseTime);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredSellers(filtered);
  }, [searchQuery, selectedCategory, selectedLocation, ratingFilter, certificationFilter, sortBy]);

  const handleSellerSelect = (sellerId) => {
    setSelectedSellers(prev => 
      prev.includes(sellerId) 
        ? prev.filter(id => id !== sellerId)
        : [...prev, sellerId]
    );
  };

  const marketStats = {
    totalSellers: mockSellers.length,
    totalProducts: mockSellers.reduce((acc, seller) => acc + seller.products.length, 0),
    avgRating: (mockSellers.reduce((acc, seller) => acc + seller.rating, 0) / mockSellers.length).toFixed(1),
    totalOrders: mockSellers.reduce((acc, seller) => acc + seller.totalOrders, 0)
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Market Overview</h1>
            <p className="text-muted-foreground">
              Discover and compare sellers across agricultural commodity markets
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{marketStats.totalSellers}</div>
                  <div className="text-sm text-muted-foreground">Active Sellers</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{marketStats.totalProducts}</div>
                  <div className="text-sm text-muted-foreground">Product Types</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{marketStats.avgRating}</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{marketStats.totalOrders.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gradient-card border-0 shadow-medium">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sellers, locations, products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase().replace(" ", "")}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location.toLowerCase()}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Min Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="orders">Most Orders</SelectItem>
                  <SelectItem value="response">Fastest Response</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Certification Filters */}
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium text-foreground mb-3">Certifications</h4>
              <div className="flex flex-wrap gap-4">
                {certifications.map(cert => (
                  <div key={cert} className="flex items-center space-x-2">
                    <Checkbox
                      id={cert}
                      checked={certificationFilter.includes(cert)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCertificationFilter(prev => [...prev, cert]);
                        } else {
                          setCertificationFilter(prev => prev.filter(c => c !== cert));
                        }
                      }}
                    />
                    <label htmlFor={cert} className="text-sm text-muted-foreground cursor-pointer">
                      {cert}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {filteredSellers.length} Sellers Found
            </h2>
            <p className="text-sm text-muted-foreground">
              Showing results for your current filters
            </p>
          </div>
          
          {selectedSellers.length > 0 && (
            <Button>
              Compare Selected ({selectedSellers.length})
            </Button>
          )}
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSellers.map((seller) => (
            <Card key={seller.id} className="bg-gradient-card border-0 shadow-medium hover:shadow-large transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={seller.profileImage}
                      alt={seller.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{seller.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{seller.location}</span>
                        <span>•</span>
                        <span>Est. {seller.establishedYear}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedSellers.includes(seller.id)}
                      onCheckedChange={() => handleSellerSelect(seller.id)}
                    />
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="font-medium">{seller.rating}</span>
                        <span className="text-sm text-muted-foreground">({seller.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Price Range</span>
                    <div className="font-medium text-foreground">{seller.priceRange}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Min Order</span>
                    <div className="font-medium text-foreground">{seller.minOrder}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <div className="font-medium text-foreground">{seller.responseTime}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-muted-foreground mb-2 block">Products</span>
                  <div className="flex flex-wrap gap-2">
                    {seller.products.map((product, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-muted-foreground mb-2 block">Certifications</span>
                  <div className="flex flex-wrap gap-2">
                    {seller.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
                  <div>
                    <div className="font-medium text-foreground">{seller.totalOrders}</div>
                    <div className="text-muted-foreground">Orders</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{seller.successRate}%</div>
                    <div className="text-muted-foreground">Success Rate</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{seller.paymentTerms}</div>
                    <div className="text-muted-foreground">Payment</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                  <Button className="flex-1">
                    Contact Seller
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Sellers Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms to find more sellers.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedLocation("all");
                setRatingFilter("all");
                setCertificationFilter([]);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MarketOverview;