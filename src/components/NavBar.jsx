// Import React hooks for managing state, references, and side effects
import { useEffect, useRef, useState } from 'react';

// Import React Router components for internal navigation
import { NavLink, Link } from 'react-router-dom';

// Import navigation logo
import logo from '../assets/horizontal-logo4.png';

// Import navigation bar styling
import './NavBar.css';

function NavBar() {
    // Track whether the mobile navigation menu is open
    //      menuOpen       → current value
    //      setMenuOpen()  → function that changes it
    //      start as false meaning menu starts closed
    const [menuOpen, setMenuOpen] = useState(false);


    // Track whether the Register dropdown menu is open
    //      registerOpen       → current value
    //      setRegisterOpen()  → function that changes it
    //      start as false meaning menu starts closed
    const [registerOpen, setRegisterOpen] = useState(false);


    // Create a reference to the Register dropdown container so clicks outside of it can be detected
    const registerRef = useRef(null);
    const registerButtonRef = useRef(null);


    // Close both the mobile navigation menu and Register dropdown
    function closeMenu() {
        setMenuOpen(false);
        setRegisterOpen(false);
    }


    // Toggle the Register dropdown between open and closed
    function toggleRegisterMenu() {
        setRegisterOpen((currentValue) => !currentValue);
    }



    // Add browser event listeners that close the Register dropdown when the user clicks outside it or presses Escape
    useEffect(() => {
        // Close the Register dropdown when the user clicks somewhere outside the dropdown container
        function handleOutsideClick(event) {
            if (registerRef.current && !registerRef.current.contains(event.target)) {
                setRegisterOpen(false);
            }
        }

        // Close the Register dropdown when the user presses Escape
        function handleEscape(event) {
            if (event.key === 'Escape' && registerOpen) {
                setRegisterOpen(false);
                registerButtonRef.current?.focus();
            }
        }

        // Listen for mouse clicks and keyboard input across the document
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);

        // Remove the event listeners when the component is unmounted to prevent duplicate listeners and memory leaks
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [registerOpen]);



    return (
        <header className="navbar">
            {/* Link the site logo to the home page */}
            <Link
                to="/"
                className="navbar__brand"
                aria-label="URI CS Connect Day home"
                onClick={closeMenu}
            >
                <img src={logo} alt="URI CS Connect Day Logo" className="navbar__logo"/>
            </Link>

            {/* Mobile button that toggles the main navigation menu */}
            <button
                type="button"
                className="navbar__toggle"
                onClick={() => {
                    setMenuOpen((currentValue) => !currentValue);
                    setRegisterOpen(false);
                }}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                aria-controls="primary-navigation"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>

            {/* Primary site navigation */}
            <nav
                id="primary-navigation"
                className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}
                aria-label="Main navigation"
            >
                <NavLink
                    to="/"
                    className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={closeMenu}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/program"
                    className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={closeMenu}
                >
                    Program
                </NavLink>

                <NavLink
                    to="/partner-with-us"
                    className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={closeMenu}
                >
                    Partner With Us
                </NavLink>

                {/* Register dropdown containing the main-event and workshop registration options */}
                <div className="navbar__dropdown" ref={registerRef}>
                    <button
                        ref={registerButtonRef}
                        type="button"
                        className="navbar__button navbar__dropdown-toggle"
                        onClick={toggleRegisterMenu}
                        aria-expanded={registerOpen}
                        aria-haspopup="true"
                        aria-controls="registration-menu"
                    >
                        Register

                        {/* Decorative arrow that rotates when the menu opens */}
                        <span
                            className={`navbar__dropdown-arrow ${registerOpen? 'navbar__dropdown-arrow--open': ''}`}
                            aria-hidden="true"
                        ></span>
                    </button>

                    {/* Registration options */}
                    <div
                        id="registration-menu"
                        className={`navbar__dropdown-menu ${registerOpen ? 'navbar__dropdown-menu--open' : ''}`}
                    >
                        {/* External registration page for the main event */}
                        <a
                            href="https://app.joinhandshake.com/stu/events/1957249"
                            className="navbar__dropdown-item"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                        >
                            <span className="navbar__dropdown-title">Main Event</span>

                            <span className="navbar__dropdown-description">Keynote, Panels & Networking Lunch</span>
                        </a>

                        {/* Internal workshop registration page */}
                        <Link
                            to="/workshops"
                            className="navbar__dropdown-item"
                            onClick={closeMenu}
                        >
                            <span className="navbar__dropdown-title">Workshops</span>

                            <span className="navbar__dropdown-description">Browse Sessions & Reserve Seat</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

// Export the NavBar component so it can be imported by App.jsx
export default NavBar;