// components/ui/input.tsx
import React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input className="border border-gray-300 p-2 rounded w-full" {...props} />
);

export default Input;
