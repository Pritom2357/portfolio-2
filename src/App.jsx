import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'

const Navigation = () => {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const location = useLocation()

  const pages = useMemo(
    () => [
      { path: '/', label: 'Home' },
      { path: '/projects', label: 'Projects' },
      { path: '/contact', label: 'Contact' },
    ],
    [],
  )

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Only delay on home page for bento entrance animation
    const delayMs = location.pathname === '/' && !prefersReducedMotion ? 2600 : 300

    const timer = setTimeout(() => setIsNavVisible(true), delayMs)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div
      className={
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ' +
        (isNavVisible
          ? 'opacity-70 hover:opacity-100 focus-within:opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2 pointer-events-none')
      }
    >
      <nav
        aria-label="Primary"
        className="inline-flex items-center gap-1 rounded-full border border-slate-700/50 bg-slate-900/45 backdrop-blur-md px-1.5 py-1 shadow-lg shadow-black/20"
      >
        {pages.map((p) => (
          <NavLink
            key={p.path}
            to={p.path}
            className={({ isActive }) =>
              "px-4 py-1.5 text-sm font-medium rounded-full transition-colors " +
              (isActive
                ? 'bg-slate-700/60 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50')
            }
          >
            {p.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
