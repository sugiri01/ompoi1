import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  MapPin, 
  Truck, 
  Shield, 
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from "lucide-react";

interface Seller {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
  unit: string;
  quantity: number;
  certifications: string[];
  deliveryTime: string;
  paymentTerms: string;
  qualityGrade: string;
  verified: boolean;
  responseTime: string;
  productImage: string;
}

const mockSellers: Seller[] = [
  {
    id: "1",
    name: "Kerala Cashew Farmers Cooperative",
    rating: 4.8,
    reviews: 247,
    location: "Kollam, Kerala",
    price: 850,
    unit: "per kg",
    quantity: 5000,
    certifications: ["Organic", "Fair Trade", "HACCP"],
    deliveryTime: "3-5 days",
    paymentTerms: "30 days credit",
    qualityGrade: "Grade A",
    verified: true,
    responseTime: "< 2 hours",
    productImage: "🥜"
  },
  {
    id: "2", 
    name: "Tamil Nadu Agri Exports",
    rating: 4.5,
    reviews: 189,
    location: "Tuticorin, Tamil Nadu",
    price: 825,
    unit: "per kg",
    quantity: 3500,
    certifications: ["ISO 9001", "FSSAI"],
    deliveryTime: "2-4 days",
    paymentTerms: "Advance payment",
    qualityGrade: "Grade A",
    verified: true,
    responseTime: "< 4 hours",
    productImage: "🥜"
  },
  {
    id: "3",
    name: "Goa Premium Nuts",
    rating: 4.6,
    reviews: 156,
    location: "Panaji, Goa",
    price: 875,
    unit: "per kg",
    quantity: 2000,
    certifications: ["Organic", "HACCP"],
    deliveryTime: "4-6 days",
    paymentTerms: "50% advance",
    qualityGrade: "Premium",
    verified: false,
    responseTime: "< 6 hours",
    productImage: "🥜"
  }
];

export default function SellerComparison() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");

  const toggleSellerSelection = (sellerId: string) => {
    setSelectedSellers(prev => {
      if (prev.includes(sellerId)) {
        return prev.filter(id => id !== sellerId);
      } else if (prev.length < 3) {
        return [...prev, sellerId];
      }
      return prev;
    });
  };

  const getComparisonData = () => {
    return mockSellers.filter(seller => selectedSellers.includes(seller.id));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Seller Comparison</h1>
            <p className="text-muted-foreground">Compare sellers side by side to find the best deal</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
                <SelectItem value="quantity">Highest Quantity</SelectItem>
                <SelectItem value="delivery">Fastest Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Selection Status */}
        {selectedSellers.length > 0 && (
          <Card className="bg-primary-soft border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-primary font-medium">
                  {selectedSellers.length} seller{selectedSellers.length > 1 ? 's' : ''} selected for comparison
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedSellers([])}
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Seller List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockSellers.map((seller) => {
            const isSelected = selectedSellers.includes(seller.id);
            return (
              <Card 
                key={seller.id}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-primary bg-primary-soft' 
                    : 'hover:shadow-medium'
                }`}
                onClick={() => toggleSellerSelection(seller.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{seller.productImage}</div>
                      <div>
                        <CardTitle className="text-lg">{seller.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{seller.rating}</span>
                          </div>
                          <span className="text-muted-foreground text-sm">
                            ({seller.reviews} reviews)
                          </span>
                          {seller.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        ₹{seller.price}
                      </div>
                      <div className="text-sm text-muted-foreground">{seller.unit}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{seller.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>Delivery: {seller.deliveryTime}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Response: {seller.responseTime}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {seller.certifications.slice(0, 2).map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                      {seller.certifications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{seller.certifications.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        {selectedSellers.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Criteria
                      </th>
                      {getComparisonData().map((seller) => (
                        <th key={seller.id} className="text-left py-3 px-4 font-medium">
                          {seller.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { 
                        label: "Price per kg", 
                        key: "price",
                        render: (seller: Seller) => `₹${seller.price}`
                      },
                      { 
                        label: "Available Quantity", 
                        key: "quantity",
                        render: (seller: Seller) => `${seller.quantity} kg`
                      },
                      { 
                        label: "Rating", 
                        key: "rating",
                        render: (seller: Seller) => (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {seller.rating} ({seller.reviews})
                          </div>
                        )
                      },
                      { 
                        label: "Quality Grade", 
                        key: "qualityGrade",
                        render: (seller: Seller) => seller.qualityGrade
                      },
                      { 
                        label: "Delivery Time", 
                        key: "deliveryTime",
                        render: (seller: Seller) => seller.deliveryTime
                      },
                      { 
                        label: "Payment Terms", 
                        key: "paymentTerms",
                        render: (seller: Seller) => seller.paymentTerms
                      },
                      { 
                        label: "Response Time", 
                        key: "responseTime",
                        render: (seller: Seller) => seller.responseTime
                      },
                      { 
                        label: "Verified", 
                        key: "verified",
                        render: (seller: Seller) => seller.verified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )
                      }
                    ].map((row) => (
                      <tr key={row.key} className="border-b">
                        <td className="py-3 px-4 font-medium text-muted-foreground">
                          {row.label}
                        </td>
                        {getComparisonData().map((seller) => (
                          <td key={seller.id} className="py-3 px-4">
                            {row.render(seller)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {getComparisonData().map((seller) => (
                  <Button key={seller.id} size="lg">
                    Contact {seller.name.split(' ')[0]}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}