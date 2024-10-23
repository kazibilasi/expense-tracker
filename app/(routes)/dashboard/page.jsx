"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, sql } from "drizzle-orm";

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

  const getBudgetList = async () => {
    try {
      const result = await db
        .select({
          id: Budgets.id,
          name: Budgets.name,
          createdBy: Budgets.createdBy,
          amount: Budgets.amount,
          // Using COALESCE to replace null with 0 for totalSpend
          totalSpend: sql`COALESCE(SUM(CAST(${Expenses.amount} AS NUMERIC)))`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User data:", user); // For debugging user object
      getBudgetList();
    }
  }, [user]);

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">
        Hi, {user?.fullName} ✌️
      </h2>
      <p className="text-gray-500">
        Here's what's happening with your money. Let's manage your expenses.
      </p>
      {budgetList.length > 0 ? (
        <CardInfo budgetList={budgetList} />
      ) : (
        <p>No budgets found.</p> // Gracefully handle empty budget list
      )}
    </div>
  );
};

export default Dashboard;
