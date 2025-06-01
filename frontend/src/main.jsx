import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'

import HomePage from './pages/HomePage.jsx'
import HalamanUserPage from './pages/HalamanUserPage.jsx'
import UpdateUserPage from './pages/UpdateUserPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/pages/user" element={<HalamanUserPage />} />
        <Route path="/users/update/:userId" element={<UpdateUserPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
