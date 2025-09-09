export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  avatar?: string;
  createdAt: Date;
  balance: number;
}

export interface Transaction {
  id: string;
  customerId: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: Date;
  photo?: string;
  voiceNote?: string;
}

export interface LedgerEntry {
  transaction: Transaction;
  runningBalance: number;
}

export interface DashboardStats {
  totalReceivable: number;
  totalPayable: number;
  netBalance: number;
  totalCustomers: number;
  totalTransactions: number;
}