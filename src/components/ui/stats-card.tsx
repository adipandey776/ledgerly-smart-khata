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

  const getVariantConfig = () => {
    switch (variant) {
      case "success":
        return {
          cardClass: "border-success/20 bg-success-muted shadow-medium hover:shadow-large",
          iconClass: "bg-success/10 text-success",
          amountClass: "text-success"
        };
      case "danger":
        return {
          cardClass: "border-danger/20 bg-danger-muted shadow-medium hover:shadow-large",
          iconClass: "bg-danger/10 text-danger",
          amountClass: "text-danger"
        };
      case "warning":
        return {
          cardClass: "border-secondary/20 bg-yellow-50 shadow-medium hover:shadow-large",
          iconClass: "bg-secondary/10 text-secondary",
          amountClass: "text-secondary"
        };
      default:
        return {
          cardClass: "border-primary/20 bg-primary/5 shadow-medium hover:shadow-large",
          iconClass: "bg-primary/10 text-primary",
          amountClass: "text-primary"
        };
    }
  };

  const config = getVariantConfig();

  return (
    <Card className={cn("transition-smooth", config.cardClass, className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-xl", config.iconClass)}>
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className={cn("text-3xl font-bold tracking-tight", config.amountClass)}>
              {formatCurrency(amount)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}