import React from 'react'
import { logo } from '../assets'


const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col' >
      <nav className='flex justify-between items-center w-full mb-10 pt-3' >
        <img src={logo} alt='LOGO' className='w-40 object-contain' />
        <button
          type='button'
          onClick={() => window.open('https://github.com/Nitish-Kumar05')} // Pointing to github profile
          className='black_btn'
        >
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
      {/* For the responsiveness */}
        Summarize websites with <br className='max-md:hidden' /> 
        <span className='green_gradient' >OpenAI</span> 
      </h1>

      {/* Description - sub text */}
      <h2 className='desc' >
        Don't have time to read long articles. Don't worry it will summarize for you
      </h2>

      <h3 className='pt-8 text-center text-gray-600 font-bold'>
        #NOTE: only accepts urls
      </h3>
    </header>
  )
}

export default Hero