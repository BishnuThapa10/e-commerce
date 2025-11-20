import React from 'react'
import { size } from './validation.js';
import { Button } from '../../components/ui/button.jsx';

export default function SizePicker({ selectedSizes, setSelectedSizes }) {
  const toggleSize = (value) => {
    if (selectedSizes.includes(value)) {
      setSelectedSizes(selectedSizes.filter(size => size !== value));
    } else {
      setSelectedSizes([...selectedSizes, value]);
    }
  };
  return (
    <div className="flex gap-1">
      {size.map(size => {
        const isSelected = selectedSizes.includes(size);
        return (
          <Button
            key={size}
            type="button"
            onClick={() => toggleSize(size)}
            className={`
              w-5 h-5 px-3 py-2 rounded-none  text-xs font-semibold
              transition-all duration-300
              ${isSelected ? "bg-[#FBEBB5] text-gray-700 shadow-lg scale-105 hover:bg-[#FBEBB5]" : "bg-[#fbe6e6] text-gray-700 hover:bg-[#f4e2e2]"}
            `}
          >
            {size}
          </Button>
        );
      })}
    </div>
  )
}
