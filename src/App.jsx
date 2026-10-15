import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Inicio from "./components/inicio";
import Favoritos from "./components/favoritos";
import Informacion from "./components/informacion";
import Coleccion from "./components/coleccion"
import Usuarios from "./components/usuarios"
import Detalle from "./components/detalle"
import './App.css'

function App() {

  return (
    <>
      <Router>
        <nav className='c-menu'>
          <Link to="/">Inicio</Link>
          <Link to="/coleccion">Colección</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/informacion">Información</Link>
          <Link to="/usuarios">Usuarios</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Inicio />} />
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