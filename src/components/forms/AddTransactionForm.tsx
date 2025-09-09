import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Camera, Mic } from "lucide-react";
import { Customer, Transaction } from "@/types/ledger";
import { useToast } from "@/hooks/use-toast";

interface AddTransactionFormProps {
  customers: Customer[];
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

export function AddTransactionForm({ customers, onSubmit, onCancel }: AddTransactionFormProps) {
  const [formData, setFormData] = useState({
    customerId: "",
    amount: "",
    type: "credit" as "credit" | "debit",
    description: "",
    photo: null as File | null,
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerId || !formData.amount || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const transaction: Omit<Transaction, 'id'> = {
      customerId: formData.customerId,
      amount: parseFloat(formData.amount),
      type: formData.type,
      description: formData.description,
      date: new Date(),
      photo: formData.photo ? URL.createObjectURL(formData.photo) : undefined,
    };

    onSubmit(transaction);
    toast({
      title: "Transaction Added",
      description: `${formData.type === "credit" ? "Credit" : "Debit"} of ₹${formData.amount} added successfully`,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  return (
    <Card className="shadow-large max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Add Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer *</Label>
            <Select 
              value={formData.customerId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, customerId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type *</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: "credit" | "debit") => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit (Money In)</SelectItem>
                <SelectItem value="debit">Debit (Money Out)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹) *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter transaction details..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Attachments (Optional)</Label>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Camera className="w-4 h-4 mr-2" />
                Photo
              </Button>
              <Button type="button" variant="outline" size="sm" className="flex-1">
                <Mic className="w-4 h-4 mr-2" />
                Voice Note
              </Button>
            </div>
            {formData.photo && (
              <p className="text-xs text-success">Photo attached: {formData.photo.name}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              Add Transaction
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}