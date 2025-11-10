import React from 'react'
import FurnitureList from './FurnitureList.jsx'
import PolicySection from '../../components/website/PolicySection.jsx'
import OtherPageHeroSection from '../../components/website/OtherPageHeroSection.jsx'

export default function Shop() {
  return (
    <div className='space-y-8'>
      <OtherPageHeroSection text="Shop"/>
      <FurnitureList/>
      <PolicySection/>
    </div>
  )
}
