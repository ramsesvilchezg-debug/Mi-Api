// src/firebase.js: conexión con Firebase (solo Authentication)
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Mismo proyecto de Firebase que la app de Pokémon (fir-dfe10)
const firebaseConfig = {
  apiKey: 'AIzaSyDkMRmFREtsJNCc3fez3c-BubFZI07AYdo',
  authDomain: 'fir-dfe10.firebaseapp.com',
  projectId: 'fir-dfe10',
  storageBucket: 'fir-dfe10.firebasestorage.app',
  messagingSenderId: '263805450492',
  appId: '1:263805450492:web:ce434f81dcaaf1ceb03f79',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
