// Import useEffect to run code when the current route changes
import { useEffect } from 'react';

// Import useLocation to access the current React Router URL
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    // Get the current route path (e.g., "/", "/agenda", or "/workshops")
    const { pathname } = useLocation();

    /* Scroll to the top whenever the route path changes 
        - top: 0 → scroll to the very top vertically
        - left: 0 → scroll to the far left horizontally
        - behavior: 'smooth' → animate the scroll rather than jumping instantly
    */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // This helper component does not render anything on the page
    return null;
}

// Export the component so it can be used in App.jsx
export default ScrollToTop;