import React, { ChangeEvent } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  label?: string;
  options?: Option[];
  error?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<SelectInputProps> = ({
  label,
  options = [], // Provide a default empty array if options are not passed
  placeholder,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="block  text-[#12121299]">
        {label}
      </label>
      <div className="relative">
        <select
          onChange={onChange}
          name={name}
          className={`text-grey1 text-md bg-transparent outline-none block w-full py-1.5 appearance-none`}
          value={value}
          style={{ WebkitAppearance: "none", MozAppearance: "none" }} // Disable the arrow in Firefox, Safari, and Chrome
        >
          <option value="All" disabled={value !== "All"}>
            {placeholder}
          </option>
          {options
            .filter((option) => option.label !== "Actions")
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        {/* Custom Arrow Icon */}
        <div className="absolute inset-y-0 -right-1 top-[52%] -translate-y-[50%] pr-1 pointer-events-none">
          <IoIosArrowDown className="text-lg" />
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default CustomSelect;
