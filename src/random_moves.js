// Função para movimentar uma peça aleatoriamente
function moveRandomPiece() {
    const emptyTileId = findTitle(" ");
    const movablePieces = [];
  
    for (let i = 0; i < numbers.length; i++) {
      if (isAdjacent(numbers[i], emptyTileId)) {
        movablePieces.push(numbers[i]);
      }
    }
  
    if (movablePieces.length > 0) {
      // Escolher um movimento aleatório
      const randomPiece = movablePieces[Math.floor(Math.random() * movablePieces.length)];
      pushed(randomPiece);
    }
  
    // Verificar se o tabuleiro está na ordem correta após o movimento
    if (isBoardInOrder()) {
      clearInterval(timer);
      alert("Parabéns! Você resolveu o quebra-cabeça.");
    }
  }
  
  // Função para iniciar o jogo
  function startPuzzle() {
      moveCount = 0; // Reinicia o contador de movimentos
      updateMoveCounter(); // Atualiza o contador na interface
      generateRandomConfiguration();
      timer = setInterval(moveRandomPiece, timerInterval);
  }
    
  
  // Chamar a função para iniciar o jogo
  startPuzzle();