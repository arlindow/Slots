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

// Função para aplicar a animação de rotação e depois parar nos símbolos
function spin() {
    // Aplicar a animação de rotação
    reel1.classList.add('spin');
    reel2.classList.add('spin');
    reel3.classList.add('spin');

    // Desativar o botão para evitar múltiplos cliques
    spinButton.disabled = true;

    // Após 1 segundo (tempo da animação), parar os rolos e exibir o resultado
    setTimeout(() => {
        reel1.classList.remove('spin');
        reel2.classList.remove('spin');
        reel3.classList.remove('spin');

        // Gerar os símbolos aleatórios para os rolos
        const symbol1 = getRandomSymbol();
        const symbol2 = getRandomSymbol();
        const symbol3 = getRandomSymbol();

        // Exibir os símbolos nos respectivos rolos
        reel1.textContent = symbol1;
        reel2.textContent = symbol2;
        reel3.textContent = symbol3;

        // Checar o resultado
        checkResult(symbol1, symbol2, symbol3);

        // Reativar o botão
        spinButton.disabled = false;
    }, 1000);
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
