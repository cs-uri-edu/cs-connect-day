import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/horizontal-logo4.png';
import './NavBar.css';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const registerRef = useRef(null);

    function closeMenu() {
        setMenuOpen(false);
        setRegisterOpen(false);
    }

    function toggleRegisterMenu() {
        setRegisterOpen((currentValue) => !currentValue);
    }

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                registerRef.current &&
                !registerRef.current.contains(event.target)
            ) {
                setRegisterOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                setRegisterOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <header className="navbar">
            <Link
                to="/"
                className="navbar__brand"
                aria-label="URI CS Connect Day home"
                onClick={closeMenu}
            >
                <img
                    src={logo}
                    alt="URI CS Connect Day Logo"
                    className="navbar__logo"
                />
            </Link>

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

            <nav
                id="primary-navigation"
                className={`navbar__links ${
                    menuOpen ? 'navbar__links--open' : ''
                }`}
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
                    to="/agenda"
                    className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={closeMenu}
                >
                    Agenda
                </NavLink>

                <NavLink
                    to="/partner-with-us"
                    className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={closeMenu}
                >
                    Partner With Us
                </NavLink>

                <div className="navbar__dropdown" ref={registerRef}>
                    <button
                        type="button"
                        className="navbar__button navbar__dropdown-toggle"
                        onClick={toggleRegisterMenu}
                        aria-expanded={registerOpen}
                        aria-haspopup="true"
                        aria-controls="registration-menu"
                    >
                        Register

                        <span
                            className={`navbar__dropdown-arrow ${
                                registerOpen
                                    ? 'navbar__dropdown-arrow--open'
                                    : ''
                            }`}
                            aria-hidden="true"
                        ></span>
                    </button>

                    <div
                        id="registration-menu"
                        className={`navbar__dropdown-menu ${
                            registerOpen
                                ? 'navbar__dropdown-menu--open'
                                : ''
                        }`}
                    >
                        <a
                            href="https://app.joinhandshake.com/stu/events/1957249"
                            className="navbar__dropdown-item"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                        >
                            <span className="navbar__dropdown-title">
                                Main Event
                            </span>

                            <span className="navbar__dropdown-description">
                                Keynote, Panels & Networking Lunch
                            </span>
                        </a>

                        <Link
                            to="/workshops"
                            className="navbar__dropdown-item"
                            onClick={closeMenu}
                        >
                            <span className="navbar__dropdown-title">
                                Workshops
                            </span>

                            <span className="navbar__dropdown-description">
                                Browse Sessions & Reserve Seat
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;