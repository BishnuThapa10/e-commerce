import React from 'react'
import Header from './Header.jsx'
import { Outlet } from 'react-router'
import Footer from './Footer.jsx'

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
