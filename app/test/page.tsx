"use client";
import User from "@/components/User";
import useAuth from "@/hooks/useAuth";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const page = () => {
  const { isLoading } = useAuth();

  return (
    <div>{isLoading ? <ClipLoader size={20} color="white" /> : <User />}</div>
  );
};

export default page;
