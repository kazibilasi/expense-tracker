"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { BudgetItem } from "./BudgetItem";

const BudgetList = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

  // ------to get budget list--------

  const getBudgetList = async () => {
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
        .groupBy(Budgets.id);
      console.log(result);
      setBudgetList(result);
      return result;
    } catch (error) {
      console.error("Error fetching budget list:", error); // Error handling
    }
  };

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateBudget></CreateBudget>
        <div >
          {budgetList.map((budget, index) => {
            return <BudgetItem budget={budget} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default BudgetList;
