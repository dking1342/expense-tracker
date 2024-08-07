export interface TransactionData {
  text: string;
  amount: number;
}

export interface Transaction {
  id: number;
  text: string;
  amount: number;
}

export type TransactionFn = (transaction: TransactionData) => void;
