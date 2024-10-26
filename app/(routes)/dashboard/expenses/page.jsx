// UserExpensesContainer.js
"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { Expenses, Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import ExpenseListTable from "./_components/ExpenseListTable";


const UserExpensesContainer = () => {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);

  // Fetch expenses for the logged-in user
  const getUserExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)); // Filter by user
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching user expenses:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUserExpenses();
    }
  }, [user]);

  return(
    <div  className=" p-6">
       <ExpenseListTable expensesList={expensesList} refreshData={getUserExpenses} />
    </div>
  );
};

export default UserExpensesContainer;
