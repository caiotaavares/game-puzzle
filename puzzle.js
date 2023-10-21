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