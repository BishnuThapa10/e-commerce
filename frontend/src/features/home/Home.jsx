import React from 'react'
import HeroSection from './HeroSection.jsx'
import TopSection from './TopSection.jsx'
import FourItemList from '../../components/website/FourItemList.jsx'
import NewArrivals from './NewArrivals.jsx'
import BlogSection from './BlogSection.jsx'
import InstagramSection from './InstagramSection.jsx'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TopSection />
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl font-semibold'>Top Picks For You</h1>
        <p className='text-xs text-justify text-[#9F9F9F]'>Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.</p>
      </div>
      <FourItemList />
      <NewArrivals />
      <BlogSection />
      <InstagramSection />
    </div>
  )
}
