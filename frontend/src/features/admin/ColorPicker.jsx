import React from 'react'
import { colors } from './validation.js';

export default function ColorPicker({ selectedColors, setSelectedColors }) {
  const toggleColor = (color) => {
    const exists = selectedColors.find(c => c.name === color.name);
    if (exists) {
      setSelectedColors(selectedColors.filter(c => c.name !== color.name));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {colors.map(color => {
        const isSelected = selectedColors.some(c => c.name === color.name);
        return (
          <button
            key={color.name}
            type="button"
            onClick={() => toggleColor(color)}
            className={`w-5 h-5 rounded-full transition-all ${isSelected ? " scale-120 shadow-lg" : "hover:scale-102"
              }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        );
      })}
    </div>
  )
}
