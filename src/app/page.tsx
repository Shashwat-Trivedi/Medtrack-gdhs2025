import Challanges from '@/components/challanges'
import FinalCta from '@/components/finalcta'
import HeroSection from '@/components/herosection'
import Navbar from '@/components/navbar'
import Solution from '@/components/solution'
import Features from '@/components/Features'
import AboutAyu from '@/components/AboutAyu'
import Contact from '@/components/Contact'
import Tag from '@/components/ui/tag'
import React from 'react'

const page = () => {
  return (
    <div className='bg-white w-screen h-screen overflow-x-hidden'>
      <Navbar />
      <HeroSection />
      <Features />
      <AboutAyu />
      <Challanges />
      <Solution />
      <Contact />
      <FinalCta />
    </div>
  )
}

export default page
