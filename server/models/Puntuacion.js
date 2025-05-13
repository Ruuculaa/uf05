const mongoose = require('mongoose');

const PuntuacionSchema = new mongoose.Schema({
  nombreJugador: {
    type: String,
    required: true,
    trim: true
  },
  dificultad: {
    type: String,
    enum: ['facil', 'normal', 'dificil'],
    required: true
  },
  intentos: {
    type: Number,
    required: true
  },
  numeroAdivinado: {
    type: Number,
    required: true
  },
  resultado: {
    type: String,
    enum: ['ganado', 'perdido'],
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Puntuacion', PuntuacionSchema);