import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import TrailList from './components/TrailList'
import TrailDetail from './components/TrailDetail'
import About from './components/About'
import Account from './components/Account'
import LikedTrailList from './components/LikedTrailList'
import LikedTrailDetail from './components/LikedTrailDetail'


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
    setTrails(trailsData);

    // Check if user has userinfo; if not, create it
    fetch('https://cs571api.cs.wisc.edu/rest/f25/bucket/', {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      }
    }).then(res => res.json()).then(json => {
      if (!json.includes("userinfo")) {
        fetch('https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo', {
          method: "POST",
          headers: {
            "X-CS571-ID": CS571.getBadgerId(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "Anonymous",
            likedTrails: []
          })
        })
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route 
            path="/p42/" 
            element={<TrailList trails={trails} />} 
          />
          <Route 
            path="/p42/trail/:id" 
            element={<TrailDetail trails={trails} />} 
          />
          <Route 
            path="/p42/likedtrail/:id" 
            element={<LikedTrailDetail trails={trails} />} 
          />
          <Route 
            path="/p42/about"
            element={<About />} 
          />
          <Route 
            path="/p42/likedtrails"
            element={<LikedTrailList trails={trails} />} 
          />
          <Route 
            path="/p42/account"
            element={<Account />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App