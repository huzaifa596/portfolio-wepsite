import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/familjen-grotesk'
import '@fontsource-variable/hanken-grotesk'
import '@fontsource-variable/martian-mono'
import '@fontsource-variable/literata'
import './styles.css'
import './sections.css'
import './story.css'
import { App } from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
