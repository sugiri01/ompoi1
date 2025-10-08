import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  MapPin, 
  Star,
  Smartphone,
  PlayCircle,
  CheckCircle,
  Leaf,
  BarChart3,
  Handshake,
  Globe,
  Download,
  Apple,
  Play
} from "lucide-react";
import { CommodityTicker } from "@/components/ui/commodity-ticker";
import { useAuth } from "@/components/auth/AuthProvider";
import { Layout } from "@/components/layout/Layout";
import { PriceCard } from "@/components/dashboard/PriceCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { NewsCard } from "@/components/dashboard/NewsCard";

const mostTradedProducts = [
  {
    name: "Raw Cashew Nuts",
    suppliers: 150,
    price: "₹85,000/MT",
    change: "+2.5%",
    positive: true,
    image: "🥜"
  },
  {
    name: "Wheat",
    suppliers: 320,
    price: "₹2,850/MT", 
    change: "+0.89%",
    positive: true,
    image: "🌾"
  },
  {
    name: "Rice (Basmati)",
    suppliers: 280,
    price: "₹3,200/MT",
    change: "+1.43%", 
    positive: true,
    image: "🍚"
  },
  {
    name: "Cotton",
    suppliers: 190,
    price: "₹8,750/MT",
    change: "-1.35%",
    positive: false,
    image: "🌱"
  },
  {
    name: "Soybeans",
    suppliers: 245,
    price: "₹4,500/MT",
    change: "+1.47%",
    positive: true, 
    image: "🫘"
  },
  {
    name: "Coffee Beans",
    suppliers: 125,
    price: "₹18,500/MT",
    change: "+0.98%",
    positive: true,
    image: "☕"
  }
];

const tradingSteps = [
  {
    step: 1,
    title: "Browse & Select",
    description: "Search through thousands of verified agricultural products from trusted suppliers across India",
    icon: BarChart3
  },
  {
    step: 2, 
    title: "Quality Assurance",
    description: "Our AI-powered quality checks and third-party inspections ensure premium product standards",
    icon: Shield
  },
  {
    step: 3,
    title: "Secure Trading",
    description: "Complete transactions safely with escrow payments, logistics support, and trade financing",
    icon: Handshake
  }
];

const keyMetrics = [
  { label: "Agricultural Markets", value: "25+", icon: MapPin },
  { label: "Verified Suppliers", value: "500+", icon: Users },
  { label: "Better Prices", value: "30%", icon: TrendingUp },
  { label: "Countries Served", value: "15+", icon: Globe }
];

const mockNews = [
  {
    id: "1",
    title: "Vietnam Cashew Export Prices Rise 12% Due to Supply Constraints",
    summary: "Global demand surge and weather-related supply issues push Vietnamese cashew kernel prices to highest levels since 2021.",
    category: "Markets" as const,
    timestamp: "2 hours ago",
    source: "Cashew Weekly"
  },
  {
    id: "2", 
    title: "New Organic Certification Standards for Indian Cashew Processors",
    summary: "Ministry announces updated guidelines for organic cashew processing facilities, affecting 40% of domestic processors.",
    category: "Policy" as const,
    timestamp: "4 hours ago",
    source: "Trade India"
  },
  {
    id: "3",
    title: "Major Shipping Delays Expected at Tuticorin Port",
    summary: "Monsoon weather conditions causing 3-5 day delays for cashew shipments through Tamil Nadu's primary export terminal.",
    category: "Logistics" as const,
    timestamp: "6 hours ago",
    source: "Port Authority"
  }
];

const Index = () => {
  const [email, setEmail] = useState("");
  const { user } = useAuth();
  const location = useLocation();

  // Only show dashboard if user is authenticated AND on the home route
  if (user && location.pathname === "/") {
    // Authenticated user dashboard
    return (
      <Layout>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-card rounded-lg p-6 border-0 shadow-medium">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Welcome back, {user.user_metadata?.fullName || user.email}!
                </h1>
                <p className="text-muted-foreground">
                  Your agricultural trading dashboard
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Today's Volume</div>
                    <div className="text-xl font-semibold text-foreground">₹2.4M</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PriceCard 
              title="W240 Kernels"
              price="9.80"
              change={2.4}
              period="24h"
            />
            <PriceCard 
              title="Raw Cashew Nuts"
              price="2.15"
              change={-1.2}
              period="24h"
            />
            <PriceCard 
              title="W320 Kernels"
              price="8.95"
              change={3.1}
              period="24h"
            />
            <PriceCard 
              title="CNSL"
              price="0.85"
              change={0.8}
              period="24h"
            />
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Global Trade Volume"
              value="2.4M"
              subtitle="Tons (YTD)"
              icon={Globe}
              trend={{ value: 8.2, label: "vs last year" }}
            />
            <MetricCard 
              title="Active Listings"
              value="1,247"
              subtitle="Marketplace"
              icon={Leaf}
              trend={{ value: 12.5, label: "this month" }}
            />
            <MetricCard 
              title="Price Volatility"
              value="4.2%"
              subtitle="30-day average"
              icon={BarChart3}
              trend={{ value: -2.1, label: "vs last month" }}
            />
            <MetricCard 
              title="Market Participants"
              value="3,489"
              subtitle="Verified traders"
              icon={Users}
              trend={{ value: 15.3, label: "growth" }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Price Chart - Takes up 2 columns on large screens */}
            <div className="lg:col-span-2">
              <PriceChart />
            </div>
            
            {/* News Card - Takes up 1 column */}
            <div className="lg:col-span-1">
              <NewsCard news={mockNews} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }


  // Landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Real-time Commodity Price Ticker */}
      <CommodityTicker />
      
      {/* Navigation Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <span className="text-2xl font-bold text-foreground">OMPOI</span>
              </div>
              <Badge variant="secondary" className="hidden md:inline-flex">
                India's #1 Agricultural Platform
              </Badge>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-smooth">
                Marketplace
              </Link>
              <Link to="/prices" className="text-muted-foreground hover:text-foreground transition-smooth">
                Prices
              </Link>
              <Link to="/news" className="text-muted-foreground hover:text-foreground transition-smooth">
                News
              </Link>
              <Button asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              India's Best B2B Platform for
              <span className="text-primary block mt-2">Agricultural Commodities</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Connect directly with farmers, traders, and processors. Get better prices, 
              ensure quality, and streamline your agricultural supply chain with AI-powered insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/auth">
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {keyMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Most Traded Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Most Traded Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the top agricultural commodities traded on our platform with real-time pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mostTradedProducts.map((product, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-medium hover:shadow-large transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{product.image}</div>
                    <Badge variant={product.positive ? "default" : "destructive"}>
                      {product.change}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                    <span>{product.suppliers} suppliers</span>
                    <span className="font-semibold text-foreground">{product.price}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/auth">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Trading Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Trading Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and transparent agricultural commodity trading in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tradingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile App Download Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6">
              <Smartphone className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Trade On-the-Go</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Download the OMPOI mobile app for seamless trading, real-time price alerts, 
              and instant communication with suppliers anywhere, anytime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Apple className="mr-3 h-6 w-6" />
                Download for iOS
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Play className="mr-3 h-6 w-6" />
                Download for Android
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Get the latest market insights, price alerts, and trading opportunities delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button>
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold">O</span>
                </div>
                <span className="text-xl font-bold text-foreground">OMPOI</span>
              </div>
              <p className="text-muted-foreground text-sm">
                India's premier B2B platform for agricultural commodities trading.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/marketplace" className="hover:text-foreground">Marketplace</Link></li>
                <li><Link to="/prices" className="hover:text-foreground">Live Prices</Link></li>
                <li><Link to="/news" className="hover:text-foreground">Market News</Link></li>
                <li><Link to="/analysis" className="hover:text-foreground">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">API Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 OMPOI Agricultural Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
