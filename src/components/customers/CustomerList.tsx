import { useState } from "react";
import { CustomerCard } from "./CustomerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, UserPlus, Users } from "lucide-react";
import { Customer } from "@/types/ledger";

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onAddCustomer: () => void;
  onCall?: (phone: string) => void;
  onMessage?: (phone: string) => void;
}

export function CustomerList({ 
  customers, 
  onSelectCustomer, 
  onAddCustomer,
  onCall,
  onMessage 
}: CustomerListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (phone: string) => {
    window.location.href = `sms:${phone}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Customers</h2>
        </div>
        <Button variant="default" size="lg" onClick={onAddCustomer}>
          <UserPlus className="w-5 h-5" />
          Add Customer
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search customers by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Customer List */}
      {filteredCustomers.length === 0 ? (
        <Card className="shadow-soft">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "No customers found matching your search" : "No customers yet"}
            </p>
            <Button variant="default" onClick={onAddCustomer}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Your First Customer
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onSelect={onSelectCustomer}
              onCall={onCall || handleCall}
              onMessage={onMessage || handleMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
}