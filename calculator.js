'use strict';


const display = document.getElementById('display'); 
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');
const igual = document.getElementById('igual');

let operador;
let numeroAnterior;

const operaçãoPendente = () => operador != undefined;
const calcular = () => {
    if(operaçãoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);

        atualizarDisplay(resultado);
    }
}

//escolhendo operador e limpando display
let novoNumero = true;
const atualizarDisplay = (texto) =>{
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else{
        display.textContent += texto.toLocaleString('BR');
    }
    
};

//selecionando numeros e operadores
const inserirNumero = (event) => atualizarDisplay(event.target.textContent);

const selecionarOperador = (event) =>{
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = event.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
    
};

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = ()=>{
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);


const limparDisplay = ()=> display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);


const limparCalculo = ()=> {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);


const removerUltimoNumero = ()=>display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    } 
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '*'         : 'operadorMulti',
    '/'         : 'operadorDivisao',
    '-'         : 'operadorSub',
    '+'         : 'operadorSoma',
    'Enter'     : 'igual',
    '='         : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal'
}

const mapearTeclado = (event) => {
    const tecla = event.key;
    const teclaPermitida = ()=> Object.keys(mapaTeclado).indexOf(tecla) != -1;
    document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);
