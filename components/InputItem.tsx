"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface InputProps {
  inputs: Record<string, any>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: React.FC<InputProps> = ({ inputs, handleChange }) => {
  const [focused, setFocused] = useState(false);
  const { errorMessage, ...rest } = inputs;

  const handleFocus = (e: any) => {
    setFocused(true);
  };

  return (
    <>
      <input
        {...rest}
        onChange={handleChange}
        onBlur={errorMessage && handleFocus}
        className={`p-2 rounded-md peer`}
      />
      <span
        className={`text-sm text-red-600 hidden  ${
          focused && "peer-invalid:block"
        }`}>
        {errorMessage}
      </span>
    </>
  );
};

export default InputItem;
