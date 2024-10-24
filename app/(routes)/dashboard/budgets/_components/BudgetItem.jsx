import Link from "next/link";
import React from "react";

export const BudgetItem = ({ budget }) => {
 
  const calculateProgressPerc = () => {
    
    const amount = parseFloat(budget?.amount);
    const perc = (budget?.totalSpend / amount) * 100;
    return perc.toFixed(2);
  };

  return (
    <Link
      href={"/dashboard/expenses/" + budget?.id}
      className=" p-5 border rounded-r-lg hover:shadow-md cursor-pointer h-[170px]"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="p-3 text-2xl  bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget?.name}</h2>
            <h2 className="text-sm text-gray-500">{budget?.totalItem}</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budget?.amount}</h2>
      </div>

      <div className="mt-5">
        <div className="flex justify-between mb-2 ">
          <h2 className="text-xs  text-slate-400">
            ${budget?.totalSpend ? budget?.totalSpend : 0}Spend
          </h2>
          <h2 className="text-xs text-slate-400">
            ${budget?.amount - budget?.totalSpend} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className=" bg-primary h-2 rounded-full"
            style={{
              width: `${calculateProgressPerc()}%`,
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};
