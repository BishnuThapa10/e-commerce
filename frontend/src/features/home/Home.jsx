import React from 'react'
import HeroSection from './HeroSection.jsx'
import TopSection from './TopSection.jsx'
import NewArrivals from './NewArrivals.jsx'
import BlogSection from './BlogSection.jsx'
import InstagramSection from './InstagramSection.jsx'
import TopPick from './TopPick.jsx'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TopSection />
      <TopPick />
      <NewArrivals />
      <BlogSection />
      <InstagramSection />
    </div>
  )
}
