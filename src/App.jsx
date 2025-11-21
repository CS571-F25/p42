import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import TrailList from './components/TrailList';
import TrailDetail from './components/TrailDetail';
import About from './components/About';
import SearchBar from './components/SearchBar';

// 🎯 20条精选路线数据
const trailsData = [
  {
    id: 1,
    name: "Picnic Point Trail",
    location: "University Bay Drive, Madison, WI",
    difficulty: "Easy",
    distance: "2.3 miles",
    rating: 4.5,
    description: "A scenic lakeside trail perfect for walking, running, or biking. Picnic Point offers beautiful views of Lake Mendota and is a popular spot for students and locals alike.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    features: ["Lake Views", "Accessible", "Dog Friendly", "Biking"],
    elevation: "50 ft",
    duration: "45 min",
    coordinates: { lat: 43.0838, lng: -89.4198 },
    reviews: []
  },
  {
    id: 2,
    name: "Indian Lake County Park",
    location: "8200 Old Sauk Rd, Cross Plains, WI",
    difficulty: "Moderate",
    distance: "3.5 miles",
    rating: 4.2,
    description: "Features wooded trails around a beautiful lake with opportunities for wildlife viewing. Great for bird watching and enjoying nature.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    features: ["Wildlife", "Lake Views", "Parking Available", "Fishing"],
    elevation: "120 ft",
    duration: "1.5 hrs",
    coordinates: { lat: 43.1096, lng: -89.6396 },
    reviews: []
  },
  {
    id: 3,
    name: "Blue Mound State Park",
    location: "4350 Mounds Park Rd, Blue Mounds, WI",
    difficulty: "Hard",
    distance: "6 miles",
    rating: 4.8,
    description: "Highest point in southern Wisconsin with spectacular panoramic views. Features two observation towers and challenging hiking trails.",
    image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800",
    features: ["Mountain Views", "Challenging", "Observation Towers", "Swimming Pool"],
    elevation: "450 ft",
    duration: "3 hrs",
    coordinates: { lat: 43.0073, lng: -89.8373 },
    reviews: []
  },
  {
    id: 4,
    name: "Governor Nelson State Park",
    location: "5140 County Highway M, Waunakee, WI",
    difficulty: "Easy",
    distance: "5.5 miles",
    rating: 4.3,
    description: "Located on the north shore of Lake Mendota, offering wooded trails and prairie areas. Popular for picnicking and swimming.",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800",
    features: ["Lake Views", "Picnic Areas", "Swimming Beach", "Boat Launch"],
    elevation: "80 ft",
    duration: "2 hrs",
    coordinates: { lat: 43.1294, lng: -89.4561 },
    reviews: []
  },
  {
    id: 5,
    name: "Pheasant Branch Conservancy",
    location: "4892 Pheasant Branch Rd, Middleton, WI",
    difficulty: "Easy",
    distance: "4 miles",
    rating: 4.7,
    description: "A prairie and oak savanna restoration area with spectacular spring wildflowers. Features a creek, prairie, and wooded areas.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    features: ["Prairie Views", "Wildflowers", "Dog Friendly", "Bird Watching"],
    elevation: "60 ft",
    duration: "1.5 hrs",
    coordinates: { lat: 43.1091, lng: -89.5143 },
    reviews: []
  },
  {
    id: 6,
    name: "Lakeshore Nature Preserve",
    location: "685 N Park St, Madison, WI",
    difficulty: "Easy",
    distance: "3 miles",
    rating: 4.6,
    description: "Beautiful trails along Lake Mendota on the UW-Madison campus. Features diverse ecosystems including forests, prairies, and wetlands.",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800",
    features: ["Campus Location", "Lake Views", "Educational", "Free Parking"],
    elevation: "40 ft",
    duration: "1 hr",
    coordinates: { lat: 43.0765, lng: -89.4073 },
    reviews: []
  },
  {
    id: 7,
    name: "Elver Park",
    location: "1250 McKenna Blvd, Madison, WI",
    difficulty: "Easy",
    distance: "2 miles",
    rating: 4.0,
    description: "Urban park with paved and unpaved trails. Great for families with playground and open green spaces.",
    image: "https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=800",
    features: ["Urban", "Family Friendly", "Accessible", "Dog Park"],
    elevation: "30 ft",
    duration: "45 min",
    coordinates: { lat: 43.0436, lng: -89.4692 },
    reviews: []
  },
  {
    id: 8,
    name: "Owen Conservation Park",
    location: "6021 CTH BB, Madison, WI",
    difficulty: "Moderate",
    distance: "4.2 miles",
    rating: 4.4,
    description: "Features restored prairies and oak woodlands. Great for bird watching and nature photography.",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
    features: ["Bird Watching", "Prairie", "Photography", "Nature Study"],
    elevation: "90 ft",
    duration: "1.5 hrs",
    coordinates: { lat: 43.0125, lng: -89.2954 },
    reviews: []
  },
  {
    id: 9,
    name: "Devil's Lake State Park",
    location: "S5975 Park Rd, Baraboo, WI",
    difficulty: "Hard",
    distance: "7.5 miles",
    rating: 4.9,
    description: "Wisconsin's most visited state park with stunning 500-foot quartzite bluffs and crystal-clear lake. Rock climbing and challenging hiking trails.",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800",
    features: ["Rock Climbing", "Swimming", "Scenic Views", "Camping"],
    elevation: "500 ft",
    duration: "4 hrs",
    coordinates: { lat: 43.4217, lng: -89.7284 },
    reviews: []
  },
  {
    id: 10,
    name: "Cherokee Marsh North",
    location: "6098 N Sherman Ave, Madison, WI",
    difficulty: "Easy",
    distance: "3.2 miles",
    rating: 4.1,
    description: "Wetland trails perfect for bird watching and nature photography. Home to diverse wildlife.",
    image: "https://images.unsplash.com/photo-1475776408506-9a5371e7a068?w=800",
    features: ["Wetlands", "Bird Watching", "Nature Photography", "Wildlife"],
    elevation: "20 ft",
    duration: "1.5 hrs",
    coordinates: { lat: 43.1348, lng: -89.3526 },
    reviews: []
  },
  {
    id: 11,
    name: "University Bay Nature Trail",
    location: "University Bay Dr, Madison, WI",
    difficulty: "Easy",
    distance: "1.8 miles",
    rating: 4.4,
    description: "Short scenic trail along Lake Mendota with beautiful sunset views. Popular with joggers and casual walkers.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    features: ["Sunset Views", "Short Trail", "Lake Access", "Jogging"],
    elevation: "15 ft",
    duration: "30 min",
    coordinates: { lat: 43.0863, lng: -89.4251 },
    reviews: []
  },
  {
    id: 12,
    name: "Kettle Moraine State Forest",
    location: "N1765 County Highway G, Campbellsport, WI",
    difficulty: "Moderate",
    distance: "5.8 miles",
    rating: 4.6,
    description: "Diverse terrain with glacial formations, forests, and scenic overlooks. Features unique geological formations.",
    image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800",
    features: ["Glacial Formations", "Forest", "Camping", "Scenic Overlooks"],
    elevation: "200 ft",
    duration: "2.5 hrs",
    coordinates: { lat: 43.5783, lng: -88.2876 },
    reviews: []
  },
  {
    id: 13,
    name: "Aldo Leopold Nature Center",
    location: "330 Femrite Dr, Monona, WI",
    difficulty: "Easy",
    distance: "2.5 miles",
    rating: 4.3,
    description: "Educational nature trails through diverse ecosystems and restored prairie. Named after the famous conservationist.",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
    features: ["Educational", "Family Friendly", "Interpretive Signs", "Programs"],
    elevation: "35 ft",
    duration: "1 hr",
    coordinates: { lat: 43.0534, lng: -89.3398 },
    reviews: []
  },
  {
    id: 14,
    name: "CamRock County Park",
    location: "3825 Lake Farm Rd, Cambridge, WI",
    difficulty: "Moderate",
    distance: "6.2 miles",
    rating: 4.5,
    description: "Rolling hills, prairies, and woodlands with excellent mountain biking trails. Very popular with cyclists.",
    image: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?w=800",
    features: ["Mountain Biking", "Prairie", "Rolling Hills", "Horseback Riding"],
    elevation: "180 ft",
    duration: "2.5 hrs",
    coordinates: { lat: 42.9989, lng: -89.0237 },
    reviews: []
  },
  {
    id: 15,
    name: "Stewart Lake County Park",
    location: "201 County Highway N, Mount Horeb, WI",
    difficulty: "Easy",
    distance: "2.8 miles",
    rating: 4.2,
    description: "Peaceful lake trail with fishing access and picnic areas. Great for families and beginner hikers.",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    features: ["Fishing", "Lake Views", "Picnic Areas", "Swimming"],
    elevation: "45 ft",
    duration: "1 hr",
    coordinates: { lat: 43.0142, lng: -89.7598 },
    reviews: []
  },
  {
    id: 16,
    name: "Ice Age Trail - Verona Segment",
    location: "Verona, WI",
    difficulty: "Moderate",
    distance: "8.5 miles",
    rating: 4.7,
    description: "Part of the famous 1,200-mile Ice Age National Scenic Trail. Features glacial landscape and prairie restoration.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    features: ["Historic Trail", "Glacial Features", "Prairie", "Long Distance"],
    elevation: "250 ft",
    duration: "3.5 hrs",
    coordinates: { lat: 42.9907, lng: -89.5334 },
    reviews: []
  },
  {
    id: 17,
    name: "Capital City State Trail",
    location: "Multiple Access Points, Madison, WI",
    difficulty: "Easy",
    distance: "17 miles",
    rating: 4.4,
    description: "Paved trail connecting Madison to Cottage Grove through beautiful countryside. Perfect for biking and long walks.",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800",
    features: ["Paved Trail", "Biking", "Long Distance", "Multiple Access"],
    elevation: "100 ft",
    duration: "Variable",
    coordinates: { lat: 43.0731, lng: -89.4012 },
    reviews: []
  },
  {
    id: 18,
    name: "Donald Park",
    location: "4305 Donald Dr, Madison, WI",
    difficulty: "Easy",
    distance: "1.5 miles",
    rating: 4.1,
    description: "Small neighborhood park with wooded trails and a playground. Perfect for a quick nature walk with kids.",
    image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800",
    features: ["Family Friendly", "Short Trail", "Playground", "Stream"],
    elevation: "25 ft",
    duration: "30 min",
    coordinates: { lat: 43.0289, lng: -89.5123 },
    reviews: []
  },
  {
    id: 19,
    name: "Token Creek County Park",
    location: "6200 US Highway 51, DeForest, WI",
    difficulty: "Moderate",
    distance: "5 miles",
    rating: 4.3,
    description: "Large county park with diverse habitats including prairie, forest, and wetlands. Great for camping and fishing.",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800",
    features: ["Camping", "Fishing", "Dog Friendly", "Diverse Habitats"],
    elevation: "95 ft",
    duration: "2 hrs",
    coordinates: { lat: 43.1876, lng: -89.3145 },
    reviews: []
  },
  {
    id: 20,
    name: "Pope Farm Conservancy",
    location: "Pope Road, Verona, WI",
    difficulty: "Easy",
    distance: "3.8 miles",
    rating: 4.8,
    description: "Famous for stunning sunflower fields in late summer! Rolling hills with prairie and savanna restoration. Absolutely gorgeous views.",
    image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=800",
    features: ["Sunflower Fields", "Prairie", "Sunset Views", "Photography"],
    elevation: "110 ft",
    duration: "1.5 hrs",
    coordinates: { lat: 42.9745, lng: -89.5687 },
    reviews: []
  }
];

function App() {
  const [trails, setTrails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // 设置路线数据
    setTrails(trailsData);
    
    // 从 localStorage 加载收藏
    const savedFavorites = localStorage.getItem('favoriteTrails');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // 监听窗口大小变化
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFavorite = (trailId) => {
    let newFavorites;
    if (favorites.includes(trailId)) {
      newFavorites = favorites.filter(id => id !== trailId);
    } else {
      newFavorites = [...favorites, trailId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTrails', JSON.stringify(newFavorites));
  };

  const addReview = (trailId, review) => {
    const updatedTrails = trails.map(trail => {
      if (trail.id === trailId) {
        const newReview = {
          ...review,
          id: Date.now(),
          date: new Date().toISOString().split('T')[0]
        };
        return {
          ...trail,
          reviews: [...trail.reviews, newReview]
        };
      }
      return trail;
    });
    setTrails(updatedTrails);
  };

  // 搜索过滤
  const filteredTrails = trails.filter(trail =>
    trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trail.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trail.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserRouter>
      <div className="App">
        {/* 桌面端侧边栏 */}
        {!isMobile && (
          <Sidebar 
            trails={trails}
            favorites={favorites}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        )}

        {/* 移动端底部导航 */}
        {isMobile && (
          <MobileNav 
            trails={trails}
            favorites={favorites}
          />
        )}

        {/* 主内容区域 */}
        <div className={`main-content ${!isMobile && sidebarOpen ? 'sidebar-open' : ''}`}>
          {/* 顶部搜索栏 */}
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            showMenu={!isMobile}
          />

          <Routes>
            <Route 
              path="/" 
              element={
                <TrailList 
                  trails={filteredTrails}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  isMobile={isMobile}
                />
              } 
            />
            <Route 
              path="/trail/:id" 
              element={
                <TrailDetail 
                  trails={trails}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  addReview={addReview}
                  isMobile={isMobile}
                />
              } 
            />
            <Route 
              path="/about" 
              element={<About />} 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;