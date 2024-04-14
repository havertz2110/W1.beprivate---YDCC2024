import * as React from "react"
import {
  ColumnDef,
} from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { TransactionCollection, TransactionHighlight, TransactionResult } from "@/lib/transaction-template"

export const columns: ColumnDef<TransactionCollection>[] = [
    {
       id: "select",
       header: ({ table }) => (
         <Checkbox
           checked={
             table.getIsAllPageRowsSelected() ||
             (table.getIsSomePageRowsSelected() && "indeterminate")
           }
           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
           aria-label="Select all"
         />
       ),
       cell: ({ row }) => (
         <Checkbox
           checked={row.getIsSelected()}
           onCheckedChange={(value) => row.toggleSelected(!!value)}
           aria-label="Select row"
         />
       ),
       enableSorting: false,
       enableHiding: false,
    },
    {
       accessorKey: "id",
       header: "ID",
       cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
       accessorKey: "step",
       header: "Step",
       cell: ({ row }) => <div>{row.getValue("step")}</div>,
    },
    {
       accessorKey: "amount",
       header: "Amount",
       cell: ({ row }) => {
         const amount = parseFloat(row.getValue("amount"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(amount);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
    {
       accessorKey: "oldbalanceOrig",
       header: "Old Balance Orig",
       cell: ({ row }) => {
         const balance = parseFloat(row.getValue("oldbalanceOrig"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(balance);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
    {
       accessorKey: "oldbalanceDest",
       header: "Old Balance Dest",
       cell: ({ row }) => {
         const balance = parseFloat(row.getValue("oldbalanceDest"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(balance);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
    {
       accessorKey: "trans_frequency_Dest",
       header: "Trans Frequency Dest",
       cell: ({ row }) => <div>{row.getValue("trans_frequency_Dest")}</div>,
    },
    {
       accessorKey: "avg_trans_amount_Dest",
       header: "Avg Trans Amount Dest",
       cell: ({ row }) => {
         const amount = parseFloat(row.getValue("avg_trans_amount_Dest"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(amount);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
    {
       accessorKey: "variability_trans_amount_Dest",
       header: "Variability Trans Amount Dest",
       cell: ({ row }) => {
         const amount = parseFloat(row.getValue("variability_trans_amount_Dest"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(amount);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
    {
       accessorKey: "big_trans_flag",
       header: "Big Trans Flag",
       cell: ({ row }) => <div>{row.getValue("big_trans_flag") ? "Yes" : "No"}</div>,
    },
    {
       accessorKey: "zero_new_balance_Dest_flag",
       header: "Zero New Balance Dest Flag",
       cell: ({ row }) => <div>{row.getValue("zero_new_balance_Dest_flag") ? "Yes" : "No"}</div>,
    },
    {
       accessorKey: "zero_new_balance_Orig_flag",
       header: "Zero New Balance Orig Flag",
       cell: ({ row }) => <div>{row.getValue("zero_new_balance_Orig_flag") ? "Yes" : "No"}</div>,
    },
    {
       accessorKey: "collectionId",
       header: "Collection ID",
       cell: ({ row }) => <div>{row.getValue("collectionId")}</div>,
    },
    {
       accessorKey: "collectionName",
       header: "Collection Name",
       cell: ({ row }) => <div>{row.getValue("collectionName")}</div>,
    },
    {
        accessorKey: "CASH_IN",
        header: "CASH IN",
        cell: ({ row }) => <div className="text-right font-medium">{row.getValue("CASH_IN") ? "Yes" : "No"}</div>,
    },
    {
        accessorKey: "CASH_OUT",
        header: "CASH OUT",
        cell: ({ row }) => <div className="text-right font-medium">{row.getValue("CASH_OUT") ? "Yes" : "No"}</div>,
    },
    {
        accessorKey: "DEBIT",
        header: "DEBIT",
        cell: ({ row }) => <div className="text-right font-medium">{row.getValue("DEBIT") ? "Yes" : "No"}</div>,
    },
    {
        accessorKey: "TRANSFER",
        header: "TRANSFER",
        cell: ({ row }) => <div className="text-right font-medium">{row.getValue("TRANSFER") ? "Yes" : "No"}</div>,
    },
    {
       accessorKey: "created",
       header: "Created",
       cell: ({ row }) => <div>{new Date(row.getValue("created")).toLocaleDateString()}</div>,
    },
    {
       accessorKey: "updated",
       header: "Updated",
       cell: ({ row }) => <div>{new Date(row.getValue("updated")).toLocaleDateString()}</div>,
    },
];

export const resulst_columns: ColumnDef<TransactionResult>[] = [
  {
     id: "select",
     header: ({ table }) => (
       <Checkbox
         checked={
           table.getIsAllPageRowsSelected() ||
           (table.getIsSomePageRowsSelected() && "indeterminate")
         }
         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
         aria-label="Select all"
       />
     ),
     cell: ({ row }) => (
       <Checkbox
         checked={row.getIsSelected()}
         onCheckedChange={(value) => row.toggleSelected(!!value)}
         aria-label="Select row"
       />
     ),
     enableSorting: false,
     enableHiding: false,
  },
  {
     accessorKey: "id",
     header: "ID",
     cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "Fraud",
    header: "Fraud",
    cell: ({ row }) => <div>{row.getValue("Fraud") ? "Yes" : "No"}</div>,
 },
  {
     accessorKey: "step",
     header: "Step",
     cell: ({ row }) => <div>{row.getValue("step")}</div>,
  },
  {
     accessorKey: "amount",
     header: "Amount",
     cell: ({ row }) => {
       const amount = parseFloat(row.getValue("amount"));
       const formatted = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
       }).format(amount);
       return <div className="text-right font-medium">{formatted}</div>;
     },
  },
  {
     accessorKey: "oldbalanceOrig",
     header: "Old Balance Orig",
     cell: ({ row }) => {
       const balance = parseFloat(row.getValue("oldbalanceOrig"));
       const formatted = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
       }).format(balance);
       return <div className="text-right font-medium">{formatted}</div>;
     },
  },
  {
     accessorKey: "oldbalanceDest",
     header: "Old Balance Dest",
     cell: ({ row }) => {
       const balance = parseFloat(row.getValue("oldbalanceDest"));
       const formatted = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
       }).format(balance);
       return <div className="text-right font-medium">{formatted}</div>;
     },
  },
  {
     accessorKey: "trans_frequency_Dest",
     header: "Trans Frequency Dest",
     cell: ({ row }) => <div>{row.getValue("trans_frequency_Dest")}</div>,
  },
  {
     accessorKey: "avg_trans_amount_Dest",
     header: "Avg Trans Amount Dest",
     cell: ({ row }) => {
       const amount = parseFloat(row.getValue("avg_trans_amount_Dest"));
       const formatted = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
       }).format(amount);
       return <div className="text-right font-medium">{formatted}</div>;
     },
  },
  {
     accessorKey: "variability_trans_amount_Dest",
     header: "Variability Trans Amount Dest",
     cell: ({ row }) => {
       const amount = parseFloat(row.getValue("variability_trans_amount_Dest"));
       const formatted = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
       }).format(amount);
       return <div className="text-right font-medium">{formatted}</div>;
     },
  },
  {
     accessorKey: "big_trans_flag",
     header: "Big Trans Flag",
     cell: ({ row }) => <div>{row.getValue("big_trans_flag") ? "Yes" : "No"}</div>,
  },
  {
     accessorKey: "zero_new_balance_Dest_flag",
     header: "Zero New Balance Dest Flag",
     cell: ({ row }) => <div>{row.getValue("zero_new_balance_Dest_flag") ? "Yes" : "No"}</div>,
  },
  {
     accessorKey: "zero_new_balance_Orig_flag",
     header: "Zero New Balance Orig Flag",
     cell: ({ row }) => <div>{row.getValue("zero_new_balance_Orig_flag") ? "Yes" : "No"}</div>,
  },
  {
      accessorKey: "CASH_IN",
      header: "CASH IN",
      cell: ({ row }) => <div className="text-right font-medium">{row.getValue("CASH_IN") ? "Yes" : "No"}</div>,
  },
  {
      accessorKey: "CASH_OUT",
      header: "CASH OUT",
      cell: ({ row }) => <div className="text-right font-medium">{row.getValue("CASH_OUT") ? "Yes" : "No"}</div>,
  },
  {
      accessorKey: "DEBIT",
      header: "DEBIT",
      cell: ({ row }) => <div className="text-right font-medium">{row.getValue("DEBIT") ? "Yes" : "No"}</div>,
  },
  {
      accessorKey: "TRANSFER",
      header: "TRANSFER",
      cell: ({ row }) => <div className="text-right font-medium">{row.getValue("TRANSFER") ? "Yes" : "No"}</div>,
  },
  {
     accessorKey: "created",
     header: "Created",
     cell: ({ row }) => <div>{new Date(row.getValue("created")).toLocaleDateString()}</div>,
  },
  {
     accessorKey: "updated",
     header: "Updated",
     cell: ({ row }) => <div>{new Date(row.getValue("updated")).toLocaleDateString()}</div>,
  },
];


export const hightlight_columns: ColumnDef<TransactionHighlight>[] = [
    {
       id: "select",
       header: ({ table }) => (
         <Checkbox
           checked={
             table.getIsAllPageRowsSelected() ||
             (table.getIsSomePageRowsSelected() && "indeterminate")
           }
           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
           aria-label="Select all"
         />
       ),
       cell: ({ row }) => (
         <Checkbox
           checked={row.getIsSelected()}
           onCheckedChange={(value) => row.toggleSelected(!!value)}
           aria-label="Select row"
         />
       ),
       enableSorting: false,
       enableHiding: false,
    },
    {
       accessorKey: "id",
       header: "ID",
       cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
       accessorKey: "step",
       header: "Step",
       cell: ({ row }) => <div>{row.getValue("step")}</div>,
    },
    {
       accessorKey: "amount",
       header: "Amount",
       cell: ({ row }) => {
         const amount = parseFloat(row.getValue("amount"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(amount);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
    {
       accessorKey: "oldbalanceOrig",
       header: "Old Balance Orig",
       cell: ({ row }) => {
         const balance = parseFloat(row.getValue("oldbalanceOrig"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(balance);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
    {
       accessorKey: "oldbalanceDest",
       header: "Old Balance Dest",
       cell: ({ row }) => {
         const balance = parseFloat(row.getValue("oldbalanceDest"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(balance);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
    {
       accessorKey: "avg_trans_amount_Dest",
       header: "Avg Trans Amount Dest",
       cell: ({ row }) => {
         const amount = parseFloat(row.getValue("avg_trans_amount_Dest"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(amount);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
    {
       accessorKey: "variability_trans_amount_Dest",
       header: "Variability Trans Amount Dest",
       cell: ({ row }) => {
         const amount = parseFloat(row.getValue("variability_trans_amount_Dest"));
         const formatted = new Intl.NumberFormat("en-US", {
           style: "currency",
           currency: "USD",
         }).format(amount);
         return <div className="text-right font-medium">{formatted}</div>;
       },
    },
   
];