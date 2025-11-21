import React from 'react'

export default function FullScreenLoader({ show = false, message = "Loading..." }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg">
      <div className="relative flex flex-col items-center px-10 py-8 rounded-3xl bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)]">

        {/* Outer Glow Spinner */}
        <div className="relative">
          <div className="h-20 w-20 border-4 border-white/25 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 h-20 w-20 rounded-full blur-2xl bg-white/20 animate-pulse"></div>
        </div>

        {/* Message */}
        <p className="text-white mt-5 text-xl font-light tracking-wide drop-shadow-sm">
          {message}
        </p>
      </div>
    </div>
  )
}
