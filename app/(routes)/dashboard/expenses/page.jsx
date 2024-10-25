'use client';

import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import ExpenseListTable from "./_components/ExpenseListTable";

const ExpensesPage = () => {
  const { user, isLoaded } = useUser(); // isLoaded ensures user is ready
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getExpensesList = async () => {
    if (!user?.id) {
      console.log("User ID not available");
      return;
    }

    try {
      console.log("Fetching expenses for user ID:", user.id);
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.userId, user.id)); // Check if Expenses.userId matches the user.id

      console.log("Expenses data fetched:", result);
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      console.log("User loaded:", user); // Debug log for user
      getExpensesList(); // Fetch data only when the user is loaded and available
    } else {
      console.log("User not loaded or unavailable");
    }
  }, [isLoaded, user]); // Make sure user is loaded before fetching data

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <p>Loading...</p>
      ) : expensesList.length > 0 ? (
        <ExpenseListTable expensesList={expensesList} refreshData={getExpensesList} />
      ) : (
        <p>No expenses found for this user.</p> // Handle case when no expenses are found
      )}
    </div>
  );
};

export default ExpensesPage;
