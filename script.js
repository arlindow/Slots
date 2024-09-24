const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const resultDisplay = document.getElementById('result');
const spinButton = document.getElementById('spinButton');
const creditAmountDisplay = document.getElementById('creditAmount');
const betAmountInput = document.getElementById('betAmount');
const creditInput = document.getElementById('creditInput');
const addCreditButton = document.getElementById('addCreditButton');

// Símbolos possíveis para os slots
const symbols = ['🍇', '🍒', '🍋', '⭐', '🍉'];

// Saldo Inicial de créditos
let creditAmount = 100;

// Função para gerar um símbolo aleatório
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

// Função para aplicar a animação de rotação e depois parar nos símbolos
function spin() {
    const betAmount = parseInt(betAmountInput.value);

    // Verifica se o jogador tem créditos suficientes para apostar
    if (betAmount > creditAmount) {
        resultDisplay.textContent = 'Créditos insuficientes!';
        return;
    }

    // Subtrai a aposta dos créditos
    creditAmount -= betAmount;
    updateCreditDisplay();

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
        checkResult(symbol1, symbol2, symbol3, betAmount);

        // Reativar o botão
        spinButton.disabled = false;
    }, 1000);
}

// Função para checar o resultado
function checkResult(symbol1, symbol2, symbol3, betAmount) {
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        const winnings = betAmount * 3; // O jogador ganha 3x o valor apostado
        creditAmount += winnings;
        resultDisplay.textContent = `Jackpot! 🎉🎉🎉 Você ganhou ${winnings} créditos!`;
    } else {
        resultDisplay.textContent = 'Tente novamente!';

        // Após 1 segundo, limpar o resultado
        setTimeout(() => {
            resultDisplay.textContent = '';
        }, 1000);
        
    }
    updateCreditDisplay();
}

// Função para adicionar créditos
function addCredits() {
    const creditToAdd = parseInt(creditInput.value);

    // Verifica se o valor é válido
    if (!isNaN(creditToAdd) && creditToAdd > 0) {
        creditAmount += creditToAdd; // Adiciona os créditos ao saldo atual
        updateCreditDisplay(); // Atualiza a exibição dos créditos
        creditInput.value = ''; // Limpa o campo de input
        resultDisplay.textContent = `Você adicionou ${creditToAdd} créditos!`;
    } else {
        resultDisplay.textContent = 'Por favor, insira um valor válido para adicionar créditos.';
    }
}

// Atualiza a exibição dos créditos e salva
function updateCreditDisplay() {
    creditAmountDisplay.textContent = creditAmount;
    saveCredits(); // Salva os créditos no localStorage
}

// Carregar o saldo salvo no localStorage
function loadCredits() {
    const savedCredits = localStorage.getItem('creditAmount');
    if (savedCredits !== null) {
        creditAmount = parseInt(savedCredits);
    }
    updateCreditDisplay();
}

// Salvar o saldo no localStorage
function saveCredits() {
    localStorage.setItem('creditAmount', creditAmount);
}

// Chama a função para carregar os créditos quando o jogo é aberto
loadCredits();

// Adiciona eventos aos botões
spinButton.addEventListener('click', spin);
addCreditButton.addEventListener('click', addCredits);
