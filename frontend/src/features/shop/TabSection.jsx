import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.jsx'
import sofa from '../../assets/images/sofa.png'

export default function TabSection({ furniture }) {
  return (
    <Tabs defaultValue="account" className="px-4 sm:px-15 pb-6 border-b border-b-[#D9D9D9] flex items-center">
      <TabsList className="bg-transparent flex gap-0 md:gap-4">

        <TabsTrigger value="account" className="text-[#9F9F9F] text-xs md:text-sm
        data-[state=active]:text-black
        data-[state=active]:bg-transparent
        data-[state=active]:shadow-none
        data-[state=active]:border-none
        data-[state=active]:ring-0">Description</TabsTrigger>

        <TabsTrigger value="password" className="text-[#9F9F9F] text-xs md:text-sm
      data-[state=active]:text-black
        data-[state=active]:bg-transparent
        data-[state=active]:shadow-none
        data-[state=active]:border-none
        data-[state=active]:ring-0">Additional Information</TabsTrigger>

        <TabsTrigger value="review" className="text-[#9F9F9F] text-xs md:text-sm
      data-[state=active]:text-black
        data-[state=active]:bg-transparent
        data-[state=active]:shadow-none
        data-[state=active]:border-none
        data-[state=active]:ring-0">Reviews[5]</TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="flex flex-col gap-2 items-center">
        <p className='text-xs md:text-sm text-[#9F9F9F] max-w-[800px] text-justify whitespace-pre-line'>
          {furniture.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {furniture && furniture.images.map((i) => (
            <div key={i._id} className='h-30 md:h-70 bg-[#FFF9E5]'>
              <img src={i.url} alt="image" className='w-full h-full object-contain' />
            </div>
          ))}

        </div>

      </TabsContent>

      <TabsContent value="password">This is Additional Information.</TabsContent>
      <TabsContent value="review">This is reviews.</TabsContent>
    </Tabs>
  )
}
