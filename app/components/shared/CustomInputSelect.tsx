import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Address {
  cityCode: string;
  cityName: string;
  countryCode: string;
  countryName: string;
  regionCode: string;
}

interface Analytics {
  travelers: {
    score: number;
  };
}

interface GeoCode {
  latitude: number;
  longitude: number;
}

interface DataItem {
  address: Address;
  analytics: Analytics;
  detailedName: string;
  geoCode: GeoCode;
  iataCode: string;
  id: string;
  name: string;
  self: {
    href: string;
    methods: string[];
  };
  subType: string;
  timeZoneOffset: string;
  type: string;
}

interface SelectInputProps {
  label?: string;
  options?: DataItem[];
  error?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  value?: string;
  searchTerm?: string;
  loading?: boolean;
  onChange?: (value: string) => void;
  setSearchTerm?: (value: string) => void;
}

const CustomInputSelect: React.FC<SelectInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  className,
  loading,
  setSearchTerm,
  searchTerm,
  options
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function HighlightText({ text, query }: { text: string; query: string }) {
    const highlight = (text: string, query: string): string => {
      if (!query) return text;

      const escapedTerm = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedTerm})`, 'gi');
      return text.replace(regex, '<b>$1</b>');
    };

    const highlightedText = highlight(text, query);

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  }

  return (
    <div ref={selectRef} className="flex flex-col w-full">
      {label && <label className="block text-[#12121299]">{label}</label>}
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`cursor-pointer text-grey1 text-md bg-transparent outline-none w-full py-1.5 px-2 flex justify-between items-center ${className} ${isOpen ? "border-green" : ""}`}
        >
          <span>{value || placeholder}</span>
          <IoIosArrowDown className="text-lg" />
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white border border-bordered shadow-lg rounded-lg mt-0.5">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm?.(e.target.value)}
              placeholder="Type to search..."
              className="w-full px-2 py-1 border-b outline-none"
            />
            {loading ? (
              <div className="text-center py-2">Loading...</div>
            ) : (
              options?.map((option, i) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.iataCode)}
                  className={`cursor-pointer px-2 py-1 ${i === 0 ? "rounded-t-lg" : ""} ${i === options.length - 1 ? "rounded-b-lg" : ""} hover:bg-greenGradient hover:text-white transition-colors`}
                >
                 
                  {HighlightText({
                    text: `${option.name}, ${option.address.cityName}`,
                    query: searchTerm || "",
                  })}
                </div>
              ))
            )}
          </div>
        )}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default CustomInputSelect;
