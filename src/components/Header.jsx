import React from 'react'
import logo from '../assets/images/logo.jpeg'

const Header = () => {
  return (
    <header className="w-full max-w-7xl mx-auto bg-white flex items-center justify-between px-4 py-2 sm:px-6 md:px-8">
        <img src={logo} alt="Gun Shop logo" width={64} height={64} />

        <nav className="flex gap-2">
            <button className="bg-blue-500 rounded-full px-4 py-2 text-md text-white">Sign Up</button>
            <button className="bg-blue-500 rounded-full px-4 py-2 text-md text-white">Sign In</button>
            <button className="bg-gradient-to-r from-red-500 from-40% to-yellow-500 rounded-full px-4 py-2 text-md text-white">Log Out</button>
        </nav>
    </header>
  )
}

export default Header
