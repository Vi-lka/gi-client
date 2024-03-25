import React from 'react'
import HorizontalAccordion from './HorizontalAccordion'
import MainHeader from './MainHeader'

export default function Header() {
  return (
    <header className='w-full mt-6'>
        <section className='relative 2xl:max-w-[2000px] xl:max-w-[1400px] lg:max-w-[1280px] md:max-w-[1024px] sm:max-w-[768px] w-11/12 mx-auto'>
          <HorizontalAccordion />
        </section>

        <section className='container md:w-5/6 mx-auto'>
          <MainHeader />
        </section>
    </header>
  )
}
