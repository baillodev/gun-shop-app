import React from 'react'
import logo from '../assets/images/logo.png'
import { useUser } from '../contexts/userContext'

const Header = () => {
  const {toggleModals} = useUser()

  return (
    <header className="w-full max-w-7xl mx-auto bg-white/5 backdrop-blur-sm shadow-lg shadow-black rounded-full flex items-center justify-between gap-5 py-2 px-4 sm:px-6 md:px-8">
        <img src={logo} alt="Gun Shop logo" className='w-16 h-16 rounded-full animate-pulse duration-1000' />

        <nav className="flex gap-2">
            <button 
              className="bg-blue-500 rounded-full px-4 py-2 text-lg text-gray-200 cursor-pointer hover:bg-blue-600 transition-bg duration-300"
              onClick={() => toggleModals('signUp')}
            >
              Sign Up
            </button>
            <button 
              className="bg-blue-500 rounded-full px-4 py-2 text-lg text-gray-200 cursor-pointer hover:bg-blue-600 transition-bg duration-300"
              onClick={() => toggleModals('signIn')}
            >
              Sign In
            </button>
            {/* <button className="bg-gradient-to-r from-red-500 from-40% to-yellow-500 rounded-full px-4 py-2 text-lg text-gray-200 cursor-pointer">Log Out</button> */}
        </nav>
    </header>
  )
}

export default Header
