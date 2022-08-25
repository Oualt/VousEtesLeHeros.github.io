var btnFouiller = document.querySelector(".fouiller");
var hidden = false;
var enigmeContainer = document.querySelector("#enigme-container");
const enigme = document.querySelector("#enigme-text");
enigme.classList.add("enigm");
var reponse1 = document.querySelector("#enigme-reponse1");
var reponse2 = document.querySelector("#enigme-reponse2");
var reponse3 = document.querySelector("#enigme-reponse3");
var boussoleContainer = document.querySelector(".box");
var boussoleIndicateur = document.querySelector(".indicateur");
var destination;
var rotation = 0;
var estCompteur = 0;

function initInterface(){
    hide(enigmeContainer);
    hide(boussoleContainer);
    hide(cvBox); // REMETTRE APRES TEST
    //afficheCV(); // RETIRER APRES TEST
}

function afficheCV(){
    reveal(cvBox);
    cvPng.addEventListener("click", agrandi);
}

function agrandi(e){
    item = e.target;
    item.className = "agrandi";
    cvPng.removeEventListener("click", agrandi);
    cvPng.addEventListener("click", retreci);
}

function retreci(e){
    item = e.target;
    item.className = "cvpng";
    cvPng.removeEventListener("click", retreci);
    cvPng.addEventListener("click", agrandi);
}

function ajoutBoutonChoixDirections(array = directionsChoice){
    array.forEach(e => addDiv(e) );
}

function addDiv(x){    
    if (x == "fouiller"){
        e = "fouiller";
    }
    else if (x == "enigme"){
        e = "enigme";
    }
    else {
        e = "choi";
    }
    let divbefore = document.querySelector('#choix');
    let div = document.createElement('div');
    div.className = e;
    div.textContent = x.charAt(0).toUpperCase() + x.slice(1);
    arrayDiv.push(div);
    appendAfter(div, divbefore, x); 
}

function appendAfter(divToAppend, siblingBefore, x){
    if(siblingBefore.nextSibling) {
        siblingBefore.parentNode.insertBefore(divToAppend, siblingBefore.nextSibling);
    } else {
        siblingBefore.parentNode.appendChild(divToAppend);
    }
    if (x == "fouiller"){
        btnFouiller = document.querySelector(".fouiller");
        btnFouiller.addEventListener("click", actionFouiller);
    }
    else {
        var btnDirection = document.querySelector(".choi");
        btnDirection.addEventListener("click", changeDirection);
    }
    
}

function ajoutBoutonFouiller(x){
    if (x != ''){
        addDiv("fouiller");        
    }
}

function hide(e){
    e.style.display = "none";
}

function reveal(e){
    e.style.display = "block";
}

initInterface();
