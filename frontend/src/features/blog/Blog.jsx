import React from 'react'
import OtherPageHeroSection from '../../components/website/OtherPageHeroSection.jsx'
import PolicySection from '../../components/website/PolicySection.jsx'
import BlogList from './BlogList.jsx'
import SearchAndCategory from './SearchAndCategory.jsx'
import RecentBlog from './RecentBlog.jsx'

export default function Blog() {
  return (
    <div>
      <OtherPageHeroSection text="Blog" />

      <div className='max-w-6xl md:mx-auto'>

        <div className='p-8 md:px-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr] gap-6'>
          <div>
            <BlogList />
          </div>

          <div className='flex flex-col gap-8 max-w-xs'>
            <SearchAndCategory />
            <RecentBlog />
          </div>

        </div>

      </div>

      <PolicySection />
    </div>
  )
}
