/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className=" mb-2 w-full">
      {label && (
        <label htmlFor={id} className="text-gray-100">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-black text-gray-100  focus:bg-gray-950 hover:bg-gray-900 duration-200 border  w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
