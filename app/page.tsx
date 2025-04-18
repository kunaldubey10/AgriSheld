'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEdit, FaSave, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLock, FaSignOutAlt, FaLeaf, FaCalendarAlt, FaTractor } from 'react-icons/fa'
import Link from 'next/link'
import WeatherWidget from '@/components/WeatherWidget'

const agriculturalNews = [
  {
    id: 1,
    title: 'New Climate-Resistant Crop Varieties Developed',
    description: 'Scientists have developed new crop varieties that can withstand extreme weather conditions.',
    date: '2024-03-15',
    source: 'Agricultural Research Journal'
  },
  {
    id: 2,
    title: 'Government Announces New Farming Subsidies',
    description: 'New subsidies announced for farmers adopting sustainable farming practices.',
    date: '2024-03-14',
    source: 'Ministry of Agriculture'
  },
  {
    id: 3,
    title: 'Smart Farming Technology Revolution',
    description: 'How AI and IoT are transforming traditional farming methods.',
    date: '2024-03-13',
    source: 'Tech in Agriculture'
  }
]

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to AgriShield
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Your comprehensive farming companion
            </p>
            <div className="flex justify-center">
              <Link
                href="/learn-more"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Weather and News Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <FaCloudSun className="text-green-600 mr-2 text-xl" />
              <h2 className="text-2xl font-semibold text-gray-900">Current Weather</h2>
            </div>
            <WeatherWidget />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <FaNewspaper className="text-green-600 mr-2 text-xl" />
              <h2 className="text-2xl font-semibold text-gray-900">Agricultural News</h2>
            </div>
            <div className="space-y-4">
              {agriculturalNews.map((news) => (
                <div key={news.id} className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold text-gray-900">{news.title}</h3>
                  <p className="text-gray-600 mt-1">{news.description}</p>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>{news.date}</span>
                    <span>{news.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Features
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive solutions for modern farming
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <FaLeaf className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Crop Monitoring
            </h3>
            <p className="text-gray-600">
              Real-time monitoring of crop health and growth
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <FaWater className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Water Management
            </h3>
            <p className="text-gray-600">
              Optimize water usage with smart irrigation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <FaBug className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Pest Control
            </h3>
            <p className="text-gray-600">
              Early detection and management of pests
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <FaChartLine className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Market Analysis
            </h3>
            <p className="text-gray-600">
              Stay updated with market trends and prices
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
