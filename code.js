// Mécanismes

// Demander le nom

// Sauver le nom

/** Phases : chaque phase appelle afficheTexte()
* Description
* Choix direction
* Description
* Options : monstre (combat) / Enigme / rien
* Récompense ou non
* Sauvegarde
*/

function Endroit(lieu, description, direction, meuble, objet, monstre, enigme, recompense) {
    this.lieu = lieu;
    this.description = description;
    this.direction = direction;
    this.meuble = meuble;
    this.objet = objet;
    this.monstre = monstre;
    this.enigme = enigme;
    this.recompense = recompense;

    this.descriptionDuLieu = () => {
        desc.textContent = afficheTexte("space", this.description,"\n", this.meuble,"\n\n", directionsTakeables );
    }
}

function setFirstEnigme(){
    enigmeChoisie = enigmes[4];
    reponse1.textContent = enigmeChoisie.reponse1;
    reponse2.textContent = enigmeChoisie.reponse2;
    reponse3.textContent = enigmeChoisie.reponse3;
    enigme.textContent = enigmeChoisie.texte;
}

function getRandomEnigme(){
    enigmeChoisie = enigmes[Math.floor(Math.random()*enigmes.length)];
    //console.log(enigmeChoisie);
    reponse1.textContent = enigmeChoisie.reponse1;
    reponse2.textContent = enigmeChoisie.reponse2;
    reponse3.textContent = enigmeChoisie.reponse3;
    enigme.textContent = enigmeChoisie.texte;
}

// Fonction principale

function getNouveauLieu(){
    if (firstTime == false){
    resetAll();
    compteur += 1;
    }
    firstTime = false;
    getRandomDirections()
    lieu = getRandomInArray(lieux);
    ajoutBoutonChoixDirections(directionsChoice);
    ajoutTxtChoixDirections(directionsChoice);
    if (estCompteur == 7){
        endGame();
        arrayDiv.forEach(e => hide(e));
    }
    else {
    nouveauLieu = new Endroit(lieu, descriptionLieux[lieux.indexOf(lieu)], directionsNb, getRandomMeubles(), "nouvel objet", "monstre", "enigme", "recompense");
    nouveauLieu.descriptionDuLieu();
    ajoutBoutonFouiller(nouveauLieu.meuble);
    console.log(compteur);
    }
}

function initGame(){
    getNouveauLieu();
    if (btnFouiller){
    hide(btnFouiller);
    }
    desc.textContent = afficheTexte("space", "Vous vous réveillez un peu confus, votre tête vous fait un mal de chien, vous êtes dans ce qui semble être le hall d'entrée d'un lieu abandonné, les murs laissent entrevoir les parois en pierre sous une très vieille peinture complètement décrépite.\nL'air sent le renfermé et la moisissure monte autant dans vos narines que sur le sol et les murs. Les meubles sont soit détruits, soit fouillés avec brutalité, il n'y a rien à en tirer.\nVous constatez qu'il n'y a pas de fenêtres, la lumière provient de petites lucarnes creusées dans les murs mais trop hautes pour pouvoir espérer les atteindre.\nAprès vérification la grande porte massive qui laisse entrevoir le jour est bel et bien fermée, vous savez qu'essayer de l'enfoncer vous ferait perdre votre temps et votre énergie, mieux vaut essayer de sortir par un autre endroit.","\n\n",directionsTakeables);
}

function endGame(){
    desc.textContent = afficheTexte("space", "Vous arrivez devant une énorme porte massive, dans un hall qui ressemble étrangement à l'endroit où vous vous êtes réveillé. Un corps est à coté de la porte, vous reconnaissez l'homme sur le CV.\n\nVous faites un énorme bond lorsqu'il se redresse, il vous regarde et vous dit en souriant : On utilise plus souvent mon compte Netflix que mon prénom. Vous avez la clé ?\n\nVous sortez la clé de votre poche et l'insérez dans la porte, jamais vous n'avez entendu le son d'un cliquetis aussi somptueux, le son de la liberté. Vous passez tous les deux le pas de la porte et sortez enfin d'ici !\n\n\nMerci d'avoir joué !\nN'hésitez pas à m'envoyer vos commentaires : walter.massenhove@gmail.com")
}

function actionFouiller(){
    if (meubles.indexOf(nouveauLieu.meuble) == 4){ // si c'est un coffre
        if (firstEnigme == true){
            setFirstEnigme();   
        }
        else {
        getRandomEnigme();
        }
        reveal(enigmeContainer);
        arrayDiv.forEach(e => hide(e));
        desc.textContent = afficheTexte("space", "L'inscription sur le coffre est une énigme, les trois boutons sous l'inscription représentent une réponse possible, vous tentez d'appuyer sur le bon bouton.")
        reponse1.addEventListener("click", lookForAnswer);
        reponse2.addEventListener("click", lookForAnswer);
        reponse3.addEventListener("click", lookForAnswer);
    }
    else {
        if (cv == false){
            trouverObjet();
        }
        else {
        desc.textContent = afficheTexte("space",getRandomInArray(fouilles));
        hide(btnFouiller);
        }
        
    }
}

function trouverObjet(){
    let random = Math.floor(Math.random()*100);
    if (random > 70){
        cv = true;
        desc.textContent = "Vous trouvez un CV, ici ? Pourquoi ? Et qui est la personne qui est dessus ? Trop de questions se bousculent dans votre tête, vous feriez mieux de continuer."
        afficheCV();
        hide(btnFouiller);
    }
    else {
        desc.textContent = afficheTexte("space",getRandomInArray(fouilles));
        hide(btnFouiller);
        console.log("Rien trouvé");
    }
}

function lookForAnswer(e){
    const item = e.target;
    const txt = item.textContent;
    if (txt == enigmeChoisie.bonneReponse){
        if (firstEnigme == true){
            firstEnigme = false;
        }
        coffreCount += 1;
        desc.textContent= recompenses[coffreCount];
        if (firstEnigme == false){
            enigmes.splice(enigmes.indexOf(enigmeChoisie),1);
        }
        if (coffreCount == 1) {
            reveal(boussoleContainer);
            boussoleRevealed = true;
        }
        if (coffreCount == 2){ // 3 énigmes gagnées = fini de trouver des coffres
            meubles.splice(4,1);
        }
    }
    else {
        desc.textContent= "Le coffre se met subitement à prendre feu, la chaleur est telle que vous faites un geste de recul, vous ne pourrez jamais savoir ce qu'il contenait. Il est temps de continuer."
    }
    hide(enigmeContainer);
    arrayDiv.forEach(e => reveal(e));
    hide(btnFouiller);
    
    
}

initGame();