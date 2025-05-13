class JuegoAdivinaNumero {
  constructor(min = 1, max = 100) {
    this._numeroSecreto = this._generarNumeroAleatorio(min, max);
    this._intentos = 0;
    this._minimo = min;
    this._maximo = max;
    this._estadoJuego = 'jugando'; // 'jugando', 'ganado', 'perdido'
    this._maximoIntentos = 10;
    this._mensaje = `Adivina un número entre ${min} y ${max}`;
  }

  // Getters
  get numeroSecreto() {
    return this._numeroSecreto;
  }
  
  get intentos() {
    return this._intentos;
  }
  
  get minimo() {
    return this._minimo;
  }
  
  get maximo() {
    return this._maximo;
  }
  
  get estadoJuego() {
    return this._estadoJuego;
  }
  
  get maximoIntentos() {
    return this._maximoIntentos;
  }
  
  get mensaje() {
    return this._mensaje;
  }
  
  // Setters
  set maximoIntentos(value) {
    if (value > 0) {
      this._maximoIntentos = value;
    }
  }
  
  set mensaje(value) {
    this._mensaje = value;
  }
  
  // Métodos
  _generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  intentarAdivinar(numero) {
    this._intentos++;
    
    if (numero === this._numeroSecreto) {
      this._estadoJuego = 'ganado';
      this._mensaje = `¡Felicidades! Has adivinado el número ${this._numeroSecreto} en ${this._intentos} intentos.`;
      return true;
    } else if (this._intentos >= this._maximoIntentos) {
      this._estadoJuego = 'perdido';
      this._mensaje = `¡Has perdido! El número secreto era ${this._numeroSecreto}.`;
      return false;
    } else if (numero < this._numeroSecreto) {
      this._mensaje = `El número es mayor que ${numero}. Te quedan ${this._maximoIntentos - this._intentos} intentos.`;
      return false;
    } else {
      this._mensaje = `El número es menor que ${numero}. Te quedan ${this._maximoIntentos - this._intentos} intentos.`;
      return false;
    }
  }
  
  reiniciarJuego() {
    this._numeroSecreto = this._generarNumeroAleatorio(this._minimo, this._maximo);
    this._intentos = 0;
    this._estadoJuego = 'jugando';
    this._mensaje = `Adivina un número entre ${this._minimo} y ${this._maximo}`;
  }
}

export default JuegoAdivinaNumero;