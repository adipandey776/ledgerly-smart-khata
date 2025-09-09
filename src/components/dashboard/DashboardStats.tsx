import { StatsCard } from "@/components/ui/stats-card";
import { TrendingUp, TrendingDown, Wallet, Users } from "lucide-react";
import { DashboardStats as Stats } from "@/types/ledger";

interface DashboardStatsProps {
  stats: Stats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard
        title="You'll Receive" 
        amount={stats.totalReceivable}
        icon={<TrendingUp className="w-5 h-5" />}
        variant="success"
      />
      <StatsCard
        title="You'll Pay"
        amount={stats.totalPayable}
        icon={<TrendingDown className="w-5 h-5" />}
        variant="danger"
      />
      <StatsCard
        title="Net Balance"
        amount={stats.netBalance}
        icon={<Wallet className="w-5 h-5" />}
        variant={stats.netBalance >= 0 ? "success" : "danger"}
      />
      <StatsCard
        title="Total Customers"
        amount={stats.totalCustomers}
        icon={<Users className="w-5 h-5" />}
        variant="default"
      />
    </div>
  );
}