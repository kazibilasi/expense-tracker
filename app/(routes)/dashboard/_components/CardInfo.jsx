import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect } from "react";

const CardInfo = ({ budgetList }) => {
  useEffect(()=>{
    CalculateCardInfo();
  },[])
  const CalculateCardInfo=()=>{
    console.log(budgetList)
  }
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      
      <div className="p-7 border rounded-lg flex justify-between items-center">
        <div>
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="font-bold text-2xl">$1500</h2>
        </div>
        <PiggyBank className="bg-primary text-white  p-3 h-12 w-12 rounded-full text-2xl"></PiggyBank>
      </div>
      <div className="p-7 border rounded-lg flex justify-between items-center">
        <div>
          <h2 className="text-sm">Total Spend</h2>
          <h2 className="font-bold text-2xl">$1500</h2>
        </div>
        <ReceiptText className="bg-primary text-white  p-3 h-12 w-12 rounded-full text-2xl"></ReceiptText>
      </div>
      <div className="p-7 border rounded-lg flex justify-between items-center">
        <div>
          <h2 className="text-sm">No. Of Budget</h2>
          <h2 className="font-bold text-2xl">$1500</h2>
        </div>
        <Wallet className="bg-primary text-white  p-3 h-12 w-12 rounded-full text-2xl"></Wallet>
      </div>
    </div>
  );
};

export default CardInfo;
