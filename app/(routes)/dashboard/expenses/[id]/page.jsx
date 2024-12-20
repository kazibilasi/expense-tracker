"use client";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { BudgetItem } from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";
import { useRouter } from "next/navigation";

const ExpensesScreen = ({ params }) => {
  const [budgetInfo, setBudgetInfo] = useState(null);
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter()

  // Get budget information and expenses once the user is available
  useEffect(() => {
    if (user) {
      getBudgetInfo();
      getExpensesList();
    }
  }, [user]);

  // Fetch the budget information
  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id)) // Use params.id directly
        .groupBy(Budgets.id);

      setBudgetInfo(result[0]);
      getExpensesList()
    } catch (error) {
      console.error("Error fetching budget info:", error);
    }
  };

  // Fetch the list of expenses
  const getExpensesList = async () => {
    try {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, params.id)); // Use params.id directly
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Delete the budget
  const deleteBudget = async () => {
    try {
      const deleteExpense = await db
        .delete(Expenses)
        .where(eq(Expenses.budgetId, params.id)).returning(); // Use params.id directly
        
      if (deleteExpense) {
       const result = await db.delete(Budgets)
       .where(eq(Budgets.id,params.id))
        .returning();
      }
      toast('Budget Deleted!')
      route.replace('/dashboard/budgets')
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex gap-2">
          {budgetInfo && (
            <EditBudget
              refreshData={getBudgetInfo}
              budgetInfo={budgetInfo}
            />
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense refreshData={getBudgetInfo} budgetId={params.id} />
      </div>

      <div className="mt-5">
       
        <ExpenseListTable
          refreshData={getBudgetInfo}
          expensesList={expensesList}
        />
      </div>
    </div>
  );
};

export default ExpensesScreen;
