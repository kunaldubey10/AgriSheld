'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa'
import NDVIMap from '@/components/NDVIMap'
import { format } from 'date-fns'
import Image from 'next/image'

export default function NDVIAnalysis() {
  const [selectedArea, setSelectedArea] = useState<[number, number][] | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [analysisResults, setAnalysisResults] = useState<{ meanNDVI: number; date: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: ''
  })

  const handleAreaSelect = (coordinates: [number, number][]) => {
    setSelectedArea(coordinates)
  }

  const handleCoordinatesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lat = parseFloat(coordinates.latitude)
    const lng = parseFloat(coordinates.longitude)
    
    if (!isNaN(lat) && !isNaN(lng)) {
      setSelectedArea([[lat, lng]])
    } else {
      setError('Please enter valid latitude and longitude values')
    }
  }

  const handleAnalyze = async () => {
    if (!selectedArea || !startDate || !endDate) {
      setError('Please select an area and date range')
      return
    }

    setLoading(true)
    setError(null)
    setErrorDetails(null)

    try {
      const response = await fetch('/api/ndvi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: selectedArea,
          startDate,
          endDate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to analyze NDVI')
      }

      setAnalysisResults({
        meanNDVI: data.data.meanNDVI,
        date: format(new Date(data.data.date), 'MMM d, yyyy h:mm:ss a')
      })
    } catch (error) {
      console.error('Error:', error)
      setError('Error analyzing NDVI: ' + (error instanceof Error ? error.message : 'Unknown error occurred'))
      if (error instanceof Error && error.stack) {
        setErrorDetails(error.stack)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NDVI Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Monitor your crop health with Normalized Difference Vegetation Index
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">NDVI Analysis</h1>
          <p className="text-gray-600 mb-6">
            Select an area on the map and choose a date range to analyze vegetation health using NDVI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Map Selection</h2>
              
              {/* Coordinates Search Form */}
              <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <FaSearch className="mr-2 text-green-600" />
                  Search by Coordinates
                </h3>
                <form onSubmit={handleCoordinatesSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Latitude
                    </label>
                    <input
                      type="text"
                      value={coordinates.latitude}
                      onChange={(e) => setCoordinates(prev => ({ ...prev, latitude: e.target.value }))}
                      placeholder="e.g., 20.5937"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Longitude
                    </label>
                    <input
                      type="text"
                      value={coordinates.longitude}
                      onChange={(e) => setCoordinates(prev => ({ ...prev, longitude: e.target.value }))}
                      placeholder="e.g., 78.9629"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Search Location
                  </button>
                </form>
              </div>

              <div className="h-96 rounded-lg overflow-hidden">
                <NDVIMap onAreaSelect={handleAreaSelect} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Analysis Parameters</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loading || !selectedArea || !startDate || !endDate}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                    loading || !selectedArea || !startDate || !endDate
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {loading ? 'Analyzing...' : 'Analyze NDVI'}
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
                    <p className="text-red-600">{error}</p>
                    {errorDetails && (
                      <details className="mt-2">
                        <summary className="text-sm text-red-500 cursor-pointer">Show details</summary>
                        <pre className="mt-2 p-2 bg-red-100 text-red-700 text-xs overflow-auto">
                          {errorDetails}
                        </pre>
                      </details>
                    )}
                  </div>
                )}

                {analysisResults && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Analysis Results</h3>
                    <p className="text-gray-600">
                      Mean NDVI: {analysisResults.meanNDVI.toFixed(4)}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Last updated: {analysisResults.date}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">NDVI Map</h3>
            <div className="relative h-[200px] rounded-lg overflow-hidden">
              <Image
                src="/images/ndvi_map.png"
                alt="NDVI Map"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">NDVI Chart</h3>
            <div className="relative h-[200px] rounded-lg overflow-hidden">
              <Image
                src="/images/ndvi_chart.png"
                alt="NDVI Chart"
                className="object-contain"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 