import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useCalculatorStore } from './store/calculatorStore'

// Pages
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const { theme } = useCalculatorStore()

  // Apply theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
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