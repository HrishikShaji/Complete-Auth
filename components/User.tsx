"use client";
import { useAppSelector } from "@/redux/store";
import { signOut } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";

const User = () => {
  const userId = useAppSelector((state) => state.authReducer.id);

  const { data, isLoading, isSuccess } = useQuery(
    ["user"],
    async () => {
      console.log("ran");
      return await fetch(`/api/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((response) => response.json());
    },
    { enabled: !!userId }
  );

  return (
    <div className="w-1/2 h-1/2 p-10 rounded-3xl bg-gray-500 flex flex-col justify-center items-center gap-4">
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          <div className="flex flex-col items-center font-semibold">
            <h1>{data.name}</h1>
            <h1>{data.email}</h1>
          </div>
          <button
            className="px-3 py-2 rounded-md bg-white text-black"
            onClick={() => signOut()}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
};

export default User;
