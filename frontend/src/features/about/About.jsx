import React from 'react'
import Loader from '../../components/website/Loader.jsx';
import { useGetHeroQuery } from '../home/homeApi.js';
import { useNavigate } from 'react-router';

export default function About() {
  const { isLoading, data } = useGetHeroQuery();
  const nav = useNavigate();
  if (isLoading) return <Loader text="Please Wait..." />;
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">About Our Furniture Store</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Crafting comfort, style, and quality furniture for modern living.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded with a passion for design and craftsmanship, our furniture
              store was created to bring timeless, functional, and elegant
              furniture into every home.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From cozy living rooms to stylish workspaces, we believe furniture
              should enhance the way you live every day.
            </p>
          </div>

          <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center">
            <img src={data.hero.images[0].url} alt={data.hero.name} className='max-h-[300px] max-w-full object-cover' />
          </div>
        </div>
      </section >

      {/* Values Section */}
      < section className="bg-gray-50 py-16" >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium mb-3">Quality Craftsmanship</h3>
              <p className="text-gray-600">
                We use premium materials and skilled workmanship to ensure
                durability and comfort.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium mb-3">Timeless Design</h3>
              <p className="text-gray-600">
                Our designs balance modern trends with classic elegance.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium mb-3">Customer First</h3>
              <p className="text-gray-600">
                We are committed to exceptional service, honest pricing, and
                satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* Promise Section */}
      < section className="py-16 text-center" >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">
            Our Promise to You
          </h2>
          <p className="text-gray-600 mb-6">
            We promise carefully curated furniture, reliable delivery, and
            dedicated support to help you create a space you love.
          </p>
          <button
          onClick={() => nav('/shop')}
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition">
            Explore Our Collection
          </button>
        </div>
      </section >
    </div >
  )
}
