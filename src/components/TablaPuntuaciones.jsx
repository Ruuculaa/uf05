import React, { useState, useEffect } from 'react';
import { obtenerMejoresPuntuaciones } from '../services/api';

const TablaPuntuaciones = ({ dificultad }) => {
  const [puntuaciones, setPuntuaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPuntuaciones = async () => {
      try {
        setCargando(true);
        const data = await obtenerMejoresPuntuaciones(dificultad);
        setPuntuaciones(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las puntuaciones');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargarPuntuaciones();
  }, [dificultad]);

  if (cargando) return <p className="text-center">Cargando puntuaciones...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Mejores Puntuaciones - {dificultad.charAt(0).toUpperCase() + dificultad.slice(1)}
      </h2>
      
      {puntuaciones.length === 0 ? (
        <p className="text-center">No hay puntuaciones registradas para esta dificultad</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Jugador</th>
                <th className="border p-2">Intentos</th>
                <th className="border p-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {puntuaciones.map((p, index) => (
                <tr key={p._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="border p-2 text-center">{p.nombreJugador}</td>
                  <td className="border p-2 text-center">{p.intentos}</td>
                  <td className="border p-2 text-center">
                    {new Date(p.fecha).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablaPuntuaciones;