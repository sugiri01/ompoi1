import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2,
  Code,
  Book,
  Activity,
  Shield,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  requests: number;
  status: "active" | "inactive";
}

const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API",
    key: "ompoi_live_sk_1234567890abcdef",
    created: "2024-01-15",
    lastUsed: "2024-01-20",
    requests: 15420,
    status: "active"
  },
  {
    id: "2", 
    name: "Development Testing",
    key: "ompoi_test_sk_0987654321fedcba",
    created: "2024-01-10",
    lastUsed: "2024-01-19",
    requests: 892,
    status: "active"
  }
];

const codeExamples = {
  javascript: `// Initialize OMPOI API client
const ompoi = require('@ompoi/api-client');
const client = new ompoi.Client('your_api_key_here');

// Get market prices
const prices = await client.prices.getLatest({
  product: 'cashew-kernels',
  grade: 'W240'
});

// Create a new listing
const listing = await client.listings.create({
  title: 'Premium W240 Cashew Kernels',
  quantity: 1000,
  price: 850,
  location: 'Kerala, India'
});`,

  python: `# Initialize OMPOI API client
import ompoi

client = ompoi.Client(api_key='your_api_key_here')

# Get market prices
prices = client.prices.get_latest(
    product='cashew-kernels',
    grade='W240'
)

# Create a new listing
listing = client.listings.create(
    title='Premium W240 Cashew Kernels',
    quantity=1000,
    price=850,
    location='Kerala, India'
)`,

  curl: `# Get market prices
curl -X GET "https://api.ompoi.com/v1/prices/latest?product=cashew-kernels&grade=W240" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json"

# Create a new listing
curl -X POST "https://api.ompoi.com/v1/listings" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Premium W240 Cashew Kernels",
    "quantity": 1000,
    "price": 850,
    "location": "Kerala, India"
  }'`
};

export default function ApiAccess() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const { toast } = useToast();

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard."
    });
  };

  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your API key.",
        variant: "destructive"
      });
      return;
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `ompoi_live_sk_${Math.random().toString(36).substr(2, 24)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: "Never",
      requests: 0,
      status: "active"
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    toast({
      title: "API Key Generated",
      description: "Your new API key has been created successfully."
    });
  };

  const deleteApiKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
    toast({
      title: "API Key Deleted",
      description: "The API key has been permanently deleted."
    });
  };

  const maskApiKey = (key: string, show: boolean) => {
    if (show) return key;
    const prefix = key.substring(0, 12);
    const suffix = key.substring(key.length - 4);
    return `${prefix}${'•'.repeat(20)}${suffix}`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">API Access</h1>
          <p className="text-muted-foreground">Manage your API keys and integrate OMPOI into your applications</p>
        </div>

        <Tabs defaultValue="keys" className="space-y-6">
          <TabsList>
            <TabsTrigger value="keys">API Keys</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="usage">Usage & Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="keys" className="space-y-6">
            {/* Create New API Key */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New API Key
                </CardTitle>
                <CardDescription>
                  Generate a new API key for your application or service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="keyName">Key Name</Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Production API, Development Testing"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={generateApiKey}>
                      <Key className="h-4 w-4 mr-2" />
                      Generate Key
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <p className="font-medium">Important Security Notice</p>
                    <p>Store your API keys securely and never share them publicly. Keys cannot be recovered once lost.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Existing API Keys */}
            <Card>
              <CardHeader>
                <CardTitle>Your API Keys</CardTitle>
                <CardDescription>
                  Manage and monitor your existing API keys
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-foreground">{apiKey.name}</h3>
                          <Badge 
                            variant={apiKey.status === "active" ? "default" : "secondary"}
                          >
                            {apiKey.status}
                          </Badge>
                        </div>
                        
                        <div className="font-mono text-sm bg-muted p-2 rounded flex items-center justify-between">
                          <span>{maskApiKey(apiKey.key, showKeys[apiKey.id])}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleKeyVisibility(apiKey.id)}
                            >
                              {showKeys[apiKey.id] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(apiKey.key)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Created: {apiKey.created}</span>
                          <span>Last used: {apiKey.lastUsed}</span>
                          <span>Requests: {apiKey.requests.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="space-y-6">
            {/* API Documentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  API Documentation
                </CardTitle>
                <CardDescription>
                  Learn how to integrate OMPOI APIs into your applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Quick Start */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Start</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm mb-3">Base URL: <code className="bg-background px-2 py-1 rounded">https://api.ompoi.com/v1</code></p>
                      <p className="text-sm">Authentication: Include your API key in the Authorization header as a Bearer token.</p>
                    </div>
                  </div>

                  {/* Code Examples */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Code Examples</h3>
                    
                    <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <TabsList>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="javascript">
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{codeExamples.javascript}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(codeExamples.javascript)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="python">
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{codeExamples.python}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(codeExamples.python)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="curl">
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{codeExamples.curl}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(codeExamples.curl)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Available Endpoints */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Available Endpoints</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { method: "GET", endpoint: "/prices/latest", description: "Get latest commodity prices" },
                        { method: "GET", endpoint: "/listings", description: "Browse marketplace listings" },
                        { method: "POST", endpoint: "/listings", description: "Create a new listing" },
                        { method: "GET", endpoint: "/orders", description: "View your orders" },
                        { method: "POST", endpoint: "/orders", description: "Place a new order" },
                        { method: "GET", endpoint: "/market/intelligence", description: "Get market insights" }
                      ].map((endpoint, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm">{endpoint.endpoint}</code>
                          </div>
                          <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            {/* Usage Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16,312</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rate Limit</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,000</div>
                  <p className="text-xs text-muted-foreground">
                    Requests per minute
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <Code className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle>Billing & Plans</CardTitle>
                <CardDescription>
                  Your current plan and usage details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-card rounded-lg">
                    <div>
                      <h3 className="font-semibold">Free Plan</h3>
                      <p className="text-sm text-muted-foreground">Up to 10,000 requests per month</p>
                    </div>
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Requests used this month</span>
                      <span>16,312 / 10,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-full" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You've exceeded your monthly limit. Consider upgrading for unlimited access.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
