import React from 'react'

export default function ErrorMessage({ message = "Something went wrong!" }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl p-6 max-w-md text-center shadow">
        <h2 className="text-xl font-semibold mb-2">⚠ Error</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}
