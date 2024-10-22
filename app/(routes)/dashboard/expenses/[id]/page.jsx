"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { BudgetItem } from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";

const ExpensesScreen = ({ params }) => {
  const [budgetInfo, setBudgetInfo] = useState();
  const { user } = useUser();
  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);
  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          // Casting Expenses.amount to numeric to avoid issues with summing strings
          totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(
            Number
          ),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);

      setBudgetInfo(result[0]);
      // setBudgetList(result);
      // return result;
    } catch (error) {
      console.error("Error fetching budget list:", error); // Error handling
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo}></BudgetItem>
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense refreshData={()=>getBudgetInfo()} budgetId={params.id}></AddExpense>
      </div>
    </div>
  );
};

export default ExpensesScreen;
