import { useState } from 'react'
import './style.css'

function Usuarios() {
  const [nombre, setNombre] = useState(() => localStorage.getItem('nombreUsuario') || '')
  const [favoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]')
    } catch {
      return []
    }
  })
  const [capturados] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('misNumeros') || '[]')
    } catch {
      return []
    }
  })

  const cambiarNombre = (e) => {
    setNombre(e.target.value)
    localStorage.setItem('nombreUsuario', e.target.value)
  }

  return (
    <main className="c-usuario">
      <h1 className="c-usuario-titulo">{nombre === '' ? 'Usuario' : nombre}</h1>

      <input
        type="text"
        placeholder="Escribe tu nombre"
        value={nombre}
        onChange={cambiarNombre}
        className="c-usuario-input"
      />

      <div className="c-usuario-datos">
        <p>Favoritos: {favoritos.length}</p>
        <p>Usuarios en la colección: {capturados.length}</p>
      </div>
    </main>
  )
}

export default Usuarios