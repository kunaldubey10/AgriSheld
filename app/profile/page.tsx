'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEdit, FaSave, FaLocationDot, FaPhone, FaEnvelope, FaLock, FaSignOutAlt, FaLeaf, FaCalendarAlt, FaTractor } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    location: 'Delhi, India',
    farmSize: '5 acres',
    crops: ['Wheat', 'Rice', 'Cotton'],
    profileImage: '/images/farmer-profile.jpg',
    experience: '15 years',
    specializations: ['Organic Farming', 'Crop Rotation', 'Soil Management'],
    achievements: ['Best Farmer Award 2020', 'Organic Certification'],
    farmHistory: 'Started farming in 2008 with 2 acres of land. Expanded to 5 acres in 2015.',
    currentProjects: ['Smart Irrigation Implementation', 'Organic Certification Process']
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (you would typically check a token or session)
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
  }, [])

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save the profile data to your backend
  }

  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    router.push('/')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to AgriShield
            </h1>
            <p className="text-gray-600 mb-8">
              Please sign in to access your profile
            </p>
            <div className="space-y-4">
              <Link
                href="/auth/signin"
                className="block w-full btn-primary"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="block w-full btn-secondary"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Farmer Profile
          </h1>
          <p className="text-xl text-gray-600">
            Manage your farming profile and achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary-100"
                />
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700"
                >
                  {isEditing ? <FaSave /> : <FaEdit />}
                </button>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mt-4">
                {profile.name}
              </h2>
              <p className="text-gray-600">Professional Farmer</p>
              <div className="mt-4 flex items-center text-gray-600">
                <FaLocationDot className="mr-2" />
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
              <div className="flex items-center text-gray-600">
                <FaCalendarAlt className="mr-2" />
                <span>{profile.experience}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {profile.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Farm Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6 md:col-span-2"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Farm Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Crops</h3>
                <div className="space-y-2">
                  {profile.crops.map((crop, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <FaLeaf className="mr-2" />
                      <span>{crop}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Farm Size</h3>
                <div className="flex items-center text-gray-600">
                  <FaTractor className="mr-2" />
                  <span>{profile.farmSize}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Farm History</h3>
              <p className="text-gray-600">{profile.farmHistory}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Projects</h3>
              <ul className="list-disc list-inside text-gray-600">
                {profile.currentProjects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-6 md:col-span-3"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-primary-50 p-4 rounded-lg"
                >
                  <p className="text-primary-800 font-medium">{achievement}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 