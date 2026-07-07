const cartasArray = [
    { nome: '🍎', img: '🍎' },
    { nome: '🍌', img: '🍌' },
    { nome: '🍇', img: '🍇' },
    { nome: '🍓', img: '🍓' },
    { nome: '🍉', img: '🍉' },
    { nome: '🍍', img: '🍍' }
];

//duplicar cartas para formas pares
const cartasJogo = [...cartasArray, ...cartasArray];
let cartasEmbaralhadas = [];
let cartaViradaPrimeira = null;
let cartaViradaSegunda = null;
let travado = false;
let paresEncontrados = 0;

//função para embaralhar (fisher-yate)
function embaralhar() {
    cartasEmbaralhadas = [...cartasJogo];
    for (let i = cartasEmbaralhadas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartasEmbaralhadas[i], cartasEmbaralhadas[j]] = [cartasEmbaralhadas[j], cartasEmbaralhadas[i]];
    }
}

//Criar cartas em HTML
function criarTabuleiro() {
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';

    cartasEmbaralhadas.forEach((item) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.nome = item.nome;

        carta.innerHTML = `
            <div class="carta-frente"></div>
            <div class="carta-verso">${item.img}</div>
        `;

        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);
    });
}

function virarCarta() {
    if (travado) return;
    if (this === cartaViradaPrimeira) return;

    this.classList.add('virada');

    if (!cartaViradaPrimeira) {
        cartaViradaPrimeira = this;
        return;
    }
    cartaViradaSegunda = this;
    verificarPares();
}

function verificarPares() {
    const primeiraCartaNome = cartaViradaPrimeira.dataset.nome;
    const segundaCartaNome = cartaViradaSegunda.dataset.nome;

    if (primeiraCartaNome === segundaCartaNome) {
        desabilitarCartas();
    } else {
        desvirarCartas();
    }
}

function desabilitarCartas() {
    cartaViradaPrimeira.removeEventListener('click', virarCarta);
    cartaViradaSegunda.removeEventListener('click', virarCarta);
    resetarTabuleiro();

    paresEncontrados++;
    if (paresEncontrados === cartasArray.length) {
        setTimeout(() => alert('Parabéns, você ganhou!'), 500);
    }
}

function desvirarCartas() {
    travado = true;

    setTimeout(() => {
        cartaViradaPrimeira.classList.remove('virada');
        cartaViradaSegunda.classList.remove('virada');
        resetarTabuleiro();
    }, 1000);
}

function resetarTabuleiro() {
    [cartaViradaPrimeira, cartaViradaSegunda] = [null, null];
    travado = false;
}


//inicializa o jogo
embaralhar();
criarTabuleiro();
