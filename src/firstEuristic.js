/**
 * A primeira eurística baseia-se no algoritmo guloso (Greedy).
 * De modo geral, algoritmos gulosos são usados em problemas de otimização 
 * onde é interessante realizar um conjunto de melhores soluções locais, possuindo 
 * como objetivo obter uma solução ótima global, tomando como base um determinado
 * parâmetro. Os parâmetros que definem o que será a melhor solução durante a 
 * iteração irá variar para cada problema.
 * 
 * No caso em questão o algoritmo de greedy vai analizar todos os filhos da iteração em questão
 * e escolher o movimento que pode deixar a peça mais próxima possível da sua posição original.
 */

// Função para resolver o quebra-cabeça usando a Heurística Gulosa (Greedy)
function solveWithGreedyHeuristic() {
  const visited = new Set();
  // Fila de movimentos
  const queue = [];
  const initialState = getCurrentState();
  const goalState = [" ", "1", "2", "3", "4", "5", "6", "7", "8"];
  // Contador de movimentos
  let moveCounter = 0;

  // Função para calcular a distância de Manhattan entre dois pontos
  function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  // Calcula o custo
  function heuristic(state) {
    let cost = 0;
    for (let i = 0; i < state.length; i++) {
      if (state[i] !== " ") {
        const goalIndex = goalState.indexOf(state[i]);
        const currentIndex = i;
        const goalX = goalIndex % 3;
        const goalY = Math.floor(goalIndex / 3);
        const currentX = currentIndex % 3;
        const currentY = Math.floor(currentIndex / 3);
        cost += manhattanDistance(goalX, goalY, currentX, currentY);
      }
    }
    return cost;
  }

  // Obtém os estados vizinhos
  function getNeighbors(state) {
    const neighbors = [];
    const emptyTileIndex = state.indexOf(" ");
    const emptyTileX = emptyTileIndex % 3;
    const emptyTileY = Math.floor(emptyTileIndex / 3);

    // Movimentos possíiveis
    const directions = [
      { dx: -1, dy: 0 }, // Move para a esquerda
      { dx: 1, dy: 0 },  // Move para a direita
      { dx: 0, dy: -1 }, // Move para cima
      { dx: 0, dy: 1 }   // Move para baixo
    ];

    for (const direction of directions) {
      const newX = emptyTileX + direction.dx;
      const newY = emptyTileY + direction.dy;

      // Alocação dos elementos na interface
      if (newX >= 0 && newX < 3 && newY >= 0 && newY < 3) {
        const neighborIndex = newY * 3 + newX;
        const neighborState = [...state];
        neighborState[emptyTileIndex] = state[neighborIndex];
        neighborState[neighborIndex] = " ";
        neighbors.push(neighborState);
      }
    }

    // Retorna os vizinhos da peça movida
    return neighbors;
  }

  queue.push({ state: initialState, cost: heuristic(initialState) });

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
    const currentState = queue.shift().state;

    if (currentState.join("") === goalState.join("")) {
      // Solução encontrada
      updateBoard(currentState);
      updateMoveCounterGreedy(moveCounter);
      return;
    }

    // Solição não encontrada
    if (!visited.has(currentState.join(""))) {
      visited.add(currentState.join(""));
      const neighbors = getNeighbors(currentState);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.join(""))) {
          queue.push({ state: neighbor, cost: heuristic(neighbor) });
          const emptyTileIndex = neighbor.indexOf(" ");
          // Realiza o movimento da peça
          pushedGreedy(numbers[emptyTileIndex]);
          moveCounter++;
          updateMoveCounterGreedy(moveCounter);
        }
      }
    }
  }
}

// Atualiza o tabuleiro com o novo estado
function updateBoard(state) {
  for (let i = 0; i < state.length; i++) {
    document.getElementById(numbers[i]).firstChild.data = state[i];
  }
}

// Obtém o estado atual do tabuleiro
function getCurrentState() {
  const state = [];
  for (let i = 0; i < numbers.length; i++) {
    state.push(document.getElementById(numbers[i]).firstChild.data);
  }
  return state;
}

// Realiza o movimento da peça com base no estado de updateCounter.
function pushedGreedy(id, updateCounter = true) {
  const btn = document.getElementById(id);
  if (btn.firstChild.data !== " ") {
    const emptyTileId = findTitle(" ");
    if (isAdjacent(id, emptyTileId)) {
      const emptyTile = document.getElementById(emptyTileId);
      const tempData = emptyTile.firstChild.data;
      emptyTile.firstChild.data = btn.firstChild.data;
      btn.firstChild.data = tempData;
      if (updateCounter) {
        // Incrementa o contador de movimentos
        moveCount++; 
        // Atualiza o contador na interface
        updateMoveCounterGreedy();
      }
    }
  }
}

// Função para atualizar o contador de movimentos específico para a heurística
function updateMoveCounterGreedy(moveCounter) {
  const moveCounterGreedyElement = document.getElementById("moveCounterGreedy");
  moveCounterGreedyElement.textContent = `Movimentos: ${moveCounter}`;
}
