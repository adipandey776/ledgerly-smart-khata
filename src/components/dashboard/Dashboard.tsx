import { DashboardStats } from "./DashboardStats";
import { TransactionList } from "@/components/transactions/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, UserPlus, Plus } from "lucide-react";
import { Customer, Transaction, DashboardStats as Stats } from "@/types/ledger";

interface DashboardProps {
  stats: Stats;
  recentTransactions: Transaction[];
  onAddCustomer: () => void;
  onAddTransaction: () => void;
}

export function Dashboard({ stats, recentTransactions, onAddCustomer, onAddTransaction }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-glow">
        <h1 className="text-2xl font-bold mb-2">Smart Khata Ledger</h1>
        <p className="text-primary-foreground/90">Manage your business finances with ease</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="professional" 
              size="lg" 
              onClick={onAddCustomer}
              className="h-16 flex-col gap-2"
            >
              <UserPlus className="w-6 h-6" />
              Add Customer
            </Button>
            <Button 
              variant="gradient" 
              size="lg" 
              onClick={onAddTransaction}
              className="h-16 flex-col gap-2"
            >
              <Plus className="w-6 h-6" />
              Add Transaction
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <TransactionList 
        transactions={recentTransactions} 
        showCustomerName={true}
      />
    </div>
  );
}