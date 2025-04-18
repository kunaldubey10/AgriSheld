'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'

interface NavItem {
  name: string;
  path: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Disease Detection', path: '/disease-detection' },
    { name: 'NDVI Analysis', path: '/ndvi-analysis' },
    { name: 'Crop Information', path: '/crop-information' },
    { name: 'Market Prices', path: '/market-prices' },
    { name: 'Agri Updates', path: '/agri-updates' },
    { name: 'Weather', path: '/weather' },
    { name: 'Profile', path: '/profile' },
  ]

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-[90px] h-[75px]">
                <Image
                  src="/Logo.png"
                  alt="AgriShield Logo"
                  fill
                  className="rounded-lg object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-gray-800">AgriShield</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                prefetch={true}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-150"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                prefetch={true}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 