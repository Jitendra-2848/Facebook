import React, { useEffect } from 'react'
import Nav from './parts/Nav'
import Hero from './parts/Hero'
import Conatct from './parts/Conatct'
import Sidebar from './parts/Side1'
import CreatePost from './parts/Hero'
import ContactsSidebar from './parts/Conatct'
import HeroSection from './parts/Hero'

const Homepage = () => {
  return (
    <div className='bg-[#f2f4f7] h-auto min-h-screen'>
      <Nav />
      <div className='flex'>
      <Sidebar />
      {/* <Hero /> */}
      <HeroSection />
      <ContactsSidebar />
      {/* <Conatct /> */}
      </div>
    </div>
  )
}

export default Homepage
