'use client'
interface FilterButtonsProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export const HotelFilter: React.FC<FilterButtonsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 py-8">
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => onSelectCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm  ${category === selectedCategory ? "bg-greenGradient text-white" : "bg-white text-grayText"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};
