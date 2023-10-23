let numbers = ["b0","b1","b2","b3","b4","b5","b6","b7","b8"]

function findTitle(value){
    for (i = 0; i < numbers.length; i++) { 
        if(document.getElementById(numbers[i]).firstChild.data == value){
            return(numbers[i])
        }
    }
}

function isAdjacent(id, emptyTileId){
    let neighbors = []
    if([2,5,8].includes(parseInt(emptyTileId[1]))){
        neighbors = [+3,-3,-1]
    }else if([0,3,6].includes(parseInt(emptyTileId[1]))){
        neighbors = [+3,+1,-3]
    }else{
        neighbors = [+3,+1,-3,-1]
    }
    for(i = 0; i < numbers.length; i++){
        if(parseInt(emptyTileId[1])+parseInt(neighbors[i]) == parseInt(id[1])){
            return(true);
        }
    }
    return(false)
}


function pushed(id){
    var btn = document.getElementById(id);
    if (btn.firstChild.data!=" ") {
        emptyTileId = findTitle(" ") 
        if(isAdjacent(id, emptyTileId) == false) return;
        document.getElementById(emptyTileId).firstChild.data = btn.firstChild.data;
        btn.firstChild.data = " "
    }
}

function isSolvable(randomList){
    var count = 0;
    for(i = 0;i < randomList.length - 1;i++){
        if(randomList[i] == 0) {
            continue;
        }
        for(j = i+1 ; j < randomList.length;j++){
            if(randomList[j] == 0){
                continue;
            }else if(randomList[i] > randomList[j]){
                count++;
            }
        }
    }
    
    if(count % 2 == 0){
        return(true);
    }else{
        return(false);
    }
}

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

function isGameSolved() {
    for (let i = 0; i < numbers.length - 1; i++) {
        const currentTile = document.getElementById(numbers[i]);
        const nextTile = document.getElementById(numbers[i + 1]);

        // Verifique se o espaço em branco está antes da sequência de 1 a 8
        if (currentTile.firstChild.data === " " || nextTile.firstChild.data === " ") {
            return false;
        }

        const currentNumber = parseInt(currentTile.firstChild.data);
        const nextNumber = parseInt(nextTile.firstChild.data);

        // Verifique se a sequência está fora de ordem
        if (currentNumber !== nextNumber - 1) {
            return false;
        }
    }

    return true; // Todas as condições foram atendidas, o jogo está resolvido
}

//
//
//
function randomizeGame() {
    var moveCounter = 0;
    var isRandomizing = true; // Variável para indicar que o jogo está sendo embaralhado

    // Atualiza o indicador de carregamento
    function updateLoadingIndicator() {
        var loadingIndicator = document.getElementById("loadingIndicator");
        if (isRandomizing) {
            loadingIndicator.style.display = "block";
        } else {
            loadingIndicator.style.display = "none";
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomMove() {
        var emptyTileId = findTitle(" ");
        var adjacentTiles = [];

        for (i = 0; i < numbers.length; i++) {
            if (isAdjacent(numbers[i], emptyTileId)) {
                adjacentTiles.push(numbers[i]);
            }
        }

        var randomAdjacentTile = adjacentTiles[getRandomInt(0, adjacentTiles.length - 1)];
        pushed(randomAdjacentTile);
        moveCounter++;

        if (isGameSolved()) {
            isRandomizing = false; // Define a variável para indicar que o embaralhamento terminou
            updateLoadingIndicator();
            alert("Sequência correta encontrada em " + moveCounter + " movimentos!");
            document.getElementById("moveCounter").innerText = "Movimentos: " + moveCounter;
        } else {
            console.log("Move " + moveCounter); // Adicione esta linha para depurar
            setTimeout(randomMove, 100); // Realiza outro movimento aleatório após um pequeno atraso
        }
    }

    updateLoadingIndicator(); // Atualiza o indicador de carregamento ao iniciar
    randomMove();
}

