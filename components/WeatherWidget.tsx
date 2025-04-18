'use client'

import { useState, useEffect } from 'react'
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa'

const WeatherWidget = () => {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // For demo purposes, using a default location
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }
        
        const data = await response.json()
        setWeather(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch weather data')
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-gray-700">Loading weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-primary-600 hover:text-primary-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!weather || !weather.main) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-700">Weather data not available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Weather</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaTemperatureHigh className="h-6 w-6 text-primary-600 mr-2" />
            <span className="text-gray-700">Temperature</span>
          </div>
          <span className="font-semibold text-gray-800">{weather.main?.temp?.toFixed(1) || 'N/A'}°C</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaWind className="h-6 w-6 text-primary-600 mr-2" />
            <span className="text-gray-700">Wind Speed</span>
          </div>
          <span className="font-semibold text-gray-800">{weather.wind?.speed?.toFixed(1) || 'N/A'} m/s</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaTint className="h-6 w-6 text-primary-600 mr-2" />
            <span className="text-gray-700">Humidity</span>
          </div>
          <span className="font-semibold text-gray-800">{weather.main?.humidity || 'N/A'}%</span>
        </div>
        
        <div className="text-sm text-gray-600">
          Last updated: {new Date(weather.dt * 1000).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget 