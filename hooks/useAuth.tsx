"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/slices/authSlice";

const useAuth = () => {
  const session = useSession();
  const dispatch = useDispatch();

  if (session && session.data?.user) {
    const data = {
      id: session.data.user as string,
      authenticated: true,
    };
    dispatch(logIn(data));
  }

  const isLoading: boolean = session.status === "loading" ? true : false;
  return { isLoading };
};

export default useAuth;
