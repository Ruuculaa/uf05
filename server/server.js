const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const puntuacionesRoutes = require('./routes/puntuaciones');

// Conectar a MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/puntuaciones', puntuacionesRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});