"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, sql } from "drizzle-orm";
import BarChartDashboard from "./_components/BarChartDashboard";
import { BudgetItem } from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  const getBudgetList = async () => {
    try {
      const result = await db
        .select({
          id: Budgets.id,
          name: Budgets.name,
          createdBy: Budgets.createdBy,
          amount: Budgets.amount,
          // Using COALESCE to replace null with 0 for totalSpend
          totalSpend:
            sql`COALESCE(SUM(CAST(${Expenses.amount} AS NUMERIC)))`.mapWith(
              Number
            ),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
      getAllExpenses();
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  /***
   * Used to get All expenses
   * ***/
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress));
    setExpensesList(result);
  };

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName} ✌️</h2>
      <p className="text-gray-500">
        Here's what's happening with your money. Let's manage your expenses.
      </p>
      {budgetList.length > 0 ? (
        <CardInfo budgetList={budgetList} />
      ) : (
        <p>No budgets found.</p> // Gracefully handle empty budget list
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-5 gap-5">
        <div className="col-span-2">
          <BarChartDashboard budgetList={budgetList}></BarChartDashboard>
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          ></ExpenseListTable>
        </div>

        <div className="grid gap-5">
          <h2 className="font-bold text-2xl">Latest Budgets</h2>
          {budgetList?.map((budget, index) => (
            <BudgetItem key={index} budget={budget}></BudgetItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
