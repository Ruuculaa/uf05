import React from 'react';
import AdivinaNumeroGame from './components/AdivinaNumeroGame';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Juego Adivina el Número</h1>
      <AdivinaNumeroGame />
    </div>
  );
}

export default App;