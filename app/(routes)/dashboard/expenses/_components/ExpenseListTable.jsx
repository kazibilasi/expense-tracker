import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExpenseListTable = ({ expensesList ,refreshData}) => {
  const deleteExpense =async (expense)=>{
      const result = await db.delete(Expenses).where(eq(
        Expenses.id,expense.id
      )).returning()
      if(result){
        refreshData()
        toast('Expnese Detelted!');
        
      }
  }
  return (
    <div className="mt-3">
      {/* Header row */}
      <div className="grid grid-cols-4 bg-slate-200 p-2 font-bold">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>

      {/* Expense list rows */}
      {expensesList.map((expenses, index) => (
        <div key={index} className="grid grid-cols-4 bg-white p-2 border-b">
          <h2>{expenses?.name}</h2>
          <h2>${parseFloat(expenses?.amount).toFixed(2)}</h2>
          <h2>{expenses?.createdAt}</h2>
          <h2>
            <button >
              <Trash onClick={()=>deleteExpense(expenses)}  className="text-red-600 hover:text-red-800" />
            </button>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
