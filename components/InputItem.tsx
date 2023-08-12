"use client";
import React, { ChangeEvent } from "react";

interface InputProps {
  inputs: Record<string, any>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: React.FC<InputProps> = ({ inputs, handleChange }) => {
  return (
    <input {...inputs} onChange={handleChange} className="p-2 rounded-md" />
  );
};

export default InputItem;
