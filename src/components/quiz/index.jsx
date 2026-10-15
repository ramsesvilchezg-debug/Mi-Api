import { useEffect, useState } from 'react'
import './style.css'

const TOTAL_PREGUNTAS = 5

function mezclar(lista) {
  return [...lista].sort(() => Math.random() - 0.5)
}

function crearPreguntas(usuarios) {
  const ciudades = [...new Set(usuarios.map((u) => u.address.city))]

  return mezclar(usuarios)
    .slice(0, TOTAL_PREGUNTAS)
    .map((usuario) => {
      const correcta = usuario.address.city
      const otras = mezclar(ciudades.filter((c) => c !== correcta)).slice(0, 3)
      return {
        id: usuario.id,
        nombre: usuario.name,
        correcta,
        opciones: mezclar([correcta, ...otras]),
      }
    })
}

function Quiz() {
  const [usuarios, setUsuarios] = useState([])
  const [preguntas, setPreguntas] = useState([])
  const [indice, setIndice] = useState(0)
  const [puntos, setPuntos] = useState(0)
  const [elegida, setElegida] = useState(null)
  const [terminado, setTerminado] = useState(false)
  const [error, setError] = useState(false)
  const [mejor, setMejor] = useState(() => Number(localStorage.getItem('mejorQuiz') || 0))

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('Respuesta inválida')
        return respuesta.json()
      })
      .then((datos) => {
        setUsuarios(datos)
        setPreguntas(crearPreguntas(datos))
      })
      .catch((e) => {
        console.error('Error:', e)
        setError(true)
      })
  }, [])

  const responder = (opcion) => {
    if (elegida) return
    setElegida(opcion)
    if (opcion === preguntas[indice].correcta) {
      setPuntos((p) => p + 1)
    }
  }

  const siguiente = () => {
    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1)
      setElegida(null)
      return
    }
    if (puntos > mejor) {
      setMejor(puntos)
      localStorage.setItem('mejorQuiz', String(puntos))
    }
    setTerminado(true)
  }

  const reiniciar = () => {
    setPreguntas(crearPreguntas(usuarios))
    setIndice(0)
    setPuntos(0)
    setElegida(null)
    setTerminado(false)
  }

  if (error) return <p>No se pudo cargar el quiz. Intenta de nuevo.</p>
  if (preguntas.length === 0) return <p>Cargando...</p>

  if (terminado) {
    return (
      <section className="c-quiz">
        <h1 className="c-quiz-titulo">Resultado</h1>
        <p className="c-quiz-puntos">{puntos} / {preguntas.length}</p>
        <p>Mejor puntaje: {mejor}</p>
        <button className="c-quiz-boton" onClick={reiniciar}>Jugar otra vez</button>
      </section>
    )
  }

  const pregunta = preguntas[indice]

  return (
    <section className="c-quiz">
      <h1 className="c-quiz-titulo">Quiz</h1>
      <p>Pregunta {indice + 1} de {preguntas.length} · Puntos: {puntos} · Mejor: {mejor}</p>

      <h2 className="c-quiz-pregunta">¿En qué ciudad vive {pregunta.nombre}?</h2>

      <div className="c-quiz-opciones">
        {pregunta.opciones.map((opcion) => {
          let clase = 'c-quiz-opcion'
          if (elegida) {
            if (opcion === pregunta.correcta) clase += ' correcta'
            else if (opcion === elegida) clase += ' incorrecta'
          }
          return (
            <button key={opcion} className={clase} onClick={() => responder(opcion)}>
              {opcion}
            </button>
          )
        })}
      </div>

      {elegida && (
        <button className="c-quiz-boton" onClick={siguiente}>
          {indice + 1 < preguntas.length ? 'Siguiente' : 'Ver resultado'}
        </button>
      )}
    </section>
  )
}

export default Quiz