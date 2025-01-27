import React from 'react';
import Facebook from './icons/Facebook';
import LinkedIn from './icons/LinkedIn';
import X from './icons/X';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 pt-10 pb-20 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <p className="text-center sm:text-left text-sm md:text-base">
          &copy; 2025 Gun Shop Company, Inc. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          {/* Icônes des réseaux sociaux avec hover effect */}
          <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-500 transition duration-200" />
          <LinkedIn className="w-6 h-6 cursor-pointer hover:text-blue-700 transition duration-200" />
          <X className="w-6 h-6 cursor-pointer hover:text-blue-400 transition duration-200" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
