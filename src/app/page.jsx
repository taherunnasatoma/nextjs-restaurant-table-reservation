import AboutPage from '@/components/AboutPage'
import Banner from '@/components/Banner'
import BrowseRestaurant from '@/components/BrowseRestaurant'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import TestimonialPage from '@/components/TestimonialPage'
import React from 'react'

export default function HomePage() {
  return (
    <div>
        <Banner></Banner>
        <div className='max-w-7xl mx-auto'>
        <BrowseRestaurant></BrowseRestaurant>
        <AboutPage></AboutPage>
        <TestimonialPage></TestimonialPage>
        <FAQSection></FAQSection>
        </div>
        <Footer></Footer>
        
    </div>
  )
}
