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
      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Smart Khata Ledger</h1>
          <p className="text-muted-foreground text-lg">Manage your business finances with ease</p>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Quick Actions */}
      <Card className="shadow-medium border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <TrendingUp className="w-6 h-6 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              size="xl" 
              onClick={onAddCustomer}
              className="h-20 flex-col gap-3 border-2 hover:border-primary hover:bg-primary/5"
            >
              <UserPlus className="w-8 h-8 text-primary" />
              <span className="font-semibold">Add Customer</span>
            </Button>
            <Button 
              variant="default" 
              size="xl" 
              onClick={onAddTransaction}
              className="h-20 flex-col gap-3 bg-primary hover:bg-primary-dark"
            >
              <Plus className="w-8 h-8" />
              <span className="font-semibold">Add Transaction</span>
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