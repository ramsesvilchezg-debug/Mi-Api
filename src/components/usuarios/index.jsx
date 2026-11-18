import { useState } from 'react'
import { signOut, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'
import './style.css'

function Usuarios() {
  const usuario = auth.currentUser // aquí siempre hay sesión
  const [nombre, setNombre] = useState(
    () => localStorage.getItem('nombreUsuario') || usuario?.displayName || ''
  )
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

  // Guarda el nombre también en la cuenta de Firebase
  const guardarNombre = () => {
    if (usuario) updateProfile(usuario, { displayName: nombre.trim() }).catch(console.error)
  }

  return (
    <main className="c-usuario">
      <h1 className="c-usuario-titulo">{nombre === '' ? 'Usuario' : nombre}</h1>

      <input
        type="text"
        placeholder="Escribe tu nombre"
        value={nombre}
        onChange={cambiarNombre}
        onBlur={guardarNombre}
        className="c-usuario-input"
      />

      <div className="c-usuario-datos">
        <p>Correo: {usuario?.email}</p>
        <p>Favoritos: {favoritos.length}</p>
        <p>Usuarios en la colección: {capturados.length}</p>
      </div>

      <button type="button" className="c-usuario-salir" onClick={() => signOut(auth)}>
        Cerrar sesión
      </button>
    </main>
  )
}

export default Usuarios
