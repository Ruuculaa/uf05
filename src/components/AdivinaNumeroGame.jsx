// src/components/AdivinaNumeroGame.jsx

import React, { useState, useEffect } from 'react';
import JuegoAdivinaNumero from '../clases/juegoAdivinarNumero';

const AdivinaNumeroGame = () => {
  const [valorInput, setValorInput] = useState('');
  const [juego, setJuego] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [historialIntentos, setHistorialIntentos] = useState([]);
  const [dificultad, setDificultad] = useState('normal');

  // Inicializar el juego
  useEffect(() => {
    iniciarNuevoJuego();
  }, []);

  const iniciarNuevoJuego = () => {
    let min = 1;
    let max = 100;
    let maxIntentos = 10;
    
    // Configurar dificultad
    if (dificultad === 'facil') {
      max = 50;
      maxIntentos = 15;
    } else if (dificultad === 'dificil') {
      max = 200;
      maxIntentos = 7;
    }
    
    const nuevoJuego = new JuegoAdivinaNumero(min, max);
    nuevoJuego.maximoIntentos = maxIntentos;
    setJuego(nuevoJuego);
    setMensaje(nuevoJuego.mensaje);
    setHistorialIntentos([]);
    setValorInput('');
  };

  const cambiarDificultad = (e) => {
    setDificultad(e.target.value);
    setTimeout(() => iniciarNuevoJuego(), 100);
  };

  const handleAdivinar = () => {
    if (!valorInput || juego.estadoJuego !== 'jugando') return;
    
    const numeroIntento = parseInt(valorInput);
    if (isNaN(numeroIntento)) {
      setMensaje('Por favor, introduce un número válido');
      return;
    }
    
    // Registrar el intento en el historial
    const nuevoIntento = {
      numero: numeroIntento,
      intento: juego.intentos + 1
    };
    
    setHistorialIntentos([...historialIntentos, nuevoIntento]);
    
    // Procesar el intento
    juego.intentarAdivinar(numeroIntento);
    setMensaje(juego.mensaje);
    setValorInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdivinar();
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Adivina el Número</h1>
      
      <div className="mb-4 w-full">
        <label className="block text-gray-700 mb-2">Dificultad:</label>
        <select 
          value={dificultad} 
          onChange={cambiarDificultad}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="facil">Fácil (1-50, 15 intentos)</option>
          <option value="normal">Normal (1-100, 10 intentos)</option>
          <option value="dificil">Difícil (1-200, 7 intentos)</option>
        </select>
      </div>
      
      <div className="mb-4 p-3 w-full bg-indigo-100 rounded text-center">
        <p className="text-lg">{mensaje}</p>
      </div>
      
      <div className="w-full flex mb-4">
        <input
          type="number"
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={juego && juego.estadoJuego !== 'jugando'}
          className="flex-grow p-2 border border-gray-300 rounded-l"
          placeholder="Introduce tu número"
        />
        <button 
          onClick={handleAdivinar} 
          disabled={juego && juego.estadoJuego !== 'jugando'}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-r"
        >
          Adivinar
        </button>
      </div>
      
      {(juego && juego.estadoJuego !== 'jugando') && (
        <button 
          onClick={iniciarNuevoJuego}
          className="mb-4 bg-green-600 hover:bg-green-700 text-white p-2 rounded w-full"
        >
          Jugar de nuevo
        </button>
      )}
      
      {historialIntentos.length > 0 && (
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">Historial de intentos:</h2>
          <div className="max-h-40 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-1 bg-gray-200">Intento</th>
                  <th className="border p-1 bg-gray-200">Número</th>
                </tr>
              </thead>
              <tbody>
                {historialIntentos.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-1 text-center">{item.intento}</td>
                    <td className="border p-1 text-center">{item.numero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="mt-4 w-full text-sm text-gray-600">
        <p>Intentos: {juego ? juego.intentos : 0} / {juego ? juego.maximoIntentos : 10}</p>
      </div>
    </div>
  );
};

export default AdivinaNumeroGame;