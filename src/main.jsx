import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { preloadRoute } from './routeTable'

// Load the opened page's code-split chunk first, so React's first render
// replaces the prerendered HTML with the same page — never a blank frame.
// Until then the prerendered HTML simply stays on screen.
const render = () => createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
preloadRoute(window.location.pathname).then(render, render)
