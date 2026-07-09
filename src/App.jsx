import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import PartnerWithUs from './pages/PartnerWithUs';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>

      <ScrollToTop />

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
