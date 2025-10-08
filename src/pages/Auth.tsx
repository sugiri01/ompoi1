import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Leaf, Users, Building2, Factory, Truck, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const userRoles = [
  { value: 'farmer', label: 'Farmer', icon: Leaf, description: 'Grow and sell agricultural products' },
  { value: 'trader', label: 'Trader', icon: Users, description: 'Buy and sell commodities' },
  { value: 'corporate', label: 'Corporate Buyer', icon: Building2, description: 'Large scale purchasing' },
  { value: 'processor', label: 'Processor', icon: Factory, description: 'Process raw materials' },
  { value: 'logistics', label: 'Logistics Partner', icon: Truck, description: 'Transportation services' },
  { value: 'financial_partner', label: 'Financial Partner', icon: DollarSign, description: 'Trade financing' },
];

const accountTypes = [
  { value: 'seller', label: 'Seller', description: 'I want to sell products' },
  { value: 'buyer', label: 'Buyer', description: 'I want to buy products' },
  { value: 'both', label: 'Both', description: 'I want to buy and sell' },
];

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userRole, setUserRole] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error signing in",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!email || !password || !fullName) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
      return;
    }

    if (!userRole || !accountType) {
      toast({
        title: "Missing information",
        description: "Please select your role and account type",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            fullName,
            phone,
            companyName,
            userRole,
            accountType,
          }
        }
      });

      if (error) {
        toast({
          title: "Error creating account",
          description: error.message,
          variant: "destructive",
        });
      } else {
        if (data.user && !data.session) {
          toast({
            title: "Check your email",
            description: "We've sent you a confirmation link to complete your registration.",
          });
        } else {
          toast({
            title: "Account created successfully!",
            description: "Welcome to OMPOI Agricultural Platform.",
          });
          navigate("/");
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-3xl font-bold text-foreground ml-3">OMPOI</span>
          </div>
          <p className="text-lg text-muted-foreground">India's Premier B2B Agricultural Commodities Platform</p>
        </div>

        <Card className="bg-gradient-card border-0 shadow-large">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <CardHeader>
                <CardTitle>Sign In to Your Account</CardTitle>
                <CardDescription>
                  Access your OMPOI dashboard and start trading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>
                  Join thousands of farmers, traders, and businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 ? (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name (Optional)</Label>
                      <Input
                        id="companyName"
                        placeholder="Enter your company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email *</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password *</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Continue to Role Selection
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Select Your Role</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {userRoles.map((role) => {
                          const Icon = role.icon;
                          return (
                            <div
                              key={role.value}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                                userRole === role.value
                                  ? 'border-primary bg-primary-soft'
                                  : 'border-border bg-card hover:border-primary/50'
                              }`}
                              onClick={() => setUserRole(role.value)}
                            >
                              <div className="flex items-start space-x-3">
                                <Icon className="h-5 w-5 text-primary mt-1" />
                                <div>
                                  <div className="font-medium">{role.label}</div>
                                  <div className="text-sm text-muted-foreground">{role.description}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Account Type</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {accountTypes.map((type) => (
                          <div
                            key={type.value}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth text-center ${
                              accountType === type.value
                                ? 'border-primary bg-primary-soft'
                                : 'border-border bg-card hover:border-primary/50'
                            }`}
                            onClick={() => setAccountType(type.value)}
                          >
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}