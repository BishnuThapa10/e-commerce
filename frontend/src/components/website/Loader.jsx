import React from 'react'

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 text-lg">{text}</p>
      </div>
    </div>
  )
}
