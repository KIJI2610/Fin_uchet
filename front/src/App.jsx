import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './css/App.css'
import './css/aut.css'
import './css/home.css'
import Aut from './aut'
import Home from './home'
import TrWindow from './TrWindow'
import Cards from './cards'
import AddCardPage from './AddCard'

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
        <Route path="/add_tr" element={<ProtectedRoute><TrWindow /></ProtectedRoute>} />
        <Route path="/cards" element={<ProtectedRoute><Cards /></ProtectedRoute>} />
        <Route path="/add_card" element={<ProtectedRoute><AddCardPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
