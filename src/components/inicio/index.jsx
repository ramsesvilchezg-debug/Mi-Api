import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Inicio() {
  const [todoslosusers, setTodoslosusers] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [ciudad, setCiudad] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const responseData = await response.json()

        if (ciudad === 'All') {
          setTodoslosusers(responseData ?? [])
          return
        }

        const usuariosCiudad = responseData?.filter((user) => user.address.city === ciudad) ?? []
        setTodoslosusers(usuariosCiudad)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    cargarUsuarios()
  }, [ciudad])

  const resultados = busqueda.trim().length >= 3 && isNaN(busqueda)
    ? todoslosusers.filter((user) =>
        user.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : todoslosusers

  const ciudades = [
    'All',
    'Gwenborough', 'Wisokyburgh', 'McKenziehaven', 'South Elvis', 'Roscoeview',
    'South Christy', 'Howemouth', 'Aliyaview', 'Bartholomebury', 'Lebsackbury'
  ]

  return (
    <>
      <div className="c-filtro">
        {ciudades.map((unaCiudad, index) => (
          <button type="button" key={index} onClick={() => setCiudad(unaCiudad)}>
            {unaCiudad}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar usuario"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      {todoslosusers.length === 0 && <p>Cargando...</p>}
      {todoslosusers.length > 0 && resultados.length === 0 && <p>No se encontraron usuarios.</p>}

      <div className="c-lista">
        {resultados.map((user) => (
          <div className="c-lista-user" key={user.id} onClick={() => navigate(`/detalle/${user.id}`)}>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.company.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Inicio