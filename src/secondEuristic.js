/**
 * A segunda eurística baseia-se no algoritmo guloso (Greedy), mas com uma otimização em relação
 * a escolha dos filhos.
 * De modo geral, algoritmos gulosos são usados em problemas de otimização 
 * onde é interessante realizar um conjunto de melhores soluções locais, possuindo 
 * como objetivo obter uma solução ótima global, tomando como base um determinado
 * parâmetro. Os parâmetros que definem o que será a melhor solução durante a 
 * iteração irá variar para cada problema.
 * 
 * No caso em questão o algoritmo de greedy vai analizar todos os filhos da iteração em questão
 * E EM SEGUIDA ANALIZAR OS FILHOS DESSES FILHOS, e escolher o melhor dentre eles, no caso em questão
 * a escolha será do melhor neto, o neto que deixa a peça mais próxima possível da sua posição correta.
 */

// Função para resolver o quebra-cabeça usando a Heurística 2 (Greedy)
function solveWithGreedyHeuristic2() {
  const visited = new Set();
  const queue = [];
  const initialState = getCurrentState();
  const goalState = [" ", "1", "2", "3", "4", "5", "6", "7", "8"];
  // Contador de movimentos específico para a heurística
  let moveCounter = 0; 

  // Cálculo do custo
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
        cost += Math.abs(goalX - currentX) + Math.abs(goalY - currentY);
      }
    }
    return cost;
  }

  // Obtém os estados vizinhos (netos)
  function getChildren(state) {
    const children = [];
    const emptyTileIndex = state.indexOf(" ");
    const emptyTileX = emptyTileIndex % 3;
    const emptyTileY = Math.floor(emptyTileIndex / 3);

    const directions = [
      { dx: -1, dy: 0 }, // Move para a esquerda
      { dx: 1, dy: 0 },  // Move para a direita
      { dx: 0, dy: -1 }, // Move para cima
      { dx: 0, dy: 1 }   // Move para baixo
    ];

    for (const direction of directions) {
      const newX = emptyTileX + direction.dx;
      const newY = emptyTileY + direction.dy;

      if (newX >= 0 && newX < 3 && newY >= 0 && newY < 3) {
        const childIndex = newY * 3 + newX;
        const childState = [...state];
        childState[emptyTileIndex] = state[childIndex];
        childState[childIndex] = " ";
        children.push(childState);
      }
    }

    return children;
  }

  // Inicializa a fila com o estado inicial
  queue.push({ state: initialState, cost: heuristic(initialState) });

  // Executa a resolução
  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
    const currentState = queue.shift().state;

    if (currentState.join("") === goalState.join("")) {
      // Solução encontrada
      updateBoard(currentState);
      updateMoveCounterGreedy2(moveCounter);
      return;
    }

    if (!visited.has(currentState.join(""))) {
      visited.add(currentState.join(""));
      const children = getChildren(currentState);

      for (const child of children) {
        if (!visited.has(child.join(""))) {
          queue.push({ state: child, cost: heuristic(child) });
          pushedGreedy2(numbers[child.indexOf(" ")]);
          moveCounter++;
          updateMoveCounterGreedy2(moveCounter);
        }
      }
    }
  }
}

// Função para atualizar o tabuleiro com o novo estado
function updateBoard(state) {
  for (let i = 0; i < state.length; i++) {
    document.getElementById(numbers[i]).firstChild.data = state[i];
  }
}

// Função para obter o estado atual do tabuleiro
function getCurrentState() {
  const state = [];
  for (let i = 0; i < numbers.length; i++) {
    state.push(document.getElementById(numbers[i]).firstChild.data);
  }
  return state;
}

function pushedGreedy2(id, updateCounter = true) {
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
        updateMoveCounterGreedy2();
      }
    }
  }
}

// Função para atualizar o contador de movimentos na interface específico para a heurística2
function updateMoveCounterGreedy2(moveCounter) {
  const moveCounterGreedyElement2 = document.getElementById("moveCounterGreedy2");
  moveCounterGreedyElement2.textContent = `Movimentos: ${moveCounter}`;
}