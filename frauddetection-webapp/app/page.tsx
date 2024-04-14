"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import Papa from 'papaparse';

import { DataTableHighLight } from '@/components/DataTableHighlight';
import { DataTableResults } from '@/components/DataTableResults';
import { useRouter } from 'next/navigation'

import PocketBase, {RecordModel} from 'pocketbase';
import { TransactionHighlight, TransactionCollection, TransactionResult } from '@/lib/transaction-template';
const pb = new PocketBase('http://127.0.0.1:8090');

const convertToTransactionHighlight = (data: TransactionCollection[]): TransactionHighlight[] => {
  return data.map(item => ({
     id: item.id,
     amount: item.amount,
     oldbalanceOrig: item.oldbalanceOrig,
     oldbalanceDest: item.oldbalanceDest,
     avg_trans_amount_Dest: item.avg_trans_amount_Dest,
     variability_trans_amount_Dest: item.variability_trans_amount_Dest,
  }));
 };

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

const convertToTransactionResultArray = (array: any[]): TransactionResult[] => {
  return array.map((item, index) => {
     return {
       id: item.id, 
       Fraud: item.Fraud, 
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
       CASH_IN: item.CASH_IN,
       CASH_OUT: item.CASH_OUT,
       DEBIT: item.DEBIT,
       TRANSFER: item.TRANSFER, 
       created: item.created,
       updated: item.updated, 
     };
  });
 };

 // Define the interface for the data structure returned by getData
 interface DataResult {
  collection: TransactionCollection[];
  highlight: TransactionHighlight[];
 }

// Assuming getData is a function that fetches your data
async function getData(): Promise<DataResult> {
  try {
     // Replace this with your actual data fetching logic
     const listResult = await pb.collection('transactions').getList(1, 80);
     const transactionsCollection: TransactionCollection[] = convertToTransactionCollection(listResult.items);
     const transactionHighlight: TransactionHighlight[] = convertToTransactionHighlight(transactionsCollection);
     return { collection: transactionsCollection, highlight: transactionHighlight };
  } catch (error) {
     console.error('Failed to fetch transactions:', error);
     throw error; // Throw the error to be caught in the calling function
  }
 }


 export default function Dashboard() {
  const [data, setData] = useState<TransactionHighlight[]>([]);
  const [dataCollection, setDataCollection] = useState<TransactionCollection[]>([]);
  const [dataResult, setDataResult] = useState<TransactionResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedRows, setSelectedRows] = useState<TransactionCollection[]>([]);
  const [explaination, setExplaination] = useState('')

  const router = useRouter();

  const handleSelectionChange = (newSelectedRows: TransactionHighlight[]) => {
   // Assuming dataCollection is your source of truth for TransactionCollection
      const selectedCollectionRows = newSelectedRows.map((highlightRow: TransactionHighlight) => {
        return dataCollection.find(collectionRow => collectionRow.id === highlightRow.id);
      }).filter(row => row !== undefined); // Filter out undefined values

      // Update state only if the new selection is different from the current selection
      if (JSON.stringify(selectedCollectionRows) !== JSON.stringify(selectedRows)) {
        setSelectedRows(selectedCollectionRows);
      }
   };

   const handleTransferExplainResult = () => {
      localStorage.setItem('explaination', explaination)
      router.push(`/explain`);
   }

 
  useEffect(() => {
     const fetchData = async () => {
       try {
         const result = await getData(); // Fetch the data

         setData(result.highlight); // Set the fetched data in the state
         setDataCollection(result.collection); // Correctly set the collection data
       } catch (error) {
         console.error('Failed to fetch data:', error);
         // Optionally handle the error
       }
     };
 
     fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Only trigger the click event if the ref is not null
    }
  };

  const uploadToDatabase = async (results: any[]) => {
    // Start the loop from index 1 to skip the header
    for (let i = 1; i < results.length; i++) {
      const rowData = results[i]; // Get the array at the current index
  
      // Check if rowData is an array and has more than one element
      if (Array.isArray(rowData) && rowData.length > 1) {
        // Extract attributes from the rowData array
        const [step, amount, oldbalanceOrig, oldbalanceDest, trans_frequency_Dest, avg_trans_amount_Dest, variability_trans_amount_Dest, big_trans_flag, zero_new_balance_Dest_flag, zero_new_balance_Orig_flag, CASH_IN, CASH_OUT, DEBIT, TRANSFER] = rowData;
  
        // Construct the data object for the record
        const data = {
          step: parseInt(step),
          amount: parseInt(amount),
          oldbalanceOrig: parseInt(oldbalanceOrig),
          oldbalanceDest: parseInt(oldbalanceDest),
          trans_frequency_Dest: parseInt(trans_frequency_Dest),
          avg_trans_amount_Dest: parseInt(avg_trans_amount_Dest),
          variability_trans_amount_Dest: parseInt(variability_trans_amount_Dest),
          big_trans_flag: big_trans_flag === 'true', // Convert to boolean
          zero_new_balance_Dest_flag: zero_new_balance_Dest_flag === 'true', // Convert to boolean
          zero_new_balance_Orig_flag: zero_new_balance_Orig_flag === 'true', // Convert to boolean
          CASH_IN: CASH_IN === 'true', // Convert to boolean
          CASH_OUT: CASH_OUT === 'true', // Convert to boolean
          DEBIT: DEBIT === 'true', // Convert to boolean
          TRANSFER: TRANSFER === 'true', // Convert to boolean
        };
  
        try {
          // Create a new record using PocketBase
          const record = await pb.collection('transactions').create(data);
          console.log("Record created:", record);
        } catch (error) {
          console.error("Error creating record:", error);
          // Handle error if record creation fails
        }
      }
    }
  };

  // Function to handle the button click
  const handleAuditWithML = async () => {

    console.log(JSON.stringify(selectedRows))
    try {
       const response = await fetch('http://127.0.0.1:8000/api/transactions/predict', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(selectedRows), // Convert selected rows to JSON
       });
   
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
   
       const data = await response.json();

       if(data) {
        const audit_result = convertToTransactionResultArray(data.preds)
        console.log(audit_result)
        setDataResult(audit_result);
        setExplaination(data.explain)
       }

       console.log('Success:');
       // Handle the response data as needed
    } catch (error) {
       console.error('Error:', error);
       // Handle the error as needed
    }
   };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
  
    Papa.parse(file, {
        complete: function (results) {
        console.log("Finished parsing:");
  
        try {
          uploadToDatabase(results.data)

        } catch (error) {
          console.error(error); // Handle error
        }
      }
    });
  };
  return (
    <main className="relative flex min-h-screen flex-col">
      <div className="w-full">
        <div className="flex h-screen overflow-auto">
          <div className="flex-1 flex flex-col min-h-[640px]">
            <div className="grid grid-cols-4 gap-4 p-2">
            </div>
            <div className="my-2 grid grid-cols-2 gap-4 px-6">
              <Card className="col-span-1 p-4 shadow-lg rounded-lg">
                <h2 className="text-lg font-bold mb-4">Transactions Data</h2>
                <div className="container mx-auto max-h-[500px] overflow-auto">
                  <DataTableHighLight data={data} onSelectionChange={handleSelectionChange}/>
                </div>
              </Card>
              <Card className="col-span-1 p-4 shadow-lg rounded-lg">
                <h2 className="text-lg font-bold mb-4">Row Details</h2>
                <p className="mb-2">Something here</p>
                {/* Placeholder for recent sales list */}
                <div className="h-36 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">No rows selected.</span>
                </div>
              </Card>
            </div>
            <div className="my-4 grid grid-cols-1 gap-4 px-6">
              <Card className="col-span-1 p-4 shadow-lg rounded-lg w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Audit Results</h2>
                  <div>
                  <Button
                    className='bg-blue-500 text-white mx-1'
                    onClick={handleImportClick}
                  >
                    Import CSV
                  </Button>
                  <Button
                    className='bg-red-500 text-white mx-1'
                    onClick={handleAuditWithML}
                  >
                      Audit with ML
                    </Button>

                    <Button
                    className='bg-green-500 text-white mx-1'
                    onClick={handleTransferExplainResult}
                  >
                      Explain Result
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <DataTableResults data={dataResult}/>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept=".csv"
        hidden
        ref={fileInputRef} // We'll use a ref to trigger the click event
        onChange={handleFileChange} // This function will handle the file selection
      />
    </main>
  );
}
