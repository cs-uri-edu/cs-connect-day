import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import PartnerWithUs from './pages/PartnerWithUs';
import Workshops from './pages/Workshops';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <ScrollToTop />

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/workshops" element={<Workshops />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
