// components/ui/selectoption.tsx

import React from "react";

// Interface for the Select component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

// Select component
export const Select: React.FC<SelectProps> = ({ children, ...props }) => (
  <select className="border border-gray-300 p-2 rounded w-full" {...props}>
    {children}
  </select>
);

// Interface for the SelectOption component
interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

// SelectOption component
export const SelectOption: React.FC<SelectOptionProps> = ({ children, ...props }) => (
  <option {...props}>{children}</option>
);


