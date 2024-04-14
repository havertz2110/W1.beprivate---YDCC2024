export type TransactionCollection = {
  id: string;
  step: number;
  amount: number;
  oldbalanceOrig: number;
  oldbalanceDest: number;
  trans_frequency_Dest: number;
  avg_trans_amount_Dest: number;
  variability_trans_amount_Dest: number;
  big_trans_flag: boolean;
  zero_new_balance_Dest_flag: boolean;
  zero_new_balance_Orig_flag: boolean;
  collectionId: string;
  collectionName: string;
  CASH_IN: number;
  CASH_OUT: number;
  DEBIT: number;
  TRANSFER: number;
  created: string;
  updated: string; 
}

export type TransactionResult = {
  id: string;
  Fraud: String;
  step: number;
  amount: number;
  oldbalanceOrig: number;
  oldbalanceDest: number;
  trans_frequency_Dest: number;
  avg_trans_amount_Dest: number;
  variability_trans_amount_Dest: number;
  big_trans_flag: boolean;
  zero_new_balance_Dest_flag: boolean;
  zero_new_balance_Orig_flag: boolean;
  CASH_IN: number;
  CASH_OUT: number;
  DEBIT: number;
  TRANSFER: number;
  created: string;
  updated: string; 
}

export type TransactionHighlight = {
  id: string;
  amount: number;
  oldbalanceOrig: number;
  oldbalanceDest: number;
  avg_trans_amount_Dest: number;
  variability_trans_amount_Dest: number;
}

