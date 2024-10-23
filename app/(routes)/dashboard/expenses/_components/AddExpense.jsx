import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { root } from "postcss";
import React, { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

const AddExpense = ({ budgetId,refreshData }) => {
  const { user } = useUser();
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const addNewExpense = async () => {
    const result = await db.insert(Expenses).values({
      id: uuidv4(),
      name:name,
      amount:amount,
      budgetId:budgetId,
      createdAt:moment().format("DD/MM/YYY")
    }).returning({insertedId:Budgets?.id})
    console.log(result)
    if(result){
      refreshData()
      toast('New expenses added')
    }

    // try {
    //   const result = await db
    //     .insert(Expenses)
    //     .values({
    //       id: uuidv4(), // Generate a unique ID for the budget
    //       name:name,
    //       amount:amount,
    //       budgetId:budgetId,
    //       createdAt:user?.primaryEmailAddress?.emailAddress
    //     })
    //     .returning({ insertedId: Budgets?.id });

    //   if (result.length > 0) {
    //     refreshData();
    //     toast("New Budget Added!");
    //   }
    // } catch (error) {
    //   console.error("Error creating budget:", error);
    //   toast("Failed to create budget. Please try again.");
    // }

  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense name</h2>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Bedroom Decor"
        ></Input>
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expnese Amount</h2>
        <Input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 1000"
        ></Input>
      </div>
      <Button
        onClick={() => addNewExpense()}
        disabled={!(name && amount)}
        className="mt-3 w-full"
      >
        Add New Expense
      </Button>
    </div>
  );
};

export default AddExpense;
