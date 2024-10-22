"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const CreateBudget = ({refreshData}) => {
  const [emojiIcon, setEmojiIcon] = useState("Use Emoji");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();

 

  const onCreateBudget = async () => {
    try {
      const result = await db
        .insert(Budgets)
        .values({
          id: uuidv4(), // Generate a unique ID for the budget
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets.id });
  
      if (result.length > 0) {
        refreshData()
        toast("New Budget Added!");
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast("Failed to create budget. Please try again.");
    }
  };
  
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
              </div>
              <div className=" absolute z-20">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                ></EmojiPicker>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">Budget Name</h2>
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Home Decor"
            ></Input>
          </div>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">Budget Amount</h2>
            <Input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 5000$"
            ></Input>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateBudget()}
                type="submit"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
