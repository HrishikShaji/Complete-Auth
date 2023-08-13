"use client";
import React from "react";
import User from "@/components/User";
import useAuth from "@/hooks/useAuth";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { isLoading } = useAuth();

  return (
    <>
      <Toaster />
      <main className="flex min-h-screen bg-neutral-900 flex-col items-center justify-center p-10">
        {isLoading ? <ClipLoader size={20} color="white" /> : <User />}
      </main>
    </>
  );
}
