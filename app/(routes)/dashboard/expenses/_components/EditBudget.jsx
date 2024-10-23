"use client";

import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const EditBudget = ({ budgetInfo, refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);
  const { user } = useUser();

  const onUpdateBudget = async () => {
    try {
      const result = await db
        .update(Budgets)
        .set({
          name: name,
          amount: amount,
          icon: emojiIcon,
        })
        .where(eq(Budgets.id, budgetInfo?.id))
        .returning();
      if (result) {
        refreshData();
        toast("Budget Updated");
      }
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PenBox /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Budget</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <Button
                variant="outline"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
            </div>
            {openEmojiPicker && (
              <div className="mt-2">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <h2 className="text-black font-medium my-1">Budget Name</h2>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Home Decor"
            value={name || ""}
          />
        </div>
        <div className="mt-2">
          <h2 className="text-black font-medium my-1">Budget Amount</h2>
          <Input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 5000$"
            value={amount || ""}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={!(name && amount)}
              onClick={() => onUpdateBudget()}
              type="submit"
            >
              Update Budget
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudget;
