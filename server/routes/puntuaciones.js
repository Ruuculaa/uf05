const express = require('express');
const router = express.Router();
const Puntuacion = require('../models/Puntuacion');

// Obtener todas las puntuaciones
router.get('/', async (req, res) => {
  try {
    const puntuaciones = await Puntuacion.find().sort({ fecha: -1 });
    res.json(puntuaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// Obtener las mejores puntuaciones por dificultad
router.get('/mejores/:dificultad', async (req, res) => {
  try {
    const puntuaciones = await Puntuacion.find({
      dificultad: req.params.dificultad,
      resultado: 'ganado'
    }).sort({ intentos: 1 }).limit(10);
    
    res.json(puntuaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// Guardar una nueva puntuación
router.post('/', async (req, res) => {
  try {
    const nuevaPuntuacion = new Puntuacion(req.body);
    await nuevaPuntuacion.save();
    res.status(201).json(nuevaPuntuacion);
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: error.message });
  }
});

module.exports = router;