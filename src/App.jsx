import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import TrailList from './components/TrailList'
import TrailDetail from './components/TrailDetail'
import About from './components/About'


const trailsData = [ // much of this stuff is placeholder for now, especially the pictures
  {
    "id": 1,
    "name": "Picnic Point Trail",
    "location": "University Bay Drive, Madison, WI",
    "difficulty": "Easy",
    "distance": "2 mi",
    "description": "A scenic lakeside trail perfect for walking, running, or biking. Picnic Point offers beautiful views of Lake Mendota and is a popular spot for students and locals alike.",
    "image": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500",
    "features": ["Lake Views", "Accessible", "Dog Friendly"],
    "reviews": []
  },
  {
    "id": 2,
    "name": "Lakeshore Trail",
    "location": "idk",
    "difficulty": "Medium",
    "distance": "3 mi",
    "description": "Features wooded trails around a beautiful lake.",
    "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
    "features": ["Dog Friendly", "Lake Views", "Parking Available"],
    "reviews": []
  }
]

function App() {
  const [trails, setTrails] = useState([])

  useEffect(() => {
    setTrails(trailsData)
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route 
            path="/" 
            element={<TrailList trails={trails} />} 
          />
          <Route 
            path="/trail/:id" 
            element={<TrailDetail trails={trails} />} 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App