function setDirectionsNb() {
    min = -1;
    max = 4;
    random = Math.floor(Math.random() * (max + min)-min);
    directionsNb = random;
}

function getRandomDirections(array = directions){
    setDirectionsNb();
    x = directionsNb;
    if (x == 1){
        let direction1 = Math.floor(Math.random()*array.length);
        directionsChoice.splice(0,1,directions[direction1]);
        return directionsChoice;
    }
    else if(x == 2) {
        let direction1 = Math.floor(Math.random()*array.length);
        directionsChoice.splice(0,1,directions[direction1]);
        let direction2 = direction1;
        while (direction1 == direction2){
            direction2 = Math.floor(Math.random()*array.length);
        }
        directionsChoice.splice(1,1,directions[direction2]);
        return directionsChoice;
    }
    else if(x == 3){
        let direction1 = Math.floor(Math.random()*array.length);
        directionsChoice.splice(0,1,directions[direction1]);
        let direction2 = direction1;
        let direction3 = direction1;
        while (direction1 == direction2){
            direction2 = Math.floor(Math.random()*array.length);
        }
        directionsChoice.splice(1,1,directions[direction2]);
        while (direction1 == direction3 || direction2 == direction3){
            direction3 = Math.floor(Math.random()*array.length);
        }
        directionsChoice.splice(2,1,directions[direction3]);
        return directionsChoice;
    }
    else {
        directionsChoice = [];
        return directionsChoice;
    }
}

function ajoutTxtChoixDirections(array = directionsChoice){
    array.forEach(e => directionToTxt(e) );
}

function directionToTxt(direction){
    passage = passages[Math.floor(Math.random()*passages.length)];
    passages.splice(passages.indexOf(passage), 1);
    directionString = setDirectionsString(direction);
    
    if (passage == "Une ouverture"){
            ouvertures = ["donne sur", "conduit vers"]
            ouverture = getRandomInArray(ouvertures);
            resetOuvertures();
        }
        else {
            ouverture = getRandomInArray(ouvertures);
        }
    
    ouvertures.splice(ouvertures.indexOf(ouverture), 1);
    setEndroit();
    directionsTakeables += afficheTexte("space", passage, ouverture, endroit, directionString);
}

function setDirectionsString(direction){ //"gauche", "droite", "tout droit"
    if (direction == "tout droit"){
    directionString = "au fond de la pièce.";
    }
    else if (direction == "gauche"){
    directionString = "à votre gauche.";
    }
    else {
    directionString = "à votre droite.";
    }
    return directionString;
}

function setEndroit(){
    endroit = endroits[Math.floor(Math.random()*endroits.length)];
    endroits.splice(endroits.indexOf(endroit), 1);
    if ((endroit == "ailleurs" || endroit == "autre part") && ouverture == "conduit vers"){
        ouverture = "conduit";
    }
}

// Resets

function resetAll(){
    resetEndroits();
    resetPassages();
    resetOuvertures();
    resetDirectionsTakeables();
    resetDirectionsChoice();
    removeAllBtn();
}

function removeAllBtn(){
    arrayDiv.forEach(e => e.remove(e));
}

function resetDirectionsTakeables(){
    directionsTakeables = [];
}

function resetDirectionsChoice(){
    directionsChoice = [];
}

function resetPassages(){
    passages = ["Une ouverture", "Un passage", "Il y a une porte qui"];
}

function resetOuvertures(){
    ouvertures = ["donne sur", "s'ouvre vers", "conduit vers"];
}

function resetEndroits(){
    endroits = ["un autre endroit", "autre part", "ailleurs"];
}

// Boussole

function traceDestination(destination){
    if(destination == "Droite") {
        rotation += 90;
    }
    else if(destination == "Gauche") {
        rotation -= 90;
    }
    if(rotation >= 360 || rotation <= -360){
        rotation = 0;
    }
   // console.log(rotation);
}

function boussoleManager(rotation){
    if (rotation == 0){ // Nord
        boussoleIndicateur.className = "nord";
    }
    else if (rotation == -90 || rotation == 270){ // Ouest
        boussoleIndicateur.className = "ouest";
    }
    else if (rotation == 90 || rotation == -270){ // Est
        boussoleIndicateur.className = "est";
        if (boussoleRevealed == true){
            estCompteur += 1;
            //console.log(estCompteur);
        }
    }
    else if (rotation == 180){ // Sud
        boussoleIndicateur.className = "sud";
    }
}

function changeDirection(e){ // trouver la direction prise par le joueur
    destination = e.target.textContent;
    traceDestination(destination);
    boussoleManager(rotation);
    getNouveauLieu();
}