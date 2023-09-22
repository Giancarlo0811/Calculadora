let numeroActual = '';
let numeroAnterior = '';
let operador = '';

const numeroActualPantalla = document.querySelector('#numero-actual');
const numeroAnteriorPantalla = document.querySelector('#numero-anterior');

const igual = document.querySelector('#igual');
igual.addEventListener('click', () => {
    if (numeroActual != '' && numeroAnterior != '') {
        calcular();
    }
});

const punto = document.querySelector('#punto');
punto.addEventListener('click', () => {
    agregarDecimal();
});

const limpiar = document.querySelector('#limpiar');
limpiar.addEventListener('click', limpiarCalculadora);

const borrar = document.querySelector('#borrar');
borrar.addEventListener('click', borrarNumero);

const botonesNumero = document.querySelectorAll('.btn-num');

const operadores = document.querySelectorAll('.btn-operador');

botonesNumero.forEach(btn => {
    btn.addEventListener('click', (e) => {
        mostrarNumero(e.target.textContent);
    });
});

function mostrarNumero(numero) {
    if (numeroAnterior !== '' && numeroActual !== '' && operador === '') {
        numeroAnterior = '';
        numeroActualPantalla.textContent = numeroActual;

    }
    if (numeroActual.length <= 11) {
        numeroActual += numero;
        numeroActualPantalla.textContent = numeroActual;
    }
}

operadores.forEach(btn => {
    btn.addEventListener('click', (e) => {
        mostrarOperador(e.target.textContent);
    });
});

function mostrarOperador(op) {
    if (numeroAnterior === '') {
        numeroAnterior = numeroActual;
        checkOperador(op);
    } else if (numeroActual === '') {
        checkOperador(op);
    } else {
        calcular();
        operador = op;
        numeroAnteriorPantalla.textContent = numeroAnterior + ' ' + operador;
        numeroActualPantalla.textContent = '0';
    }
}

function checkOperador(texto) {
    operador = texto;
    numeroAnteriorPantalla.textContent = numeroAnterior + ' ' + operador;
    numeroActualPantalla.textContent = '';
    numeroActual = '';
}

function calcular() {
    numeroAnterior = Number(numeroAnterior);
    numeroActual = Number(numeroActual);

    if (operador === '+') {
        numeroAnterior += numeroActual;
    } else if (operador === '-') {
        numeroAnterior -= numeroActual;
    } else if (operador === '*') {
        numeroAnterior *= numeroActual;
    } else if (operador === '/') {
        if (numeroActual <= 0) {
            numeroAnterior = 'Error';
            mostrarResultado();
            return
        }
        numeroAnterior /= numeroActual;
    }
    numeroAnterior = redondear(numeroAnterior);
    numeroAnterior = numeroAnterior.toString();
    mostrarResultado();
}

function redondear(num) {
    return Math.round(num * 100000) / 100000;
}

function mostrarResultado() {
    if (numeroAnterior.length <= 11) {
        numeroActualPantalla.textContent = numeroAnterior;
    } else {
        numeroActualPantalla.textContent = numeroAnterior.slice(0,11) + '...';
    }

    numeroAnteriorPantalla.textContent = '';
    operador = '';
    numeroActual = '';
}

function limpiarCalculadora() {
    numeroActual = '';
    numeroAnterior = '';
    operador = '';
    numeroActualPantalla.textContent = '0';
    numeroAnteriorPantalla.textContent = '';
}

function borrarNumero() {
    if (numeroActual !== '') {
        numeroActual = numeroActual.slice(0, -1);
        numeroActualPantalla.textContent = numeroActual;
        if(numeroActual === '') {
          numeroActualPantalla.textContent = numeroActual;
        }
    }
    if (numeroActual === '' && numeroAnterior !== '' && operador === '') {
        numeroAnterior = numeroAnterior.slice(0, -1);
        numeroActualPantalla.textContent = numeroAnterior;
    }
}

function agregarDecimal() {
    if (!numeroActual.includes('.')) {
        numeroActual += '.';
        numeroActualPantalla.textContent = numeroActual;
    }
}

