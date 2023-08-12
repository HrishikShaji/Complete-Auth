"use client";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import User from "@/components/User";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth");
    }
  }, [session]);

  if (session.status === "loading") return <div>loading...</div>;
  return (
    <main className="flex min-h-screen bg-neutral-900 flex-col items-center justify-center p-10">
      <User />
    </main>
  );
}
