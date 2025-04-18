import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About AgriShield</h3>
            <p className="text-gray-300">
              One stop solution for modern farming needs, helping farmers make informed decisions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/disease-detection" className="text-gray-300 hover:text-white">
                  Disease Detection
                </Link>
              </li>
              <li>
                <Link href="/ndvi-analysis" className="text-gray-300 hover:text-white">
                  NDVI Analysis
                </Link>
              </li>
              <li>
                <Link href="/market-prices" className="text-gray-300 hover:text-white">
                  Market Prices
                </Link>
              </li>
              <li>
                <Link href="/weather" className="text-gray-300 hover:text-white">
                  Weather
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@agrishield.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: 123 Farm Street, Agriculture City</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-300">
            © {new Date().getFullYear()} AgriShield. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 