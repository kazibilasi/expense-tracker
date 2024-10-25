"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, Menu, PiggyBank, ReceiptText } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link"; // Import Link to navigate to different routes

const DashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid, // Make sure to import this icon
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank, // Make sure to import this icon
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText, // Make sure to import this icon
      path: "/dashboard/expenses",
    },
  ];

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle the menu visibility
  };

  return (
    <div className="flex justify-end items-center p-5 gap-5 shadow-sm border-b">
      
      <Menu className="lg:hidden md:hidden cursor-pointer" onClick={toggleMenu} />
      {menuOpen && (
        <div className="absolute right-5 top-16 bg-white shadow-md rounded-md z-10">
          {menuList.map((item) => (
            <Link key={item.id} href={item.path}>
              <div className="flex items-center p-3 hover:bg-gray-100">
                <item.icon className="mr-2" />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
