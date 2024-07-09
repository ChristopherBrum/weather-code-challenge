# Palmetto Weather Code Challenge

## Features

- **Real-time Weather Data**: Get current weather information by city name, zip code, or coordinates (longitude and latitude).
- **React Frontend**: Communicates with the backend application for fetching city and weather data=.
- **Node.js/Express Backend**: Backend that serves JSON data and communicates with the OpenWeatherMap API.

## Technologies Used

- **Frontend**:
  - React
  - HTML/CSS

- **Backend**:
  - Node.js
  - Express
	- Jest

- **APIs**:
  - OpenWeatherMap API

## Getting Started

### Specs

- Node (v20.2.0)
- npm (v9.6.6)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ChristopherBrum/weather-code-challenge.git
cd weather-code-challenge
```

2. Install dependencies:

```bash
cd client
npm install
```

```bash
cd ../server
npm install
```

3. Set up environment variables:

Create an `.env` file in the root of the the server directory and add this code (I can send an API if needed):

```bash .env
OPEN_WEATHER_API_KEY=openweatherAPI_key
PORT=3000
```

4. Run the development server:

Start the backend server:

```bash
npm run dev
```

5. Start the frontend development server in a new terminal:

```bash
cd ../client
npm run dev
```

Access the application:

Open your browser and go to `http://localhost:5173` to see the application in action.


## Project Structure

```bash
palmetto-weather/
├── client/                 # React frontend
│   ├── public/             # Public assets/images
│   ├── src/                # Source files
│   │   ├── assets/     		# Static assets
│   │   ├── components/     # React components
│   │   ├── services/       # API functions
│   │   ├── App.js          # Main App component
│   │   ├── main.css        # CSS
│   │   └── main.jsx        # React entry point
│   ├── index.html          # Entry point
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js/Express backend
│   ├── data/               # City data from openweather 
│   ├── src/                # Source files
│   │   ├── routes/         # API routes
│   │   ├── services/       # Service functions for city and weather data 
│   │   ├── tests/    	    # Jest tests
│   │   ├── app.js    	    # Application configuration and middleware
│   │   └── index.js        # Entry point
│   └── package.json        # Backend dependencies
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```
