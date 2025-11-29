import React from 'react'
import HeroSection from './HeroSection.jsx'
import TopSection from './TopSection.jsx'
import NewArrivals from './NewArrivals.jsx'
import BlogSection from './BlogSection.jsx'
import InstagramSection from './InstagramSection.jsx'
import TopPick from './TopPick.jsx'
import { useGetCategoryQuery, useGetHeroQuery, useGetNewQuery } from './homeApi.js'
import Loader from '../../components/website/Loader.jsx'

export default function Home() {
  const { isLoading: heroLoading, data: hero } = useGetHeroQuery();
  const { isLoading: categoryLoading, data: category } = useGetCategoryQuery();
  const { isLoading: newLoading, data: newArrival } = useGetNewQuery();
  if (heroLoading || categoryLoading || newLoading) return <Loader text="Please Wait..." />;
  return (
    <div>
      <HeroSection hero = {hero} />
      <TopSection category = {category} />
      <TopPick />
      <NewArrivals newArrival = {newArrival} />
      <BlogSection />
      <InstagramSection />
    </div>
  )
}
