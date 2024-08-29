import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import './css/aut.css'
import Aut from './aut'
import Home from './home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="aut" element={<Aut />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
