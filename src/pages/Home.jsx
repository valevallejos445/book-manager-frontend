// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Libros</h2>
        <button onClick={() => navigate('/books/new')} className="btn btn-primary">
          + Agregar Libro
        </button>
      </div>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-muted">No hay libros aún.</p>
      ) : (
        <div className="row">
          {books.map(book => (
            <div key={book._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text text-muted">Por: {book.author}</p>
                  <p className="card-text flex-grow-1">{book.description}</p>
                  <div className="mt-auto">
                    <small className="text-muted">
                      Agregado por: {book.userId?.name || 'Usuario'}
                    </small>
                  </div>
                </div>
                <div className="card-footer bg-white">
                  <button
                    onClick={() => navigate(`/books/edit/${book._id}`)}
                    className="btn btn-outline-primary btn-sm me-2"
                  >
                    Editar
                  </button>
                  <button className="btn btn-outline-danger btn-sm">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}