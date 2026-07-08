import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/horizontal-logo.png';
import './NavBar.css';

function NavBar() {
    
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="navbar">
            <Link to="/" className="navbar__brand">
                <img src={logo} alt="URI CS Connect Day Logo" className="navbar__logo" />
            </Link>

            <button
                className="navbar__toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav
                className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}
                aria-label="Main navigation"
            >
                <NavLink to="/agenda" className="navbar__link" onClick={closeMenu}>Agenda</NavLink>
                <NavLink to="/" className="navbar__link" onClick={closeMenu}>Speakers</NavLink>
                <NavLink to="/" className="navbar__link" onClick={closeMenu}>Workshops</NavLink>
                <NavLink to="/" className="navbar__link" onClick={closeMenu}>Partner With Us</NavLink>

                <Link to="/" className="navbar__button" onClick={closeMenu}>Register</Link>
            </nav>
        </header>
    );
}

export default NavBar;