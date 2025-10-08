import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  MapPin, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  Package,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Heart,
  Share2,
  ChevronLeft
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/hooks/use-toast";

interface Seller {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  minOrder: number;
  price: number;
  deliveryTime: string;
  certifications: string[];
  paymentTerms: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  origin: string;
  harvestSeason: string;
  currentPrice: number;
  priceUnit: string;
  priceChange: number;
  specifications: Record<string, string>;
  description: string;
  images: string[];
  sellers: Seller[];
  priceHistory: Array<{ date: string; price: number }>;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState("1");
  const [selectedQuality, setSelectedQuality] = useState("basic");
  const [selectedSeller, setSelectedSeller] = useState("");

  const mockProductData = {
    id: "1",
    name: "Premium Raw Cashew Nuts",
    category: "Cashew",
    type: "Raw Cashew Nuts",
    origin: "Kerala, India",
    harvestSeason: "March - May 2024",
    currentPrice: 85000,
    priceUnit: "MT",
    priceChange: 2.5,
    specifications: {
      moisture: "Max 8%",
      foreignMatter: "Max 1%",
      defective: "Max 5%",
      grading: "W240, W320 mix"
    },
    description: "Premium quality raw cashew nuts sourced directly from certified organic farms in Kerala. Perfect for processing into high-grade cashew kernels.",
    images: [
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400",
      "https://images.unsplash.com/photo-1582103820405-4e8e1f986a66?w=400"
    ],
    sellers: [
      {
        id: "1",
        name: "Malabar Cashew Co.",
        rating: 4.8,
        reviews: 124,
        location: "Kochi, Kerala",
        minOrder: 1,
        price: 85000,
        deliveryTime: "3-5 days",
        certifications: ["Organic", "FSSAI", "Export Quality"],
        paymentTerms: "30 days credit"
      },
      {
        id: "2", 
        name: "Kerala Nuts Trading",
        rating: 4.6,
        reviews: 89,
        location: "Kollam, Kerala",
        minOrder: 2,
        price: 84500,
        deliveryTime: "4-6 days",
        certifications: ["FSSAI", "ISO 22000"],
        paymentTerms: "Advance payment"
      },
      {
        id: "3",
        name: "Cashew Direct Ltd",
        rating: 4.9,
        reviews: 156,
        location: "Mangalore, Karnataka", 
        minOrder: 5,
        price: 83800,
        deliveryTime: "2-4 days",
        certifications: ["Organic", "FSSAI", "Export Quality", "Rainforest Alliance"],
        paymentTerms: "15 days credit"
      }
    ],
    priceHistory: [
      { date: "Jan", price: 78000 },
      { date: "Feb", price: 80000 },
      { date: "Mar", price: 82000 },
      { date: "Apr", price: 83500 },
      { date: "May", price: 85000 }
    ]
  };

  useEffect(() => {
    // In a real app, fetch product data based on ID
    setProduct(mockProductData);
    setSelectedSeller(mockProductData.sellers[0].id);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-64 bg-muted rounded"></div>
          <div className="h-48 bg-muted rounded"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h2>
          <Button asChild>
            <Link to="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const selectedSellerData = product.sellers.find(s => s.id === selectedSeller);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/marketplace" className="hover:text-foreground flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-card rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gradient-card rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-smooth"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {product.origin}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {product.harvestSeason}
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    ₹{product.currentPrice.toLocaleString()}
                    <span className="text-lg font-normal text-muted-foreground">/{product.priceUnit}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {product.priceChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`text-sm ${product.priceChange > 0 ? 'text-success' : 'text-destructive'}`}>
                      {product.priceChange > 0 ? '+' : ''}{product.priceChange}% (24h)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Order Form */}
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg">Place Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Quantity (MT)
                    </label>
                    <Input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Quality Verification
                    </label>
                    <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (₹500)</SelectItem>
                        <SelectItem value="advanced">Advanced (₹1,500)</SelectItem>
                        <SelectItem value="lab">Lab Testing (₹3,000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Select Seller
                  </label>
                  <Select value={selectedSeller} onValueChange={setSelectedSeller}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sellers.map((seller: any) => (
                        <SelectItem key={seller.id} value={seller.id}>
                          {seller.name} - ₹{seller.price.toLocaleString()}/MT
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedSellerData && (
                  <div className="bg-primary-soft/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{selectedSellerData.name}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">{selectedSellerData.rating}</span>
                        <span className="text-sm text-muted-foreground">({selectedSellerData.reviews})</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Min Order:</span>
                        <span className="font-medium text-foreground ml-1">{selectedSellerData.minOrder} MT</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Delivery:</span>
                        <span className="font-medium text-foreground ml-1">{selectedSellerData.deliveryTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedSellerData.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">Total Amount</span>
                    <span className="text-xl font-bold text-foreground">
                      ₹{(parseFloat(quantity) * (selectedSellerData?.price || 0)).toLocaleString()}
                    </span>
                  </div>
                  <Button className="w-full" size="lg">
                    Place Order
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="sellers">Compare Sellers</TabsTrigger>
            <TabsTrigger value="history">Price History</TabsTrigger>
            <TabsTrigger value="related">Related Products</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="space-y-4">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sellers" className="space-y-4">
            <div className="grid gap-4">
              {product.sellers.map((seller: Seller) => (
                <Card key={seller.id} className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{seller.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{seller.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">
                          ₹{seller.price.toLocaleString()}
                          <span className="text-sm font-normal text-muted-foreground">/MT</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          <span className="text-sm font-medium">{seller.rating}</span>
                          <span className="text-sm text-muted-foreground">({seller.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Min Order:</span>
                        <div className="font-medium text-foreground">{seller.minOrder} MT</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Delivery:</span>
                        <div className="font-medium text-foreground">{seller.deliveryTime}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Payment:</span>
                        <div className="font-medium text-foreground">{seller.paymentTerms}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {seller.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Select This Seller
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Price History</CardTitle>
                <CardDescription>Historical pricing trends over the last 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end space-x-4">
                  {product.priceHistory.map((point, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-gradient-primary rounded-t w-full"
                        style={{
                          height: `${(point.price / Math.max(...product.priceHistory.map(p => p.price))) * 200}px`
                        }}
                      ></div>
                      <div className="text-sm text-muted-foreground mt-2">{point.date}</div>
                      <div className="text-xs font-medium text-foreground">₹{point.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related">
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Related Products</h3>
              <p className="text-muted-foreground">Similar products will be shown here based on your preferences.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProductDetails;