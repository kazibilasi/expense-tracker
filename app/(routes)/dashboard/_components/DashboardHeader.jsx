import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  return <div className="flex justify-between items-center p-5 shadow-sm border-b ">
    <div>
      search bar
    </div>
    <div>
      <UserButton></UserButton>
    </div>
  </div>;
};

export default DashboardHeader;
