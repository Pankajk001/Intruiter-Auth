import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Header = () => {

  const{userData} = useContext(AppContext);

  return (
    <div className='flex flex-col items-center justify-center text-center mt-20 px-4 text-gray-800'>
      <img src= {assets.header_img} alt='logo' className='w-36 h-36 rounded-full mb-6 mt-10'/>
      <h1 className='flex text-gray-200 items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'InCruiter'}!
        <img className='w-8 aspect-square' src={assets.hand_wave} alt='logo'/></h1>

      <h2 className='text-3xl sm:text-5xl font-semibold mb-4 text-gray-300'>Backend Assignment Solution</h2>
      <p className='mb-8 max-w-md text-gray-400'>My name is <span className='font-bold'>Pankaj Kumar</span> and this is the assignment that was give by the Incruiter team to test my skills. This is the solution of the <span className='font-bold'>Backend Assignment.</span></p>
      <span className='text-gray-300 font-bold'>Go to Login Button and See the Magic. 😍</span>

      <button className='text-gray-300 hover:text-gray-900 font-semibold border border-gray-100 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Header
