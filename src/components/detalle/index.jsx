import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import './style.css'

function Detalle() {
    const { id } = useParams();
    const [datauser, setDatauser] = useState([]);
    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritos') || '[]');
        } catch {
            return [];
        }
    });
    const esFavorito = favoritos.some(p => p.id === datauser.id);

    useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(responseData => setDatauser(responseData))
      .catch(error => console.error("Error:", error));
    }, [id]);

    const toggleFavorito = () => {
        let nuevosFavoritos;
        if (esFavorito) {
        nuevosFavoritos = favoritos.filter(p => p.id !== datauser.id);
        } else {
        nuevosFavoritos = [...favoritos, { id: datauser.id, nombre: datauser.name }];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    };

    if (!datauser || !datauser.id) return <p>Cargando...</p>;
    return (
        <main className="c-detalle">
            <h1 className="c-detalle-titulo">{datauser.name}</h1>
            <p>Endpoint: https://jsonplaceholder.typicode.com/users/{datauser.id}</p>

            <div className="c-detalle-datos">
                <p>ID: {datauser.id}</p>
                <p>Usuario: {datauser.username}</p>
                <p>Email: {datauser.email}</p>
                <p>Teléfono: {datauser.phone}</p>
                <p>Sitio web: {datauser.website}</p>
            </div>

            <div className="c-detalle-datos">
                <p>Dirección: {datauser.address.street} {datauser.address.suite}, {datauser.address.city} ({datauser.address.zipcode})</p>
                <p>Latitud: {datauser.address.geo.lat} Longitud: {datauser.address.geo.lng}</p>
            </div>

            <div className="c-detalle-datos">
                <p>Empresa: {datauser.company.name}</p>
                <p>Lema: {datauser.company.catchPhrase}</p>
            </div>

            <button className="c-detalle-boton" onClick={toggleFavorito}>
            {esFavorito ? '❤️' : '🤍'}
            </button>
        </main>
    )
}

export default Detalle