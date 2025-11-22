import React from 'react'
import { Button } from '../../components/ui/button.jsx';

// const colors = [
//   { name: "Blue", hex: "#816DFA" },
//   { name: "Black", hex: "#000000" },
//   { name: "Yellow", hex: "#CDBA7B" }
// ];

export default function ColorSelection({ colors, selectedColor, onSelectColor }) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => {
        const isSelected = selectedColor === color.name;
        return (
          <Button
            key={color.hex}
            onClick={() => onSelectColor(color.name)}
            className={`
              w-5 h-5 p-0 rounded-full transition-all duration-300
              ${isSelected ? " scale-120 shadow-lg" : "hover:scale-105"}
            `}
            style={{ backgroundColor: color.hex }}
            title={color.name} // hover tooltip
          >
          </Button>
        );
      })}
    </div>
  )
}
