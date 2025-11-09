import React from 'react'
import { Button } from '../../components/ui/button.jsx';


const sizes = ["L", "XL", "XS"];

export default function SizeSelector({ selectedSize, onSelectSize }) {
  return (
    <div className="flex gap-1">
      {sizes.map((size) => {
        const isSelected = selectedSize === size;
        return (
          <Button
            key={size}
            onClick={() => onSelectSize(size)}
            className={`
              w-4 h-5 px-3 py-2 rounded-none  text-xs font-semibold
              transition-all duration-300
              ${isSelected ? "bg-[#FBEBB5] text-gray-700 shadow-lg scale-105 hover:bg-[#FBEBB5]" : "bg-[#FAF4F4] text-gray-700 hover:bg-gray-100"}
            `}
          >
            {size}
          </Button>
        );
      })}
    </div>
  )
}
