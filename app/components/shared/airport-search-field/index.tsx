import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { airports } from "@/app/data/airports"; // Assume this contains the airports data
import Image, { StaticImageData } from "next/image";

type Airport = {
    objectID: string;
    name: string;
    city: string;
    country: string;
    iata_code: string;
};

type HighlightTextProps = {
    text: string;
    query: string;
};

const HighlightText: React.FC<HighlightTextProps> = ({ text, query }) => {
    if (!query) return <>{text}</>;

    const regex = new RegExp(`(${query})`, "gi");
    return (
        <>
            {text.split(regex).map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <span key={index} className="bg-yellow-200">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
};

type Props = {
    label?: string;
    placeholder?: string;
    className?: string;
    filterItem?: string;
    icon?: StaticImageData;
    onSelect: (selectedIataCode: string) => void;
};

const AirportSearchField: React.FC<Props> = ({
    label,
    placeholder = "Search airports...",
    className = "",
    onSelect,
    icon,
    filterItem
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Airport | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Airport[]>(airports);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const filterAirports = () => {
            if (searchTerm.trim()) {
                setLoading(true);
                const filtered = airports.filter(
                    (airport) =>
                        (
                            airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            airport.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            airport.iata_code.toLowerCase().includes(searchTerm.toLowerCase())
                        ) &&
                        (!filterItem || airport.iata_code.toLowerCase() !== filterItem.toLowerCase())
                );
                setFilteredOptions(filtered);
                setLoading(false);
            } else {
                const filtered = airports.filter(
                    (airport) =>
                        !filterItem || airport.iata_code.toLowerCase() !== filterItem.toLowerCase()
                );
                setFilteredOptions(filtered);
            }
        };

        filterAirports();
    }, [searchTerm, filterItem]);


    const handleSelect = (item: Airport) => {
        onSelect(item.iata_code);
        setSelectedItem(item);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <div ref={selectRef} className="flex flex-col w-full">
                {label && <label className="block text-[#12121299]">{label}</label>}
                <div className="relative">
                    <div
                        className={`cursor-pointer text-grey1 text-md bg-transparent outline-none w-full py-1.5 px-2 flex justify-between items-center ${className} ${isOpen ? "border-green" : ""}`}
                    >
                        <input
                            type="text"
                            ref={inputRef}
                            value={
                                selectedItem && !searchTerm
                                    ? `${selectedItem.city}, ${selectedItem.country}`
                                    : searchTerm
                            }
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchTerm(value);

                                // Clear the selected item if the input field is emptied
                                if (value === "") {
                                    setSelectedItem(null);
                                }
                            }}
                            placeholder={placeholder}
                            className="w-full outline-none"
                            onFocus={handleFocus}
                        />
                        {icon ? (
                            <Image src={icon} alt="icon" width={25} height={25} />
                        ) : (
                            <IoIosArrowDown className="text-lg" />
                        )}
                    </div>
                    {isOpen && (
                        <div className="absolute z-10 w-full max-h-[500px] overflow-auto bg-white border border-bordered shadow-lg rounded-lg mt-0.5">
                            {loading ? (
                                <div className="text-center py-2">Loading...</div>
                            ) : filteredOptions.length > 0 ? (
                                filteredOptions.map((option, i) => (
                                    <div
                                        key={option.objectID}
                                        onClick={() => handleSelect(option)}
                                        className={`cursor-pointer px-2 py-1 ${i === 0 ? "rounded-t-lg" : ""} ${i === filteredOptions.length - 1 ? "rounded-b-lg" : ""
                                            } hover:bg-greenGradient hover:text-white transition-colors`}
                                    >
                                        <div className="flex justify-between group">
                                            <div className="text-[12px]  leading-4">
                                                <HighlightText
                                                    text={`${option.city}, ${option.country}`}
                                                    query={searchTerm}
                                                />
                                                <p className="text-gray2 group-hover:text-white text-[10px]">{option.name}</p>
                                            </div>
                                            <p className="bg-slate-200 group-hover:text-black text-[8px] rounded-sm font-semibold p-1 h-5">
                                                {option.iata_code}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-2">No results found</div>
                            )}
                        </div>
                    )}
                    {error && <span className="text-sm text-red-500">{error}</span>}
                </div>
            </div>
        </div>
    );
};

export default AirportSearchField;
