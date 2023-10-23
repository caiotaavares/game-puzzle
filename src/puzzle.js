// Variáveis globais
const numbers = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"];
let moveCount = 0; // Variável para rastrear o número de movimentos
const timerInterval = 100; // Intervalo de tempo em milissegundos

// Função para encontrar o ID com base no valor
function findTitle(value) {
  for (let i = 0; i < numbers.length; i++) {
    if (document.getElementById(numbers[i]).firstChild.data == value) {
      return numbers[i];
    }
  }
}

// Função para verificar se um movimento é adjacente
function isAdjacent(id, emptyTileId) {
  const emptyTileNumber = parseInt(emptyTileId[1]);
  const tileNumber = parseInt(id[1]);
  const rowDifference = Math.abs(emptyTileNumber - tileNumber);

  return (
    (rowDifference === 1 && Math.floor(emptyTileNumber / 3) === Math.floor(tileNumber / 3)) ||
    (rowDifference === 3)
  );
}

// Função para realizar um movimento
function pushed(id) {
    const btn = document.getElementById(id);
    if (btn.firstChild.data !== " ") {
        const emptyTileId = findTitle(" ");
        if (isAdjacent(id, emptyTileId)) {
            const emptyTile = document.getElementById(emptyTileId);
            const tempData = emptyTile.firstChild.data;
            emptyTile.firstChild.data = btn.firstChild.data;
            btn.firstChild.data = tempData;
            moveCount++; // Incrementa o contador de movimentos
            updateMoveCounter(); // Atualiza o contador na interface
        }
    }
}

// Função para atualizar o contador de movimentos na interface
function updateMoveCounter() {
    const moveCounterElement = document.getElementById("moveCounter");
    moveCounterElement.textContent = `Movimentos: ${moveCount}`;
}

// Função para verificar a solvabilidade da configuração inicial
function isSolvable(randomList) {
  let count = 0;
  for (let i = 0; i < randomList.length - 1; i++) {
    if (randomList[i] === 0) {
      continue;
    }
    for (let j = i + 1; j < randomList.length; j++) {
      if (randomList[j] === 0) {
        continue;
      } else if (randomList[i] > randomList[j]) {
        count++;
      }
    }
  }

  return count % 2 === 0;
}

// função para randomizar as peças do tabuleiro
function randomNumber(){
    var randomList = []
    while(true){
        randomList = []
        while(randomList.length < 9){
            var randomnumber = Math.ceil(Math.random()*9)-1
            if(randomList.indexOf(randomnumber) > -1) continue;
            randomList[randomList.length] = randomnumber;
        }
        if(isSolvable(randomList)){
            break;
        }
    }
    for (i = 0; i < numbers.length; i++) {
        if(randomList[i] == 0){
            value = " "
        }else{
            value = randomList[i].toString()
        }
        document.getElementById(numbers[i]).firstChild.data = value
    }
}

// Função para gerar uma configuração inicial aleatória
function generateRandomConfiguration() {
  const randomList = [];
  for (let i = 0; i < 9; i++) {
    randomList.push(i);
  }

  // Embaralhar aleatoriamente a lista (Fisher-Yates Shuffle)
  for (let i = randomList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomList[i], randomList[j]] = [randomList[j], randomList[i]];
  }

  // Verificar a solvabilidade
  if (!isSolvable(randomList)) {
    // Se não for solucionável, trocar as duas últimas peças
    [randomList[7], randomList[8]] = [randomList[8], randomList[7]];
  }

  for (let i = 0; i < numbers.length; i++) {
    const value = randomList[i] === 0 ? " " : randomList[i].toString();
    document.getElementById(numbers[i]).firstChild.data = value;
  }
}

// Função para verificar se o tabuleiro está na ordem correta
function isBoardInOrder() {
  for (let i = 0; i < numbers.length - 1; i++) {
    const btn = document.getElementById(numbers[i]);
    if (btn.firstChild.data !== (i + 1).toString()) {
      return false;
    }
  }
  return true;
}
