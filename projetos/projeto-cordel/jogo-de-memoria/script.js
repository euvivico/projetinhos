const cartasArray = [
    {nome: '1', img: '1'},
    {nome: '2', img: '2'},
    {nome: '3', img: '3'},
    {nome: '4', img: '4'},
    {nome: '5', img: '5'},
    {nome: '6', img: '6'},
    {nome: '7', img: '7'},
];

//duplicar cartas para formas pares
const cartasJogo = [...cartasArray, ...cartasArray];
let cartasEmbaralhadas = [];
let cartaViradaPrimeira = null;
let cartaViradaSegunda = null;
let travado = false;
let paresEncontrados = 0;

//função para embaralhar (fisher-yate)
function Embaralhar() {
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
        carta.classicList.add('carta');
        carta.dataset.nome = item.nome;

        carta.innerHTML = `
            <div class="carta-frente"></div>
            <div class="carta-verso">${item.img}</div>
        `;

        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);

    });
}
