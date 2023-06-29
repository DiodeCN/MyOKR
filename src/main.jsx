import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Editor from './Editor/Editor';
import './index.css'
import './eindex.css'

function RouteConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouteConfig />
  </React.StrictMode>
)
