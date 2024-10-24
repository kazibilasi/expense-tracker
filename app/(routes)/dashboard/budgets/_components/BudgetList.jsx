"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
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
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id))
      
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
    <div className="mt-7 ">
      <div className="gap-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget refreshData={() => getBudgetList()}></CreateBudget>

        {budgetList?.length > 0
          ? budgetList.map((budget, index) => {
              return <BudgetItem budget={budget} key={index} />;
            })
          : [1, 2, 3, 4, 5, ].map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
                ></div>
              );
            })}
      </div>
    </div>
  );
};
export default BudgetList;
