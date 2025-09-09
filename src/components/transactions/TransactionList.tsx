import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Calendar, FileText } from "lucide-react";
import { Transaction } from "@/types/ledger";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transactionId: string) => void;
  showCustomerName?: boolean;
}

export function TransactionList({ 
  transactions, 
  onEdit, 
  onDelete, 
  showCustomerName = false 
}: TransactionListProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (transactions.length === 0) {
    return (
      <Card className="shadow-soft">
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No transactions yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 hover:bg-muted/30 transition-smooth">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    transaction.type === "credit" 
                      ? "bg-success-muted text-success" 
                      : "bg-danger-muted text-danger"
                  )}>
                    {transaction.type === "credit" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(transaction.date)}
                      </div>
                      <Badge 
                        variant={transaction.type === "credit" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {transaction.type === "credit" ? "Credit" : "Debit"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={cn(
                    "font-bold",
                    transaction.type === "credit" ? "text-success" : "text-danger"
                  )}>
                    {transaction.type === "credit" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </p>
                  
                  <div className="flex gap-1 mt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onEdit?.(transaction)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onDelete?.(transaction.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}