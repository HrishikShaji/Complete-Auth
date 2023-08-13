import AuthForm from "@/components/AuthForm";
import React from "react";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <>
      <Toaster />
      <div className="h-screen w-full bg-neutral-900 flex justify-center items-center ">
        <AuthForm />
      </div>
    </>
  );
};

export default page;
