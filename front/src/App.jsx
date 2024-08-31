import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './css/App.css'
import './css/aut.css'
import Aut from './aut'
import Home from './home'

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isAuthenticated = localStorage.getItem('aut_data')
  const ProtectedRoute = ({ children }) => {
    if (isAuthenticated === null) {
      return <Navigate to="/aut" replace />
    }
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="aut" element={<Aut />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
