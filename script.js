const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const resultDisplay = document.getElementById('result');
const spinButton = document.getElementById('spinButton');

// Símbolos possíveis para os slots
const symbols = ['🍇', '🍒', '🍋', '⭐', '🍉'];

// Função para gerar um símbolo aleatório
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

// Função para girar os slots
function spin() {
    const symbol1 = getRandomSymbol();
    const symbol2 = getRandomSymbol();
    const symbol3 = getRandomSymbol();

    reel1.textContent = symbol1;
    reel2.textContent = symbol2;
    reel3.textContent = symbol3;

    checkResult(symbol1, symbol2, symbol3);
}

// Função para checar o resultado
function checkResult(symbol1, symbol2, symbol3) {
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        resultDisplay.textContent = 'Jackpot! 🎉';
    } else {
        resultDisplay.textContent = 'Tente novamente!';
    }
}

// Adiciona evento ao botão
spinButton.addEventListener('click', spin);
