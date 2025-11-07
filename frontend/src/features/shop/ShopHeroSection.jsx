import React from 'react'
import bg from '../../assets/images/shop.jpg'
import logo from '../../assets/images/logo.png'



export default function ShopHeroSection() {
  return (
    <div className='p-0 flex items-center justify-center h-50 md:h-70 lg:h-80 w-full bg-cover bg-center' style={{ backgroundImage: `url(${bg})` }}>

      <div className='h-full w-full bg-[#FAF4F4]/80 flex flex-col items-center justify-center'>
        <img src={logo} alt="logo" className='w-12 object-cover object-center' />
        <p className="text-lg text-center sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          Shop
        </p>
      </div>

    </div>
  )
}
