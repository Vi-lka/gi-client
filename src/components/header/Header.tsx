import React from 'react'
import HorizontalAccordion from './HorizontalAccordion'

export default function Header() {
  return (
    <header className='w-full mt-6'>
        <section className='2xl:max-w-[2000px] xl:max-w-[1400px] lg:max-w-[1280px] md:max-w-[1024px] sm:max-w-[768px] w-11/12 mx-auto'>
          <HorizontalAccordion />
        </section>

        <section className='container w-5/6 mx-auto'>

        </section>
    </header>
  )
}
