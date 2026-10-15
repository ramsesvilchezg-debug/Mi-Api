import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Coleccion() {
  const totalUsers = 10;
  const [listaCapturados, setListaCapturados] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('misNumeros') || '[]');
      return Array.isArray(guardados) ? [...new Set(guardados.map(Number))] : [];
    } catch {
      return [];
    }
  });
  const [usuarios, setUsuarios] = useState([]);
  const [nuevos, setNuevos] = useState([]);
  const navigate = useNavigate();
  const espacio = Array.from({ length: totalUsers }, (_, i) => i + 1);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((respuesta) => respuesta.json())
      .then((datos) => setUsuarios(datos))
      .catch((error) => console.error('Error al cargar usuarios:', error));
  }, []);

  const capturarAleatorios = () => {
    const seleccionados = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * totalUsers) + 1
    );
    const vistos = new Set(listaCapturados);
    const resultados = seleccionados.map((id) => {
      const repetido = vistos.has(id);
      vistos.add(id);
      return { id, repetido };
    });
    const actualizados = [...vistos];

    setListaCapturados(actualizados);
    setNuevos(resultados);
    localStorage.setItem('misNumeros', JSON.stringify(actualizados));
  };

  return (
    <main className="coleccion">
      <h1 className="coleccion-titulo">Colección</h1>
      <p className="coleccion-contador">{listaCapturados.length} <span>/ {totalUsers}</span></p>
      <button
        className="coleccion-boton"
        onClick={capturarAleatorios}
        disabled={listaCapturados.length >= totalUsers}
      >
        4 nuevos
      </button>

      {nuevos.length > 0 && <h2 className="coleccion-subtitulo">Tus nuevos usuarios</h2>}
      <section className="coleccion-nuevos">
        {nuevos.map(({ id, repetido }, indice) => (
          <div
            key={`${id}-${indice}`}
            className={repetido ? 'coleccion-nuevo repetido' : 'coleccion-nuevo'}
            onClick={() => navigate(`/detalle/${id}`)}
          >
            <p>{id}</p>
            <p>{usuarios[id - 1]?.name || ''}</p>
          </div>
        ))}
      </section>

      <section className="coleccion-album">
        {espacio.map((id) => {
          const capturado = listaCapturados.includes(id);
          return (
            <div
              key={id}
              className={capturado ? 'coleccion-user capturado' : 'coleccion-user'}
              onClick={() => capturado && navigate(`/detalle/${id}`)}
            >
              <p>{id}</p>
              {capturado && <p>{usuarios[id - 1]?.username || ''}</p>}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Coleccion;