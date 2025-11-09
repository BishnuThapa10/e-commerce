import React, { useState } from 'react'
import { Button } from '../../components/ui/button.jsx';

export default function AddToCart() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className='inline-flex gap-2'>

      <div className="inline-flex rounded-sm overflow-hidden border items-center py-0">
        <Button
          size="sm"
          variant="ghost"
          className="rounded-none hover:bg-gray-100"
          disabled={quantity <= 1}
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
        >
          -
        </Button>

        <div className=" text-center p-1 text-xs select-none">{quantity}</div>

        <Button
          size="sm"
          variant="ghost"
          className="rounded-none px-3 hover:bg-gray-100"
          onClick={() => setQuantity(q => q + 1)}
        // Math.min(maxStock, quantity + 1).
        >
          +
        </Button>
      </div>

      <Button variant="outline" className="border-black text-xs px-8">Add To Cart</Button>

    </div>
  )
}
