import { useState, useMemo } from "react";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { CustomerList } from "@/components/customers/CustomerList";
import { AddTransactionForm } from "@/components/forms/AddTransactionForm";
import { BottomNavigation, TabType } from "@/components/layout/BottomNavigation";
import { mockCustomers, mockTransactions } from "@/lib/mock-data";
import { Customer, Transaction, DashboardStats } from "@/types/ledger";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  const { toast } = useToast();

  // Calculate dashboard statistics
  const dashboardStats: DashboardStats = useMemo(() => {
    const totalReceivable = customers
      .filter(c => c.balance > 0)
      .reduce((sum, c) => sum + c.balance, 0);
    
    const totalPayable = Math.abs(customers
      .filter(c => c.balance < 0)
      .reduce((sum, c) => sum + c.balance, 0));
    
    const netBalance = totalReceivable - totalPayable;
    
    return {
      totalReceivable,
      totalPayable,
      netBalance,
      totalCustomers: customers.length,
      totalTransactions: transactions.length,
    };
  }, [customers, transactions]);

  // Get recent transactions (last 10)
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: `t${Date.now()}`,
    };
    
    setTransactions(prev => [...prev, transaction]);
    
    // Update customer balance
    setCustomers(prev => prev.map(customer => {
      if (customer.id === transaction.customerId) {
        const balanceChange = transaction.type === 'credit' 
          ? transaction.amount 
          : -transaction.amount;
        return {
          ...customer,
          balance: customer.balance + balanceChange
        };
      }
      return customer;
    }));
    
    setActiveTab("dashboard");
  };

  const handleAddCustomer = () => {
    // For demo, add a sample customer
    const newCustomer: Customer = {
      id: `c${Date.now()}`,
      name: "New Customer",
      phone: "+91 98765 43210",
      balance: 0,
      createdAt: new Date(),
    };
    
    setCustomers(prev => [...prev, newCustomer]);
    toast({
      title: "Customer Added",
      description: "New customer has been added successfully",
    });
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    // For now, just show a toast
    toast({
      title: "Customer Selected",
      description: `Viewing ${customer.name}'s profile`,
    });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            stats={dashboardStats}
            recentTransactions={recentTransactions}
            onAddCustomer={handleAddCustomer}
            onAddTransaction={() => setActiveTab("add")}
          />
        );
      
      case "customers":
        return (
          <CustomerList
            customers={customers}
            onSelectCustomer={handleSelectCustomer}
            onAddCustomer={handleAddCustomer}
          />
        );
      
      case "add":
        return (
          <AddTransactionForm
            customers={customers}
            onSubmit={handleAddTransaction}
            onCancel={() => setActiveTab("dashboard")}
          />
        );
      
      case "reports":
        return (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold mb-4">Reports Coming Soon</h2>
            <p className="text-muted-foreground">Generate detailed financial reports</p>
          </div>
        );
      
      case "settings":
        return (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold mb-4">Settings Coming Soon</h2>
            <p className="text-muted-foreground">App settings and security options</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {renderActiveTab()}
      </div>
      
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Index;