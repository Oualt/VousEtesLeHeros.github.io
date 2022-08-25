/**  Tous les array
 * Description de lieu
 * Détails divers (pour description de lieux)
 * Description d'objet
 * Détails divers (pour description d'objets)
 * directions à choisir
 * monstres
 * Enigmes
 * récompenses (ou non)
 * sauvegarde locale
 */
var firstTime = true;
var firstEnigme = true;
var enigmeChoisie = 0;
var nouveauLieu;
var directionsNb;
var compteur = 0;
var directionsChoice = [];
var directionChosen;
var arrayDiv = [];
var lieu;
var meuble;
var monstre;
var objet;
var description;
var passages = ["Une ouverture", "Un passage", "Il y a une porte qui"];
var passage;
var ouvertures = ["donne sur", "s'ouvre vers", "conduit vers"];
var ouverture;
var directionsTakeables = [];
var endroits = ["un autre endroit", "autre part", "ailleurs"];
var endroit;
const desc = document.querySelector("#desc");
var coffreCount = -1;
var fouilles = [];
var boussoleRevealed = false;
var cv = false;
const cvBox = document.querySelector(".cvbox");
const cvPng = document.querySelector(".cvpng")



var lieux = ["pièce vide", "chambre","cave","cuisine","salle de bain","serre","salle à manger", "salle de torture", "petite chapelle", "dortoir","couloir","salon"];

var descriptionLieux = [
    "Le premier pas que vous faites dans cette nouvelle pièce vous fait remarquer qu'elle est vide, seuls les échos de vos mouvements viennent perturber le calme apparent.",
    "Vous entrez dans une chambre, elle semble avoir vue de nombreuses personnes s'y reposer.",
    "Des escaliers vous font descendre et donnent sur une cave, au vue de la poussière et des meubles qui y sont entreposés, vous pensez qu'ils y ont été oubliés ici depuis très longtemps.",
    "Une vieille cuisine s'offre à vous, autant vous dire que vous n'avez aucune envie d'y manger, la vaisselle sale et les aliments pourris qui jonchent le sol ne semblent inquiéter que les rats qui y ont élu domicile.",
    "La salle de bain sent si mauvais qu'un haut le coeur vous envahit, vous préférez ne pas aller voir derrière le rideau de la baignoire.",
    "Une serre ici ? En passant le pas de la porte vous vous retrouvez sous une serre, la pierre qui sert normalement de plafond possède quelques ouvertures et vous pouvez voir la lumière du jour illuminer les plantes mortes depuis longtemps tout en admirant la poussière qui virevolte sous le mouvement de vos pas.",
    "En pénétrant dans ce qui ressemble à une salle à manger, vous distinguez une énorme table que vous ne souhaiteriez pas avoir à déménager, quelques éléments de vaisselle sont encore sur la table, la plupart est à terre.",
    "L'ambiance est lugubre, des instruments de tortures sont disposés partout dans la pièce, certains ont clairement servis...",
    "Quatres bancs, un autel, cette petite chapelle est si inattendue que vous prenez le temps de penser à ce qui vous a amené ici. Qui a bien pu vous enfermé là dedans et pourquoi ?",
    "Un dortoir, plusieurs lits sont placés le long des murs, certains sentent extremement mauvais lorsque vous passez près d'eux, d'autre n'ont tout simplement plus de sommier.",
    "Un couloir s'offre à vous, la sortie n'est peut être pas loin.",
    "Un salon, il y a une table basse, un petit canapé et 2 fauteuils, vous vous dites qu'un peu de repos ne vous ferait pas de mal."
];

var directions = ["gauche", "droite", "tout droit"];
var armes = ["baton", "couteau", "hache", "épée"];
var meubles = ["", "Il y a également un vieux buffet.","Une petite commode est dans un coin de la pièce.", "Une étagère murale est aussi présente.","Un coffre étrange avec trois boutons et une inscription est posé au centre de la salle. Il est, contrairement au reste de ce qui vous entoure, complètement intact."];
var objets = ["boussole", "bandage"];
var monstres = ["goule", "zombie"];

function Enigme(texte, reponse1, reponse2, reponse3, bonneReponse) {
    this.texte = texte;
    this.reponse1 = reponse1;
    this.reponse2 = reponse2;
    this.reponse3 = reponse3;
    this.bonneReponse = bonneReponse;

    this.afficheEnigme = () => {
        enigme.textContent = this.texte;
    }
    this.afficheReponse1 = () => {
        return afficheTexte("line" + "- " + this.reponse1);
    }
    this.afficheReponse2 = () => {
        return afficheTexte("line" + "- " + this.reponse2);
    }
    this.afficheReponse3 = () => {
        return afficheTexte("line" + "- " + this.reponse3);
    }
    this.afficheResultatReponse = (reponse) => {
        if (reponse == bonneReponse){
            return afficheTexte("Bien joué !");
        }
        else {
            return this.afficheTexte("Mauvaise réponse !");
        }
    }
}

var enigmes = [
enigme1 = new Enigme("Qu'est-ce qui peut être dans la mer et dans le ciel ?", "Une baleine", "Un nuage", "Une étoile", "Une étoile"),
enigme2 = new Enigme("Qu’est ce qui est plus grand que la Tour Eiffel, mais infiniment moins lourd.", "King Kong", "Morty", "Son ombre", "Son ombre"),
enigme3 = new Enigme("Girafe = 3, Éléphant = 3, Hippopotame = 5, Lion = … ?", "1", "2", "3", "2"),
enigme4 = new Enigme("Qu'est-ce qui doit être cassé pour être utilisé ?", "L'oeuf", "Le clou", "La tomate", "L'oeuf"),
enigme5 = new Enigme("Qu'est-ce qui t'appartient mais que les autres utilisent plus que toi ?", "Compte Netflix", "Carte bleue", "Ton prénom", "Ton prénom")
];

var recompenses = [
    "Le coffre révèle une clé ! Vous espérez de toutes vos forces qu'il s'agit bien de la clé qui vous rendra votre liberté. Il est temps de continuer !",
    "Le coffre s'ouvre ! Une boussole est à l'intérieur, vous la prenez en espérant qu'elle vous aidera à sortir de ce dédale.",
    "Vous ne cachez pas votre déception lorsque vous apercevez qu'il n'y a qu'un morceau de papier griffonné à l'interieur du coffre. Il est écrit : \n\n' Fait face à l'astre qui s'éveille. '\n\nDeux pensées vous traversent l'esprit : soit quelqu'un cherche à vous aider, soit quelqu'un joue avec vos nerfs. Dans les deux cas il vaut mieux continuer de chercher comment sortir d'ici."     
]

var fouilles = [
    "Il n'y a rien à l'intérieur, vous continuez votre route.",
    "A part une petite crotte de rat qui est magnifiquement posée au centre du meuble (c'est à se demander si cela à été fait exprès), il n'y a rien d'intérressant. Mieux vaut continuer d'avancer.",
    "C'est vide, vous passez votre chemin.",
    "Vous n'avez rien trouvé qui en vaille la peine, il ne vous reste qu'à reprendre votre route. ",
    "Rien qui en vaille la peine, vous regardez vers votre prochaine direction."
]