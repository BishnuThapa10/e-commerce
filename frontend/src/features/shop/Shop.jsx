import React from 'react'
import ShopHeroSection from './ShopHeroSection.jsx'
import FurnitureList from './FurnitureList.jsx'
import PolicySection from '../../components/website/PolicySection.jsx'

export default function Shop() {
  return (
    <div className='space-y-8'>
      <ShopHeroSection/>
      <FurnitureList/>
      <PolicySection/>
    </div>
  )
}
