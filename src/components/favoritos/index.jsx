import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });

  return (
    <>
      {favoritos.length === 0 && <p>No tienes favoritos.</p>}
      <div className="c-lista-fav">
        {favoritos.map((user) => (
          <div
            key={user.id}
            className="c-fav-user"
            onClick={() => navigate(`/detalle/${user.id}`)}
          >
            <p>{user.id}</p>
            <p>{user.nombre}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Favoritos