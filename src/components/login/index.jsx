import { useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../../firebase'
import './style.css'

// Traduce los códigos de error de Firebase a mensajes en español
function mensajeError(codigo) {
  const mensajes = {
    'auth/invalid-email': 'El correo no es válido.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/user-not-found': 'No existe una cuenta con ese correo.',
    'auth/wrong-password': 'Correo o contraseña incorrectos.',
    'auth/email-already-in-use': 'Ese correo ya está registrado. Inicia sesión.',
    'auth/weak-password': 'La contraseña debe tener mínimo 6 caracteres.',
    'auth/missing-password': 'Escribe la contraseña.',
    'auth/too-many-requests': 'Demasiados intentos. Espera un momento.',
    'auth/network-request-failed': 'Sin conexión a internet.',
  }
  return mensajes[codigo] || 'Ocurrió un error. Intenta de nuevo.'
}

function Login() {
  const [modo, setModo] = useState('login') // 'login' | 'registro'
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const esRegistro = modo === 'registro'

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      if (esRegistro) {
        const { user } = await createUserWithEmailAndPassword(auth, correo.trim(), contrasena)
        if (nombre.trim()) {
          await updateProfile(user, { displayName: nombre.trim() })
          localStorage.setItem('nombreUsuario', nombre.trim())
        }
      } else {
        await signInWithEmailAndPassword(auth, correo.trim(), contrasena)
      }
      // No hay que navegar: App.jsx detecta la sesión y muestra la app
    } catch (err) {
      setError(mensajeError(err.code))
    } finally {
      setEnviando(false)
    }
  }

  const cambiarModo = () => {
    setModo(esRegistro ? 'login' : 'registro')
    setError('')
  }

  return (
    <main className="c-login">
      <h1 className="c-login-titulo">{esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h1>

      <form className="c-login-form" onSubmit={enviar}>
        {esRegistro && (
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="c-login-input"
          />
        )}
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="c-login-input"
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder={esRegistro ? 'Contraseña (mínimo 6)' : 'Contraseña'}
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="c-login-input"
          autoComplete={esRegistro ? 'new-password' : 'current-password'}
          required
        />

        {error && <p className="c-login-error">{error}</p>}

        <button type="submit" className="c-login-boton" disabled={enviando}>
          {enviando ? 'Un momento...' : esRegistro ? 'Registrarme' : 'Ingresar'}
        </button>
      </form>

      <button type="button" className="c-login-cambiar" onClick={cambiarModo}>
        {esRegistro ? 'Ya tengo cuenta' : 'No tengo cuenta, registrarme'}
      </button>
    </main>
  )
}

export default Login
