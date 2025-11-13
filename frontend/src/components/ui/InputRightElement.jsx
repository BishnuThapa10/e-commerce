import React from "react";

export const InputRightElement = ({ children }) => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      {children}
    </div>
  );
};
