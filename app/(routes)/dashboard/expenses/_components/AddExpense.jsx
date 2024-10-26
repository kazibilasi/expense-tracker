import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import moment from "moment/moment";
import React, { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const AddExpense = ({ budgetId, refreshData }) => {
  const { user } = useUser();
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        id: uuidv4(),
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/YYY"),
      })
      .returning({ insertedId: Budgets?.id });

    setAmount("");
    setName("");

    if (result) {
      setLoading(false);
      refreshData();
      toast("New expenses added");
    }
    setLoading(false);
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense name</h2>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Bedroom Decor"
        ></Input>
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expnese Amount</h2>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 1000"
        ></Input>
      </div>
      <Button
        onClick={() => addNewExpense()}
        disabled={!(name && amount) || loading }
        className="mt-3 w-full"
      >
        {loading ? (
          <Loader className=" animate-pulse"></Loader>
        ) : (
          "Add New Expense"
        )}
      </Button>
    </div>
  );
};

export default AddExpense;
