import { Calendar, Globe, Truck, FileText, Filter } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const newsData = [
  {
    id: 1,
    title: "Vietnam Cashew Export Prices Rise 12% Due to Supply Constraints",
    summary: "Global demand surge and weather-related supply issues push Vietnamese cashew kernel prices to highest levels since 2021. Industry experts predict continued upward pressure through Q4.",
    category: "Markets",
    timestamp: "2 hours ago",
    source: "Cashew Weekly",
    readTime: "3 min read",
    image: "/api/placeholder/400/200"
  },
  {
    id: 2,
    title: "New Organic Certification Standards for Indian Cashew Processors",
    summary: "Ministry announces updated guidelines for organic cashew processing facilities, affecting 40% of domestic processors. New standards focus on traceability and sustainable practices.",
    category: "Policy",
    timestamp: "4 hours ago", 
    source: "Trade India",
    readTime: "5 min read",
    image: "/api/placeholder/400/200"
  },
  {
    id: 3,
    title: "Major Shipping Delays Expected at Tuticorin Port",
    summary: "Monsoon weather conditions causing 3-5 day delays for cashew shipments through Tamil Nadu's primary export terminal. Alternative routing through Chennai recommended.",
    category: "Logistics",
    timestamp: "6 hours ago",
    source: "Port Authority",
    readTime: "2 min read",
    image: "/api/placeholder/400/200"
  },
  {
    id: 4,
    title: "Ivory Coast Projects Record Cashew Harvest Despite Climate Challenges",
    summary: "West African nation expects 850,000 tons production for 2024 season, up 8% from previous year. New drought-resistant varieties showing promising results.",
    category: "Production",
    timestamp: "8 hours ago",
    source: "African Agriculture Report",
    readTime: "4 min read",
    image: "/api/placeholder/400/200"
  },
  {
    id: 5,
    title: "AI-Powered Quality Grading Systems Gain Traction in Processing Plants",
    summary: "Advanced machine learning algorithms now being deployed across major facilities to standardize kernel grading and reduce quality disputes in international trade.",
    category: "Technology",
    timestamp: "12 hours ago",
    source: "Food Tech Innovation",
    readTime: "6 min read",
    image: "/api/placeholder/400/200"
  },
  {
    id: 6,
    title: "USDA Updates Cashew Import Inspection Protocols",
    summary: "New guidelines introduce stricter aflatoxin testing requirements and enhanced documentation for all cashew imports. Implementation begins January 2025.",
    category: "Regulations",
    timestamp: "1 day ago",
    source: "Federal Register",
    readTime: "4 min read",
    image: "/api/placeholder/400/200"
  }
];

const categoryIcons = {
  Markets: Globe,
  Policy: FileText,
  Logistics: Truck,
  Production: Calendar,
  Technology: FileText,
  Regulations: FileText
};

const categoryColors = {
  Markets: "bg-primary/10 text-primary",
  Policy: "bg-warning/10 text-warning",
  Logistics: "bg-destructive/10 text-destructive",
  Production: "bg-success/10 text-success",
  Technology: "bg-purple-100 text-purple-700",
  Regulations: "bg-orange-100 text-orange-700"
};

const NewsCard = ({ article }: { article: any }) => {
  const IconComponent = categoryIcons[article.category as keyof typeof categoryIcons];
  
  return (
    <Card className="hover:shadow-medium transition-all cursor-pointer">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Badge className={categoryColors[article.category as keyof typeof categoryColors]}>
            <IconComponent className="h-3 w-3 mr-1" />
            {article.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{article.timestamp}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 leading-tight">{article.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.summary}</p>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{article.source}</span>
          <span>{article.readTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const News = () => {
  const categories = ["All", "Markets", "Production", "Logistics", "Policy", "Technology", "Regulations"];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Market News</h1>
            <p className="text-muted-foreground">Latest updates from the global cashew industry</p>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="All" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
          
          {categories.slice(1).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData
                  .filter((article) => article.category === category)
                  .map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline">Load More Articles</Button>
        </div>
      </div>
    </Layout>
  );
};

export default News;