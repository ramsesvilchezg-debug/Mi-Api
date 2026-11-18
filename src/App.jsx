import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import Inicio from "./components/inicio";
import Favoritos from "./components/favoritos";
import Informacion from "./components/informacion";
import Coleccion from "./components/coleccion"
import Usuarios from "./components/usuarios"
import Detalle from "./components/detalle"
import Quiz from "./components/quiz"
import Login from "./components/login"
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  // Firebase avisa cada vez que alguien inicia o cierra sesión
  useEffect(() => {
    const dejarDeEscuchar = onAuthStateChanged(auth, (user) => {
      setUsuario(user)
      setCargando(false)
    })
    return dejarDeEscuchar
  }, [])

  if (cargando) return <p className="c-cargando">Cargando...</p>

  // Sin sesión solo se ve el login
  if (!usuario) return <Login />

  return (
    <>
      <Router>
        <nav className='c-menu'>
          <Link to="/quiz">Quiz</Link>
          <Link to="/">Inicio</Link>
          <Link to="/coleccion">Colección</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/informacion">Información</Link>
          <Link to="/usuarios">Usuarios</Link>
          <button type="button" className="c-salir" onClick={() => signOut(auth)}>Salir</button>
        </nav>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/coleccion" element={<Coleccion />} />
          <Route path="/informacion" element={<Informacion />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/detalle/:id" element={<Detalle />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
