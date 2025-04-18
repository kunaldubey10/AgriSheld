'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaChartLine, FaTimes } from 'react-icons/fa'

export default function MarketPrices() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Mock data for demonstration
  const crops = [
    { name: 'Wheat', price: '₹2,500/quintal', change: '+2.5%', trend: 'up' },
    { name: 'Rice', price: '₹3,200/quintal', change: '-1.2%', trend: 'down' },
    { name: 'Cotton', price: '₹6,800/quintal', change: '+0.8%', trend: 'up' },
    { name: 'Sugarcane', price: '₹3,100/quintal', change: '+1.5%', trend: 'up' },
    { name: 'Soybean', price: '₹4,500/quintal', change: '-0.5%', trend: 'down' },
  ]

  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Market Prices
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest crop prices
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900 placeholder-gray-500"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {crop.name}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {crop.price}
                  </p>
                </div>
                <div
                  className={`flex items-center ${
                    crop.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <FaChartLine className="mr-1" />
                  <span>{crop.change}</span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View Price History →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Price History
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaChartLine className="h-12 w-12 text-gray-400" />
              <p className="ml-2 text-gray-600">Price History Graph</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
} 