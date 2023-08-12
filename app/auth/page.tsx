"use client";
import AuthForm from "@/components/AuthForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  if (session.status === "loading") return <div>loading...</div>;
  return (
    <div className="h-screen w-full bg-neutral-900 flex justify-center items-center ">
      <AuthForm />
    </div>
  );
};

export default page;
