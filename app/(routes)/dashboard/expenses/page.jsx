"use client";

import { db } from "@/utils/dbConfig";
import ExpenseListTable from "./_components/ExpenseListTable";
import { useEffect, useState } from "react";
import { Expenses } from "@/utils/schema";

const Page = () => {
  const [expensesList, setExpensesList] = useState([]);

  const refreshData = async () => {
    try {
      const result = await db
        .select()
        .from(Expenses);
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className=" p-5">
      <h1>Expense Management</h1>
      <ExpenseListTable expensesList={expensesList} refreshData={refreshData} />
    </div>
  );
};

export default Page;
