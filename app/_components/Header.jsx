import { Button } from "@/components/ui/button";
import React from "react";

const Header = () => {
  return <div className="p-4 flex justify-between items-center shadow-md">
    <img src={'./logo.svg'} alt="" />
    <Button>
      Get Started
    </Button>
  </div>;
};

export default Header;
