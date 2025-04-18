'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUpload, FaCamera, FaTimes, FaSpinner } from 'react-icons/fa'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'

const classNames = [
  'Apple___Apple_scab',
  'Apple___Black_rot',
  'Apple___Cedar_apple_rust',
  'Apple___healthy',
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  'Corn_(maize)___Common_rust_',
  'Corn_(maize)___Northern_Leaf_Blight',
  'Corn_(maize)___healthy',
  'Grape___Black_rot',
  'Grape___Esca_(Black_Measles)',
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
  'Grape___healthy',
  'Potato___Early_blight',
  'Potato___Late_blight',
  'Potato___healthy',
  'Tomato___Bacterial_spot',
  'Tomato___Early_blight',
  'Tomato___Late_blight',
  'Tomato___Leaf_Mold',
  'Tomato___Septoria_leaf_spot',
  'Tomato___Spider_mites Two-spotted_spider_mite',
  'Tomato___Target_Spot',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  'Tomato___Tomato_mosaic_virus',
  'Tomato___healthy'
]

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<{ class: string; confidence: number } | null>(null)
  const [model, setModel] = useState<tf.LayersModel | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true)
        const loadedModel = await tf.loadLayersModel('/trained_model/model.json')
        setModel(loadedModel)
        setError(null)
      } catch (err) {
        console.error('Error loading model:', err)
        setError('Failed to load the model. Please try refreshing the page.')
      } finally {
        setLoading(false)
      }
    }

    loadModel()
  }, [])

  const preprocessImage = async (imageFile: File): Promise<tf.Tensor3D> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const img = new Image()
          img.onload = () => {
            const tensor = tf.browser.fromPixels(img)
              .resizeNearestNeighbor([224, 224])
              .toFloat()
              .div(255.0)
              .expandDims() as tf.Tensor3D
            resolve(tensor)
          }
          img.src = e.target?.result as string
        } catch (err) {
          reject(err)
        }
      }
      reader.readAsDataURL(imageFile)
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)
      setError(null)
      setPrediction(null)

      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)

      if (!model) {
        throw new Error('Model not loaded')
      }

      const tensor = await preprocessImage(file)
      const predictions = model.predict(tensor) as tf.Tensor
      const values = Array.from(await predictions.data())
      const maxIndex = values.indexOf(Math.max(...values))
      const confidence = values[maxIndex] * 100

      setPrediction({
        class: classNames[maxIndex].replace(/_/g, ' '),
        confidence: Math.round(confidence * 100) / 100
      })
      setShowModal(true)
    } catch (err) {
      console.error('Error processing image:', err)
      setError('Failed to process image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('Failed to access camera. Please check permissions.')
    }
  }

  const captureImage = async () => {
    if (!videoRef.current) return

    try {
      setLoading(true)
      setError(null)
      setPrediction(null)

      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Failed to get canvas context')

      ctx.drawImage(videoRef.current, 0, 0)
      const imageUrl = canvas.toDataURL('image/jpeg')
      setSelectedImage(imageUrl)

      if (!model) {
        throw new Error('Model not loaded')
      }

      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
      const tensor = await preprocessImage(file)
      const predictions = model.predict(tensor) as tf.Tensor
      const values = Array.from(await predictions.data())
      const maxIndex = values.indexOf(Math.max(...values))
      const confidence = values[maxIndex] * 100

      setPrediction({
        class: classNames[maxIndex].replace(/_/g, ' '),
        confidence: Math.round(confidence * 100) / 100
      })
      setShowModal(true)
    } catch (err) {
      console.error('Error capturing image:', err)
      setError('Failed to capture image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Plant Disease Detection</h1>
          <p className="text-gray-600 mb-8">
            Upload an image or take a photo of your plant to detect diseases.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <FaUpload className="mr-2" />
                Upload Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              <button
                onClick={handleCameraClick}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                <FaCamera className="mr-2" />
                Use Camera
              </button>
            </div>

            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  No image selected
                </div>
              )}
              {videoRef.current?.srcObject && (
                <button
                  onClick={captureImage}
                  className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaCamera />
                </button>
              )}
            </div>
          </div>

          {loading && (
            <div className="mt-6 flex items-center justify-center">
              <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
              <span className="ml-2 text-gray-600">Processing image...</span>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="hidden"
          />
        </motion.div>
      </div>

      {showModal && prediction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Analysis Results</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Detected Disease:</p>
                <p className="text-lg font-semibold text-gray-900">{prediction.class}</p>
              </div>
              <div>
                <p className="text-gray-600">Confidence:</p>
                <p className="text-lg font-semibold text-gray-900">{prediction.confidence}%</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default DiseaseDetection 