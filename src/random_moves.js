// Função para movimentar uma peça aleatoriamente
function moveRandomPiece() {
  const emptyTile = findTitle(" ");
  const isMovable = [];

  for (let i = 0; i < numbers.length; i++) {
    if (isAdjacent(numbers[i], emptyTile)) {
      isMovable.push(numbers[i]);
    }
  }

  if (isMovable.length > 0) {
    // Escolhe um movimento aleatório
    const randomPiece = isMovable[Math.floor(Math.random() * isMovable.length)];
    pushed(randomPiece);
  }

  // Verificar se o tabuleiro está na ordem correta após o movimento
  if (isBoardInOrder()) {
    clearInterval(timer);
    alert("Parabéns! Você resolveu o quebra-cabeça.");
  }
}
  
// Inicia as jogadas com timer
function startPuzzle() {
  // Reinicia o contador de movimentos
  moveCount = 0; 
  // Atualiza o contador na interface
  updateMoveCounter();
  generateRandomConfiguration();
  timer = setInterval(moveRandomPiece, timerInterval);
}

  // Chamar a função para iniciar o jogo
  startPuzzle();