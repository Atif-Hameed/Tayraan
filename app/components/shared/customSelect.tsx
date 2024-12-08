
import React, { ChangeEvent } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  error?: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<SelectInputProps> = ({
  label,
  options,
  placeholder,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full md:w-[47%]">
      <label className="block mb-2 text-lg font-medium text-gray-400">
        {label}
      </label>
      <div className="relative">
        <select
          onChange={onChange}
          name={name}
          className={`text-grey1 text-md bg-transparent border border-[#D9D9D9] rounded-full
                        focus:border-primary focus:outline-none block w-full  p-2.5 py-3`}
          value={value}
        >
          <option value="All" disabled={value !== "All"}>
            {placeholder}
          </option>
          {options.length > 0 &&
            options
              .filter((option) => option.label !== "Actions")
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
        </select>
        <div className="absolute inset-y-0 -right-1 top-[50%] -translate-y-[50%] pr-1 pointer-events-none">
          <IoIosArrowDown />
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default CustomSelect;
