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
        (isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none')
      }
    >
      <nav
        aria-label="Primary"
        className="inline-flex items-center gap-1 rounded-lg border-[3px] border-ink bg-paper px-1.5 py-1 shadow-nb"
      >
        {pages.map((p) => (
          <NavLink
            key={p.path}
            to={p.path}
            className={({ isActive }) =>
              'px-4 py-1.5 text-sm font-bold rounded-md border-2 transition-colors ' +
              (isActive
                ? 'bg-mustard border-ink text-ink'
                : 'border-transparent text-ink hover:bg-lavender hover:border-ink')
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
      <div className="relative min-h-screen bg-cream text-ink">
        <Navigation />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
