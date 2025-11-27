// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookForm from './pages/BookForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container">
            <Link to="/" className="navbar-brand fw-bold text-primary">
              📚 BookManager
            </Link>
            <div>
              {user ? (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted">Hola, {user.name}</span>
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <Link to="/login" className="btn btn-outline-primary btn-sm">Iniciar Sesión</Link>
                  <Link to="/register" className="btn btn-primary btn-sm">Registrarse</Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className="flex-grow-1 py-4">
          <div className="container">
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/books/new" element={<ProtectedRoute><BookForm /></ProtectedRoute>} />
              <Route path="/books/edit/:id" element={<ProtectedRoute><BookForm /></ProtectedRoute>} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-light py-3 mt-auto">
          <div className="container text-center text-muted">
            <small>Trabajo Integrador Final – Full Stack</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;