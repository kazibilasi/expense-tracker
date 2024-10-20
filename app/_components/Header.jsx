"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <img src={"./logo.svg"} alt="" />

      {isSignedIn ? <UserButton></UserButton> :  <Link href={'/sign-in'}><Button>Get Started</Button></Link> }
    </div>

   
  );
};

export default Header;
