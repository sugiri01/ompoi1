import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Package, 
  TrendingUp,
  Users,
  Award,
  MessageCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Listing {
  id: string;
  title: string;
  price_per_unit: number;
  unit: string;
  available_quantity: number;
  minimum_order: number;
  description: string;
  images: string[];
  certifications: string[];
  quality_grade: string;
  location: any;
  created_at: string;
  seller_id: string;
}

interface FilterState {
  searchQuery: string;
  productType: string;
  priceRange: number[];
  qualityGrade: string;
  certification: string;
  location: string;
  sortBy: string;
}

export function EnhancedMarketplace() {
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    productType: "all",
    priceRange: [0, 10000],
    qualityGrade: "all",
    certification: "all",
    location: "all",
    sortBy: "newest"
  });

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [listings, filters]);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setListings(data || []);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch listings",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...listings];

    // Search query
    if (filters.searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        listing.description?.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Price range
    filtered = filtered.filter(listing =>
      listing.price_per_unit >= filters.priceRange[0] &&
      listing.price_per_unit <= filters.priceRange[1]
    );

    // Quality grade
    if (filters.qualityGrade !== "all") {
      filtered = filtered.filter(listing =>
        listing.quality_grade === filters.qualityGrade
      );
    }

    // Certification
    if (filters.certification !== "all") {
      filtered = filtered.filter(listing =>
        listing.certifications?.includes(filters.certification)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.price_per_unit - b.price_per_unit);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price_per_unit - a.price_per_unit);
        break;
      case "quantity":
        filtered.sort((a, b) => b.available_quantity - a.available_quantity);
        break;
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    setFilteredListings(filtered);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      productType: "all",
      priceRange: [0, 10000],
      qualityGrade: "all",
      certification: "all",
      location: "all",
      sortBy: "newest"
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-pulse text-muted-foreground">Loading marketplace...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Search and Filters */}
      <Card className="bg-gradient-card border-0 shadow-medium">
        <CardContent className="p-6">
          <div className="grid gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products, grades, certifications..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Select
                value={filters.productType}
                onValueChange={(value) => handleFilterChange("productType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Product Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="cashew">Cashew</SelectItem>
                  <SelectItem value="spices">Spices</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.qualityGrade}
                onValueChange={(value) => handleFilterChange("qualityGrade", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Quality Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="W180">W180 Premium</SelectItem>
                  <SelectItem value="W210">W210 Standard</SelectItem>
                  <SelectItem value="W240">W240 Medium</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.certification}
                onValueChange={(value) => handleFilterChange("certification", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Certification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Certifications</SelectItem>
                  <SelectItem value="Organic">Organic</SelectItem>
                  <SelectItem value="Fair Trade">Fair Trade</SelectItem>
                  <SelectItem value="ISO 22000">ISO 22000</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.location}
                onValueChange={(value) => handleFilterChange("location", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="kerala">Kerala</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="goa">Goa</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange("sortBy", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="quantity">Highest Quantity</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={resetFilters}>
                <Filter className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]} per kg
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange("priceRange", value)}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {filteredListings.length} Listings Found
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing results for agricultural commodities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Request Quote
          </Button>
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Compare Sellers
          </Button>
        </div>
      </div>

      {/* Enhanced Listings Grid */}
      {filteredListings.length === 0 ? (
        <Card className="bg-gradient-card border-0 shadow-medium">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms to find more results.
            </p>
            <Button onClick={resetFilters} className="bg-primary text-primary-foreground">
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="bg-gradient-card border-0 shadow-medium hover:shadow-large transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-foreground line-clamp-2">
                      {listing.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {listing.quality_grade || 'Standard'}
                      </Badge>
                      {listing.certifications?.slice(0, 2).map((cert, index) => (
                        <Badge key={index} className="bg-success/10 text-success text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Price and Quantity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Price per {listing.unit}</p>
                    <p className="text-2xl font-bold text-foreground">
                      ₹{listing.price_per_unit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-lg font-semibold text-foreground">
                      {listing.available_quantity} {listing.unit}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {listing.description}
                </p>

                {/* Location and Date */}
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{listing.location?.address || 'Location not specified'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(listing.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Minimum Order */}
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Min. Order:</span> {listing.minimum_order} {listing.unit}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-primary text-primary-foreground">
                    <Package className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredListings.length > 0 && filteredListings.length >= 12 && (
        <div className="text-center">
          <Button variant="outline" className="bg-background">
            Load More Listings
          </Button>
        </div>
      )}
    </div>
  );
}