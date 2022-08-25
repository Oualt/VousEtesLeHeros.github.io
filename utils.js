function afficheTexte(joinType, ...txt) {
    if (joinType == "line"){
    return String(txt.join("\n"));
    }
    else if (joinType == "space"){
    return String(txt.join(" "));
    }

}

function getRandomInArray(array) {
    random = array[Math.floor(Math.random()*array.length)];
    return random;
}

function getRandomMeubles(){
    //if (compteur > 5){ // coffre seulement à partir du compteur 6
        random = meubles[Math.floor(Math.random()*meubles.length)];
    // }
    // else {
    //     do {
    //     random = meubles[Math.floor(Math.random()*meubles.length)];
    //     } while(random == 4);
    // }
    return random;
}

function getValueFromArray(array, x){
    let value = array.at(x);
    return value;
   }

