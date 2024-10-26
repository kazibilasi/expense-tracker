import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          Manage Your Expense.
          <strong className="font-extrabold text-primary block mt-1 sm:mt-0">
            Control Your Money.
          </strong>
        </h1>

        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600">
          Start managing your money and save a ton of money.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full sm:w-auto rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring active:bg-primary"
            href="/sign-in"
          >
            Get Started
          </a>
        </div>
      </div>

      <div className="mt-8 w-full flex justify-center">
        <Image
          width={1100}
          height={1000}
          src="/dashboard.png"
          alt="Dashboard"
          className="object-cover w-full max-w-3xl sm:max-w-2xl md:max-w-xl lg:max-w-lg xl:max-w-3xl"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default Hero;
