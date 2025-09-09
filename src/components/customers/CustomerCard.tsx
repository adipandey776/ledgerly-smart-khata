import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { Customer } from "@/types/ledger";
import { cn } from "@/lib/utils";

interface CustomerCardProps {
  customer: Customer;
  onSelect: (customer: Customer) => void;
  onCall?: (phone: string) => void;
  onMessage?: (phone: string) => void;
}

export function CustomerCard({ customer, onSelect, onCall, onMessage }: CustomerCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-success";
    if (balance < 0) return "text-danger";
    return "text-muted-foreground";
  };

  const getBalanceText = (balance: number) => {
    if (balance > 0) return `Will receive ${formatCurrency(balance)}`;
    if (balance < 0) return `Will pay ${formatCurrency(balance)}`;
    return "Settled";
  };

  return (
    <Card 
      className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer border-l-4 border-l-primary/20"
      onClick={() => onSelect(customer)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 border-2 border-primary/10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{customer.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Phone className="w-3 h-3" />
              <span className="truncate">{customer.phone}</span>
            </div>
            {customer.address && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{customer.address}</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <p className={cn("font-bold text-sm", getBalanceColor(customer.balance))}>
              {getBalanceText(customer.balance)}
            </p>
            <div className="flex gap-1 mt-2">
              <Button 
                size="icon-sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onCall?.(customer.phone);
                }}
              >
                <Phone className="w-3 h-3" />
              </Button>
              <Button 
                size="icon-sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onMessage?.(customer.phone);
                }}
              >
                <MessageCircle className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}