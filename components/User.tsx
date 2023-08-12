"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const User = () => {
  const session = useSession();

  const { data, isLoading, isSuccess } = useQuery(["user"], async () => {
    return await fetch(`/api/user/${session?.data?.user}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  });

  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return (
    <div className="w-1/2 h-1/2 p-10 rounded-3xl bg-gray-500 flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col items-center font-semibold">
        <h1>{data.name}</h1>
        <h1>{data.email}</h1>
      </div>
      <button
        className="px-3 py-2 rounded-md bg-white text-black"
        onClick={() => signOut()}>
        Log Out
      </button>
    </div>
  );
};

export default User;
