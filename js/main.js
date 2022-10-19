const buttonArabe = document.querySelector('.btn-arabico')
const buttonRoman = document.querySelector('.btn-romano')
const arabeToRoman = document.querySelector('.arabico')
const romanToArab = document.querySelector('.romano')

// CONVERTER ARÁBICO PARA ROMANO:
function converterArab(num) {
    // não permirtir realizar a conversão quando o número arábico for letras
    // ou número fracionado 
    // ou maior que 3999.
    if ( typeof num !== 'string' ||  num > 3999) {
        return 'Número Inválido';
    }

    // pegando os símbolos dos números romanos
    const simbols = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
        '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
        '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

    // transformando numero recebido em string e separando-os (se maior que 9)
    let digits = String(num).split('');
    let roman = '';
    let i = 3;
    while (i--) {

        // pegar último elemento da variavel digits e colocá-lo em base 10 (i*10)
        roman = (simbols[+digits.pop() + (i * 10)] || '') + roman;
    }

    // criar um array com os valores de digits e juntá-los,
    // e a cada valor de dígito repetido, soma-se mais e concatena
    // na variavel roman.
    return Array(+digits.join('') + 1) + roman
}

function result(msg) {
    const div = document.createElement('div')
    buttonArabe.insertAdjacentElement('afterend', div)
    div.classList.add('respost')
    div.innerText = msg
}

function result2(msg){
    const div = document.createElement('div')
    buttonRoman.insertAdjacentElement('afterend', div)
    div.classList.add('respost')
    div.innerText = msg
}

buttonArabe.addEventListener('click', () => {
    const value = arabeToRoman.value;
    const respost= converterArab(value)
    result(`${value} = ${respost}`)
})

buttonRoman.addEventListener('click', () => {
    const value = romanToArab.value;
    const respost = converterRomanoAInteiro(value)
    result2(`${value.toUpperCase()} = ${respost}`)
})

// CONVERTER ROMANOS PARA ARÁBICOS:
function converterSimbol(simbols) {
    // pegando os simbolos romanos separadamente e definindo seus valores:
    switch (simbols) {
        case 'i': return 1
        case 'v': return 5
        case 'x': return 10
        case 'l': return 50
        case 'c': return 100
        case 'd': return 500
        case 'm': return 1000
        default: "Símbolo Inválido"
    }
}
// FUNÇÃO PRINCIPAL DA CONVERSÃO:
function converterRomanoAInteiro(simbol) {
    // não efetuar conversão caso o símbolo seja número
    if (typeof simbol !== 'string') {
        return "Símbolo Inválido"
    }

    // pegar o elemento que está no índice 0 do simbol(numero romano recebido)
    let number = converterSimbol(simbol.charAt(0));
    let before;
    let current;

    // começar a iterar a partir do indice 1, e incrementar 1 a cada iteração
    for (let i = 1; i < simbol.length; i++) {
        // converter o primeiro índice(0) do romano a inteiro
        // a partir da definição da variavel i como parâmetro 
        current = converterSimbol(simbol.charAt(i));
        before = converterSimbol(simbol.charAt(i - 1))

        if (current <= before) {
            number += current;
        } else {
            number = number - before * 2 + current
        }
    }
    return number
}
