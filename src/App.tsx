import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useCalculatorStore } from './store/calculatorStore'

// Pages
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const { theme } = useCalculatorStore((state) => ({ theme: state.theme }))

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'classic', 'neon');
    if (theme !== 'light' && theme !== 'system') {
      document.documentElement.classList.add(theme);
    }
    // Handle system preference if theme is 'system'
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App