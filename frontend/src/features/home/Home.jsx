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
      <HeroSection/>
      <TopSection/>
      <FourItemList/>
      <NewArrivals/>
      <BlogSection/>
      <InstagramSection/>
    </div>
  )
}
