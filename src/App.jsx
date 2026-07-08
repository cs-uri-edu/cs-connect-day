import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>

      <ScrollToTop />

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
