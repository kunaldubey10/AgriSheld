'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaNewspaper, FaCalendarAlt, FaUser } from 'react-icons/fa'

export default function AgriUpdates() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data for demonstration
  const updates = [
    {
      id: 1,
      title: 'New Government Scheme for Farmers',
      description: 'The government has announced a new scheme to provide financial assistance to small-scale farmers...',
      date: '2024-04-15',
      author: 'Ministry of Agriculture',
      category: 'government',
    },
    {
      id: 2,
      title: 'Latest Trends in Organic Farming',
      description: 'Discover the newest techniques and practices in organic farming that are revolutionizing the industry...',
      date: '2024-04-14',
      author: 'Agricultural Research Institute',
      category: 'research',
    },
    {
      id: 3,
      title: 'Weather Advisory for Next Week',
      description: 'Important weather updates and farming recommendations for the upcoming week...',
      date: '2024-04-13',
      author: 'Meteorological Department',
      category: 'weather',
    },
  ]

  const filteredUpdates = selectedCategory === 'all'
    ? updates
    : updates.filter(update => update.category === selectedCategory)

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
            Agricultural Updates
          </h1>
          <p className="text-xl text-gray-600">
            Stay informed with the latest news and developments
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Updates
            </button>
            <button
              onClick={() => setSelectedCategory('government')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'government'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Government Schemes
            </button>
            <button
              onClick={() => setSelectedCategory('research')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'research'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Research & Innovation
            </button>
            <button
              onClick={() => setSelectedCategory('weather')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'weather'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Weather Updates
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-2 text-primary-600 mb-4">
                  <FaNewspaper className="h-5 w-5" />
                  <span className="text-sm font-medium capitalize">
                    {update.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {update.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {update.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="h-4 w-4" />
                    <span>{new Date(update.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUser className="h-4 w-4" />
                    <span>{update.author}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 