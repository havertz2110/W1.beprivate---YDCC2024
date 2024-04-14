const convertToTransactionCollection = (data:RecordModel[]): TransactionCollection[] => {
    return data.map(item => ({
      id: item.id,
      step: item.step,
      amount: item.amount,
      oldbalanceOrig: item.oldbalanceOrig,
      oldbalanceDest: item.oldbalanceDest,
      trans_frequency_Dest: item.trans_frequency_Dest,
      avg_trans_amount_Dest: item.avg_trans_amount_Dest,
      variability_trans_amount_Dest: item.variability_trans_amount_Dest,
      big_trans_flag: item.big_trans_flag,
      zero_new_balance_Dest_flag: item.zero_new_balance_Dest_flag,
      zero_new_balance_Orig_flag: item.zero_new_balance_Orig_flag,
      collectionId: item.collectionId,
      collectionName: item.collectionName,
      CASH_IN: String(item.CASH_IN) === "true" ? 1 : 0,
      CASH_OUT: String(item.CASH_OUT) === "true" ? 1 : 0,
      DEBIT: String(item.DEBIT) === "true" ? 1 : 0,
      TRANSFER: String(item.TRANSFER) === "true" ? 1 : 0,
      created: item.created,
      updated: item.updated
    }));
  };