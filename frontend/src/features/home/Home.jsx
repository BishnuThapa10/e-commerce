import React from 'react'
import HeroSection from './HeroSection.jsx'
import TopSection from './TopSection.jsx'
import FourItemList from '../../components/website/FourItemList.jsx'

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <TopSection/>
      <FourItemList/>
    </div>
  )
}
