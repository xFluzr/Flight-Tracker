import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Upewnij się, że masz już ten plik, jeśli nie - stwórz go lub usuń import tymczasowo
import AdminPanel from './components/AdminPanel.jsx' 
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)