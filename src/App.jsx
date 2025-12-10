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
import Footer from './components/Footer'
import picnicPointImg from './assets/picnicpoint.jpg'
import lakeshoreImg from './assets/lakeshoretrail.jpg'
import arboretumImg from './assets/arboretum.jpg'
import capitalSpringsImg from './assets/capitalsprings.jpg'
import olbrichImg from './assets/olbrich.jpg'
import olinParkImg from './assets/olinpark.jpg'
import owenParkImg from './assets/owenpark.webp'
import pheasantBranchImg from './assets/pheasantbranch.jpg'

const trailsData = [
  {
    "id": 1,
    "name": "Picnic Point Trail",
    "location": "University Bay Drive, Madison, WI",
    "difficulty": "Easy",
    "distance": "2 mi",
    "description": "Scenic stroll along Lake Mendota popular among UW students.",
    "image": picnicPointImg,
    "features": ["Lake Views", "Parking Available", "Dog Friendly"]
  },
  {
    "id": 2,
    "name": "Lakeshore Trail",
    "location": "University Bay Drive, Madison, WI",
    "difficulty": "Medium",
    "distance": "3 mi",
    "description": "Features trails around Lake Mendota through forests, prairies, and gardens.",
    "image": lakeshoreImg,
    "features": ["Lake Views", "Parking Available", "Dog Friendly"]
  },
  {
    "id": 3,
    "name": "UW-Madison Arboretum",
    "location": "Arboretum Drive, Madison, WI",
    "difficulty": "Hard",
    "distance": "3 mi",
    "description": "Long, winding trails through the forests and marshes around Lake Wingra.",
    "image": arboretumImg,
    "features": ["Lake Views", "Parking Available", "Bike Friendly"]
  },
  {
    "id": 4,
    "name": "Pheasant Branch Conservancy",
    "location": "Pheasant Branch Road, Middleton, WI",
    "difficulty": "Medium",
    "distance": "3 mi",
    "description": "Large semi-forested loop featuring an extensive boardwalk.",
    "image": pheasantBranchImg,
    "features": ["Parking Available", "Dog Friendly", "Bike Friendly"]
  },
  {
    "id": 5,
    "name": "Olin Park",
    "location": "Olin-Turville Court, Madison, WI",
    "difficulty": "Medium",
    "distance": "3 mi",
    "description": "Peaceful park on Lake Monona with additional wooded trails.",
    "image": olinParkImg,
    "features": ["Lake Views", "Parking Available", "Dog Friendly", "Boat Launch"]
  },
  {
    "id": 6,
    "name": "Owen Conservation Park",
    "location": "Old Sauk Road, Madison, WI",
    "difficulty": "Medium",
    "distance": "1 mi",
    "description": "Meandering trails with great lookout points.",
    "image": owenParkImg,
    "features": ["Parking Available", "Dog Friendly"]
  },
  {
    "id": 7,
    "name": "Capital Springs State Recreation Area",
    "location": "Lake Farm Road, Madison, WI",
    "difficulty": "Hard",
    "distance": "5 mi",
    "description": "Expansive natural area perfect for a wide range of outdoor activities.",
    "image": capitalSpringsImg,
    "features": ["Lake Views", "Parking Available", "Dog Friendly", "Bike Friendly", "Campsites", "Boat Launch"]
  },
  {
    "id": 8,
    "name": "Olbrich Botanical Gardens",
    "location": "Atwood Avenue, Madison, WI",
    "difficulty": "Easy",
    "distance": "1 mi",
    "description": "Short but dense trails around sculptures and plants.",
    "image": olbrichImg,
    "features": ["Parking Available", "Indoor Area"]
  }
]

function App() {
  const [trails, setTrails] = useState([])

  useEffect(() => {
    setTrails(trailsData);

    // Ensure userinfo exists
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
      <div className="App d-flex flex-column min-vh-100">
        <Navigation />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/p42/" element={<TrailList trails={trails} />} />
            <Route path="/p42/trail/:id" element={<TrailDetail trails={trails} />} />
            <Route path="/p42/likedtrail/:id" element={<LikedTrailDetail trails={trails} />} />
            <Route path="/p42/about" element={<About />} />
            <Route path="/p42/likedtrails" element={<LikedTrailList trails={trails} />} />
            <Route path="/p42/account" element={<Account />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
