import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
   

    <div className="mt-10">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Manage Your Expense.
          <strong className="font-extrabold text-primary sm:block">
            Control Your Money.
          </strong>
        </h1>

        <p className="mt-4 sm:text-xl/relaxed">
          Start managing your money and save a ton of money.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring active:bg-primary sm:w-auto"
            href="/sign-in"
          >
            Get Started
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full ">
        {" "}
        {/* Added -mt-[40px] and z-10 */}
        <Image
          width={1100}
          height={1000}
          src="/dashboard.png"
          alt="Dashboard"
          className="object-cover" // Optional: Ensures the image covers its container
        />
      </div>
    </div>
  );
};

export default Hero;
