"use client"
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SideNav = () => {

  const menuList=[
   {
    id:1,
    name:'Dashboard',
    icon: LayoutGrid,
    path: '/dashboard'
   },
   {
    id:2,
    name: 'Budgets',
    icon: PiggyBank,
    path: '/dashboard/budgets'
   },
   {
    id:3,
    name:'Expenses',
    icon: ReceiptText,
    path: '/dashboard/expenses'
   },
   {
    id:4,
    name:'Upgrade',
    icon:ShieldCheck,
    path: '/dashboard/upgrade'
   }
  ]

  const path = usePathname()
  

  return <div className="h-screen">
    <img className=" p-4" src={'./logo.svg'} alt="" />

    <div>
    {
      menuList.map((menu,index)=>(
        <Link href={menu.path}><h2 className={`flex gap-2 items-center font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${path===menu.path && 'text-primary bg-blue-100'}`} key={index}><menu.icon></menu.icon>{menu?.name}</h2></Link>
        
      ))
    }
    </div>
    <div className="fixed bottom-10 p-5 flex gap-2 items-center">
      <UserButton></UserButton>
      profile
    </div>
  </div>;
};

export default SideNav;
