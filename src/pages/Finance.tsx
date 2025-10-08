import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Shield, 
  Receipt,
  Banknote,
  Calculator
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  created_at: string;
}

interface TradeFinancing {
  id: string;
  loan_amount: number;
  interest_rate: number;
  loan_purpose: string;
  repayment_period_months: number;
  status: string;
  created_at: string;
}

export default function Finance() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [financing, setFinancing] = useState<TradeFinancing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTransactions();
      fetchFinancing();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from("payment_transactions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch payment transactions",
        variant: "destructive",
      });
    }
  };

  const fetchFinancing = async () => {
    try {
      const { data, error } = await supabase
        .from("trade_financing")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFinancing(data || []);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch trade financing",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
      case "disbursed": return "bg-success text-success-foreground";
      case "pending":
      case "applied": return "bg-primary text-primary-foreground";
      case "failed":
      case "rejected": return "bg-destructive text-destructive-foreground";
      case "refunded":
      case "closed": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const totalTransactionVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
  const completedTransactions = transactions.filter(t => t.status === 'completed');
  const totalFinancing = financing.reduce((acc, f) => acc + f.loan_amount, 0);
  const activeLoans = financing.filter(f => f.status === 'disbursed').length;

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-pulse text-muted-foreground">Loading financial data...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Services</h1>
            <p className="text-muted-foreground">Manage payments, trade financing, and financial analytics</p>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <CreditCard className="w-4 h-4 mr-2" />
            Request Financing
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="financing">Trade Financing</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              {/* Financial Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                        <p className="text-2xl font-bold text-foreground">
                          ₹{totalTransactionVolume.toLocaleString()}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                        <p className="text-2xl font-bold text-foreground">{transactions.length}</p>
                      </div>
                      <Receipt className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Loans</p>
                        <p className="text-2xl font-bold text-foreground">{activeLoans}</p>
                      </div>
                      <Banknote className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Financing</p>
                        <p className="text-2xl font-bold text-foreground">
                          ₹{totalFinancing.toLocaleString()}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Methods & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-success/20 rounded-full">
                          <CreditCard className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Stripe Integration</p>
                          <p className="text-sm text-muted-foreground">Credit/Debit Cards</p>
                        </div>
                      </div>
                      <Badge className="bg-success text-success-foreground">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-full">
                          <Banknote className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Razorpay</p>
                          <p className="text-sm text-muted-foreground">UPI, Net Banking</p>
                        </div>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                          <Receipt className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Bank Transfer</p>
                          <p className="text-sm text-muted-foreground">Direct bank transfers</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Setup</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Financial Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-primary text-primary-foreground justify-start">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Apply for Trade Financing
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Crop Insurance
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Calculator className="w-4 h-4 mr-2" />
                      Financial Calculator
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <PieChart className="w-4 h-4 mr-2" />
                      Credit Score Check
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card className="bg-gradient-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {transactions.length === 0 ? (
                    <div className="text-center py-12">
                      <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No transactions</h3>
                      <p className="text-muted-foreground mb-4">Your payment transactions will appear here.</p>
                      <Button className="bg-primary text-primary-foreground">Make Payment</Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {transactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <DollarSign className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {transaction.currency} {transaction.amount.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.payment_method || 'Payment'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status.toUpperCase()}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(transaction.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Management
                  </CardTitle>
                  <Button className="bg-primary text-primary-foreground">
                    <CreditCard className="w-4 h-4 mr-2" />
                    New Payment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No payment history</h3>
                    <p className="text-muted-foreground mb-4">Start by making your first payment or receiving payments from buyers.</p>
                    <Button className="bg-primary text-primary-foreground">Setup Payments</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-foreground">
                                {transaction.currency} {transaction.amount.toLocaleString()}
                              </h3>
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                              <div>
                                <span className="font-medium">Method:</span> {transaction.payment_method || 'N/A'}
                              </div>
                              <div>
                                <span className="font-medium">Date:</span> {new Date(transaction.created_at).toLocaleDateString()}
                              </div>
                              <div>
                                <span className="font-medium">Time:</span> {new Date(transaction.created_at).toLocaleTimeString()}
                              </div>
                              <div>
                                <span className="font-medium">ID:</span> {transaction.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financing">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="w-5 h-5" />
                    Trade Financing
                  </CardTitle>
                  <Button className="bg-primary text-primary-foreground">
                    <Banknote className="w-4 h-4 mr-2" />
                    Apply for Loan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {financing.length === 0 ? (
                  <div className="text-center py-12">
                    <Banknote className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No financing history</h3>
                    <p className="text-muted-foreground mb-4">Access working capital and trade financing to grow your business.</p>
                    <Button className="bg-primary text-primary-foreground">Apply for Financing</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {financing.map((loan) => (
                      <div key={loan.id} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-foreground">
                                ₹{loan.loan_amount.toLocaleString()}
                              </h3>
                              <Badge className={getStatusColor(loan.status)}>
                                {loan.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                              <div>
                                <span className="font-medium">Purpose:</span> {loan.loan_purpose}
                              </div>
                              <div>
                                <span className="font-medium">Interest:</span> {loan.interest_rate}% p.a.
                              </div>
                              <div>
                                <span className="font-medium">Term:</span> {loan.repayment_period_months} months
                              </div>
                              <div>
                                <span className="font-medium">Applied:</span> {new Date(loan.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insurance">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Crop Insurance & Risk Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Insurance Protection</h3>
                  <p className="text-muted-foreground mb-4">Protect your crops and business with comprehensive insurance coverage.</p>
                  <Button className="bg-primary text-primary-foreground">Explore Insurance Plans</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-gradient-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Financial Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Financial Insights</h3>
                  <p className="text-muted-foreground mb-4">Analyze cash flow, profitability, and financial performance metrics.</p>
                  <Button className="bg-primary text-primary-foreground">View Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}