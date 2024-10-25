"use client";

import { SignIn, useUser } from '@clerk/nextjs';

export default function Page() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return null; // User will be redirected by Clerk
  }

  return (
    <div className="flex items-center justify-center h-screen"> {/* Centering the SignIn component */}
      <SignIn redirectUrl="/dashboard/budgets" />
    </div>
  );
}
