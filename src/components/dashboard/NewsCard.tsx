import { Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: "Production" | "Logistics" | "Policy" | "Markets";
  timestamp: string;
  source: string;
  url?: string;
}

interface NewsCardProps {
  news: NewsItem[];
}

const categoryColors = {
  Production: "bg-success/10 text-success border-success/20",
  Logistics: "bg-warning/10 text-warning border-warning/20",
  Policy: "bg-destructive/10 text-destructive border-destructive/20",
  Markets: "bg-primary/10 text-primary border-primary/20",
};

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="bg-gradient-card border-0 shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Latest Market News</h3>
          <Button variant="ghost" size="sm">
            View All
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="space-y-2 pb-4 border-b border-border/50 last:border-0 last:pb-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-medium text-sm leading-tight line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {item.summary}
                </p>
              </div>
              <Badge 
                variant="secondary" 
                className={categoryColors[item.category]}
              >
                {item.category}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{item.timestamp}</span>
              </div>
              <span>{item.source}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}