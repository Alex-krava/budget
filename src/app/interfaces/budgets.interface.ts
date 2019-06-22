export interface IBudget {
  id: number;
  name: string;
  currency: string;
  limit: number;
  remaining: number;
  averageAmount: number;
  maximumAmount: number;
  minimumAmount: number;
  transactions: ITransactions[];
}

export interface ITransactions {
  target: string;
  amount: number;
  currency: string;
}
