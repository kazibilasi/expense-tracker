import React from "react";

export const BudgetItem = ({ budget }) => {
  return (
    <div className="p-5 border rounded-r-lg">
      <div className="flex gap-2 items-center justify-between" >
        <div className="flex gap-2 items-center">
          <h2 className="p-3 text-2xl  bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2>{budget.name}</h2>
            <h2>{budget.totalItem}</h2>
          </div>
        </div>
        <h2>${budget.amount}</h2>
      </div>
    </div>
  );
};
