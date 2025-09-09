import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  variant?: "default" | "success" | "danger" | "warning";
  className?: string;
}

export function StatsCard({ title, amount, icon, variant = "default", className }: StatsCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success-muted";
      case "danger":
        return "border-danger/20 bg-danger-muted";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      default:
        return "border-border bg-card";
    }
  };

  const getAmountColor = () => {
    if (amount > 0) {
      return variant === "danger" ? "text-danger" : "text-success";
    } else if (amount < 0) {
      return variant === "success" ? "text-success" : "text-danger";
    }
    return "text-muted-foreground";
  };

  return (
    <Card className={cn("shadow-soft hover:shadow-medium transition-smooth", getVariantStyles(), className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              variant === "success" && "bg-success/10 text-success",
              variant === "danger" && "bg-danger/10 text-danger", 
              variant === "warning" && "bg-yellow-100 text-yellow-600",
              variant === "default" && "bg-primary/10 text-primary"
            )}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className={cn("text-2xl font-bold", getAmountColor())}>
                {formatCurrency(amount)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}