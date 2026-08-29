/*
    Entry point for the React application:
    - Find the root element in index.html
    - Create the React root
    - Render the main App component inside React Strict Mode
*/


// Import React Strict Mode for additional development checks
import { StrictMode } from 'react'

// Import createRoot to render the React application in the browser
import { createRoot } from 'react-dom/client'

// Import global application styles 
import './index.css'

// Import the main App component
import App from './App.jsx'


// Find the root element in index.html, create the React root, and render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
