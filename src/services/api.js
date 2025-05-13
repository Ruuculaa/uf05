const API_URL = 'http://localhost:5000/api';

export const guardarPuntuacion = async (puntuacion) => {
  try {
    const response = await fetch(`${API_URL}/puntuaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(puntuacion)
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar la puntuación');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const obtenerMejoresPuntuaciones = async (dificultad) => {
  try {
    const response = await fetch(`${API_URL}/puntuaciones/mejores/${dificultad}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener las puntuaciones');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const obtenerTodasPuntuaciones = async () => {
  try {
    const response = await fetch(`${API_URL}/puntuaciones`);
    
    if (!response.ok) {
      throw new Error('Error al obtener las puntuaciones');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};