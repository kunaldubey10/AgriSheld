# AgriShield - Modern Farming Solutions

AgriShield is an advanced AI-powered system designed to predict and manage crop diseases, helping farmers make proactive, data-driven decisions for crop health. By integrating machine learning with IoT and satellite data, AgriShield provides real-time insights and actionable recommendations to prevent disease spread, optimize irrigation, and improve overall farm management.

This project was created as part of the Smart India Hackathon 2024 under the Agriculture, FoodTech, and Rural Development theme.

## Features

- Disease Detection using AI
- NDVI Analysis with satellite data
- Crop Information and Management
- Market Prices
- Weather Updates
- Agricultural News
- Smart Farming Solutions
- IoT Integration (Coming Soon)

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kunaldubey10/Agrishield.git
cd agrishield
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Create a new project
4. Import your GitHub repository
5. Add your environment variables
6. Deploy!

### Deploying to GitHub Pages

1. Install gh-pages:
```bash
npm install gh-pages --save-dev
```

2. Add these scripts to your package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d out"
}
```

3. Update next.config.js:
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

4. Deploy:
```bash
npm run deploy
```

## Future Updates

- Real-time monitoring using IoT devices
- Enhanced disease prediction models
- Integration with more satellite data providers
- Mobile application development
- Automated irrigation control

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenWeather API for weather data
- Google Earth Engine for NDVI analysis
- TensorFlow.js for disease detection
- Smart India Hackathon 2024
- All contributors and supporters of the project
