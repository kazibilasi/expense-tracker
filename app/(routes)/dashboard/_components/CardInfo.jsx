import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardInfo = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    const CalculateCardInfo = () => {
      let totalBudget_ = 0;
      let totalSpend_ = 0;

      budgetList.forEach((element) => {
        totalBudget_ += Number(element.amount);
        totalSpend_ += Number(element.totalSpend); // Ensure totalSpend is a number
      });

      setTotalBudget(totalBudget_);
      setTotalSpend(totalSpend_);
    };

    CalculateCardInfo(); // Call CalculateCardInfo inside useEffect
  }, [budgetList]); // Recalculate if budgetList changes

  return (
    <div>
      {budgetList?.length>0? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">{totalBudget}</h2>
            </div>
            <PiggyBank className="bg-primary text-white p-3 h-12 w-12 rounded-full text-2xl" />
          </div>

          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">{totalSpend}</h2>
            </div>
            <ReceiptText className="bg-primary text-white p-3 h-12 w-12 rounded-full text-2xl" />
          </div>

          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-sm">No. Of Budget</h2>
              <h2 className="font-bold">{budgetList.length}</h2>
            </div>
            <Wallet className="bg-primary text-white p-3 h-12 w-12 rounded-full text-2xl" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div className="h-[160px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;