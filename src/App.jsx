/*
    Main application component:
    - Configure client-side routing
    - Render accessibility helpers
    - Render the shared navigation and footer
    - Render the appropriate page based on the current route
*/


/* 
    Import React Router components for client-side navigation:
    - HashRouter → Controls client-side routing using the URL hash
    - Routes → Container holding available routes
    - Route → Maps one URL path to one React component

    GitHub Pages serves the same static page and React handles everything after #
*/
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


// Import shared site components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';


// Import page components
import Home from './pages/Home';
import Program from './pages/Program';
import PartnerWithUs from './pages/PartnerWithUs';
import Workshops from './pages/Workshops';


// Import application-level styling
import './App.css';



function App() {
  return (
    <Router>
      {/* Allow keyboard users to bypass repeated navigation */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Scroll to the top whenever the route changes */}
      <ScrollToTop />

      {/* Shared site navigation */}
      <NavBar />

      {/* Render the page matching the current route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/workshops" element={<Workshops />} />
      </Routes>

      {/* Shared site footer */}
      <Footer />
    </Router>
  );
}

// Export the App component so main.jsx can render it
export default App;
