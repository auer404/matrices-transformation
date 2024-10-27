/*

--- Qu'est-ce qu'une matrice de transformation ? ---

Il s'agit d'un ensemble de nombres, à considérer comme des coefficients que l'on utilisera pour en multiplier d'autres selon une certaine logique. Elle se présente, dans une formule mathématique, en plusieurs lignes englobées par un (seul) couple de parenthèses. Dans les exemples ci-dessous, quand vous croiserez le motif suivant :

    /   \
   | ... |
    \   /

...il faudra s'imaginer de grandes parenthèses capables d'englober plusieurs lignes en même temps (comme présentées sur index.html relié à ce script).

--

Dans une matrice, la répartition des valeurs en plusieurs lignes a son importance, et chaque ligne présentera le même nombre de valeurs.

--- Quand les utilise-t-on ? ---

Les matrices sont utilisées lorsqu'on cherche à modifier un ensemble (ou "système") de 2 nombres (ou "composantes") ou plus, en voulant permettre que chacune de ces composantes ait un impact sur la modification appliquée aux autres. La transformation s'appliquera toujours via la même formule, qui tiendra compte pour obtenir chaque valeur modifiée, de chaque valeur de départ.

--- Comment les appliquer ? ---

L'opération suivante consiste à multiplier par une matrice le couple de nombres N1 et N2 pour en obtenir des versions transformées N1' et N2' :

 / a b \     / N1 \     / N1' \
|       | x |      | = |       |
 \ c d /     \ N2 /     \ N2' /

 La formule à appliquer pour opérer cette multiplication sera :

 N1' = a x N1 + b x N2
 N2' = c x N1 + d x N2

 On remarque que :
 - chaque ligne de la matrice est utilisée pour obtenir la version transformée de la composante "en face" d'elle dans le système à transformer
 - il doit donc y avoir autant de lignes dans la matrice que de composantes dans le système à transformer
 - à chaque composante du système à transformer, s'appliquera une multiplication par ligne de la matrice
 - il doit donc y avoir autant de valeurs par ligne de la matrice que de composantes dans le système à transformer (et donc : la matrice comportera autant de lignes que de valeurs par ligne).

 Pour transformer par exemple un système de 3 nombres, il faudra utiliser une matrice de 3 x 3 valeurs.

 --- Comment les manipuler en JavaScript ? ---

 Si on considère qu'une matrice est en fait une "liste de listes" de valeurs, et que pour l'appliquer on utilisera ses "lignes" une à une pour en récupérer les valeurs, on peut en conclure que ce qui remplira au mieux ce rôle en JS sera : un tableau contenant des tableaux !

 let mon_tableau = []; // tableau classique (mais vide)
 let mon_tableau_2d = [ [] ]; // tableau contenant un tableau vide
 let mon_autre_tableau_2d = [ [] , [] , [] ]; // tableau contenant trois tableaux vides

 let une_matrice_3x3 = [ [1,2,3] , [4,5,6] , [7,8,9] ];
 // tableau contenant trois tableaux de trois valeurs

 Rien n'interdit de rééecrire la matrice ci-dessus d'une manière plus lisible :

let une_matrice_3x3 = [
    [1 , 2 , 3],
    [4 , 5 , 6],
    [7 , 8 , 9]
];

...ce qui nous rapprochera aussi de la manière classique de représenter une matrice, par "lignes" qui correspondront chacune plus ou moins à une composante du système à transformer.

--

Pour récupérer une valeur dans un tableau à deux dimensions :

Si on cherche par exemple à récupérer la 3ème valeur de la 1ere ligne de notre matrice ci-dessous, il faut commencer par désigner cette 1ere ligne (donc l'élément d'indice 0 de la matrice)

une_matrice_3x3[0] // nous donnerait : [1,2,3]

Comme ce qu'on désigne là est à nouveau un tableau, il faut encore aller y chercher l'élément qui nous intéresse en fonction de son indice (ici indice 2 car 3ème élément) :

une_matrice_3x3[0][2] // nous donnera bien : 3

--

C'est cette logique qui est utilisée dans le code ci-dessous (responsable de ce qui se passe sur index.html). On commence par y créer une matrice, dont les valeurs évolueront selon ce que l'utilisateur saisit dans les différents champs. Les dimensions du rectangle à transformer sont également stockées via un tableau, pour mieux illustrer un système à 2 composantes.

*/

let matrice = [
    [1 , 0],
    [0 , 1]
];

let dimensions = [250 , 100]; // Longueur , Hauteur (avant transformation)

// On peut aussi prévoir un second tableau pour stocker (à terme) les dimensions transformées :
let dimensions_mod = ["?" , "?"];

// Et le calcul de la transformation se fera comme ceci :
function appliquer_transformation() {

    dimensions_mod[0] = matrice[0][0] * dimensions[0] + matrice[0][1] * dimensions[1];
    dimensions_mod[1] = matrice[1][0] * dimensions[0] + matrice[1][1] * dimensions[1];
}

// Dès la première utilisation de cette fonction appliquer_transformation(), le tableau dimensions_mod sera mis à jour et contiendra les nouvelles dimensions du rectangle.

appliquer_transformation(); // On exécute donc cette fonction.

/* Voilà, c'est tout en ce qui concerne la logique de transformation par matrice !

Le reste sert à rendre la page HTML interactive (et utilise bien sûr les valeurs et le calcul mis en place ci-dessus). Ça pourrait vous intéresser aussi, j'y ai donc glissé quelques explications.

**************************/





// Le calcul ci-dessus est effectué automatiquement dès l'arrivée sur la page. Le tableau dimensions_mod est à jour mais il n'y a eu aucune répercussion visuelle sur la page. On exécute donc cette deuxième fonction :

maj_affichage();

// ...dont le but est de mettre à jour certaines choses qui sont affichées en HTML, comme :

function maj_affichage() {

    // • les deux valeurs L' et H' dans la 3ème parenthèse
    document.querySelector("#largeur_mod").textContent = dimensions_mod[0];
    document.querySelector("#hauteur_mod").textContent = dimensions_mod[1];

    // • les dimensions du rectangle "Base" dans la partie basse de la fenêtre
    document.querySelector("#rect_base").style = "width:" + dimensions[0] + "px; height:" + dimensions[1] + "px";

    // • les dimensions du rectangle "Modifié" dans la partie basse de la fenêtre
    document.querySelector("#rect_mod").style = "width:" + dimensions_mod[0] + "px; height:" + dimensions_mod[1] + "px";
}

/////////////

// Ensuite il faut rendre la page interactive. On prépare donc une fonction servant à mettre à jour la matrice et les dimensions de base en fonction des valeurs saisies dans les différents champs :

function recup_valeurs_champs() {

    matrice[0][0] = document.querySelector("#matrice_1a").value;
    matrice[0][1] = document.querySelector("#matrice_1b").value;
    matrice[1][0] = document.querySelector("#matrice_2a").value;
    matrice[1][1] = document.querySelector("#matrice_2b").value;

    dimensions[0] = document.querySelector("#largeur_base").value;
    dimensions[1] = document.querySelector("#hauteur_base").value;

}

// ...et on fait en sorte de réagir à différents événements des champs. Le bloc suivant (boucle for) permet de passer en revue tous les champs avec un attribut type="number" pour leur appliquer à tous le même ensemble d'instructions :

for (le_champ of document.querySelectorAll("input[type='number']")) {

    // Le code qui suit sera répété une fois par champ existant. À chaque fois, la variable le_champ fera référence à un autre champ

    // On donne au champ une propriété "rappels", qui sert à répertorier sous forme d'un tableau tous les éléments de la page portant un attribut "data-rappel" dont la valeur serait l'id du champ que l'on est en train de traiter. À quoi sert cet attribut (personnalisé) ? Voir un peu plus bas.
    le_champ.rappels = document.querySelectorAll("[data-rappel='#" + le_champ.id + "']");

    // La partie importante : l'événement input (qui se déclenche dès que la valeur du champ est modifiée)
    le_champ.oninput = function () {

        recup_valeurs_champs(); // Dès qu'un champ a sa valeur modifiée, on s'assure de mettre à jour la matrice et les coordonnées de base
        appliquer_transformation(); // Puis on effectue le calcul de transformation
        maj_affichage(); // Puis on met la page à jour.

        /* Et concernant cette histoire d'attributs data-rappel :
        ils servent tout simplement à définir que certains éléments doivent agir comme des "rappels" d'autres, donc présenter le même contenu, donc... se mettre à jour dès que leur élément de référence voit son contenu modifié. 
        Note : ici, le mot-clé "this" fait référence au champ, car on se trouve dans une fonction qui lui "appartient" (on parlera plutôt d'une "méthode" dans ce cas) : le_champ.oninput() */
        for (rappel of this.rappels) {
            rappel.textContent = this.value;
        }

    }

    // L'événement focus : se déclenche dès que le champ est "sélectionné" pour y saisir du texte (par exemple en cliquant dessus)
    le_champ.onfocus = function () {

        this.select(); // Astuce confort : on sélectionne l'ensemble du contenu du champ pour permettre de tout de suite taper la nouvelle valeur (sans avoir à effacer l'actuelle)

        // On fait aussi en sorte que les éléments servant éventuellement de rappels au champ soient mis en surbrillance
        for (rappel of this.rappels) {
            rappel.classList.add("actif");
        }
    }

    // L'événement blur : l'inverse de focus. Le champ perd l'aspect "sélectionné" (par exemple en cliquant hors de lui ou en passant au champ suivant via la touche tab)
    le_champ.onblur = function () {

        // Sécurité pour ne pas inclure dans le calcul qui suivra des valeurs nulles / vides
        if (this.value == "") { // Si on "quitte" le champ en le laissant vide,
            this.value = 0; // on force sa valeur à 0 (aucun souci de logique pour le calcul) 
        }

        // Désactiver la surbrillance des éventuels éléments de rappel du champ
        for (rappel of this.rappels) {
            rappel.classList.remove("actif");
        }
    }

}

// Nouvelle boucle for pour traiter des éléments "en masse" - ici tous ceux portant un attribut "data-rappel" :

for (element_rappel of document.querySelectorAll("[data-rappel]")) {

    // Chaque élément de rappel gagne une propriété "cible" (en fait ce sera simplement un raccourci vers l'élément dont il est un rappel)
    element_rappel.cible = document.querySelector(element_rappel.getAttribute("data-rappel"));

    if (element_rappel.cible) { // Sécurité : la suite ne s'exécute que si cette propriété cible contient quelque chose de cohérent (ce qui n'est pas le cas si par exemple on renseigne comme valeur pour l'attribut data-rappel un élément qui n'existe pas)

        // Chaque rappel doit déjà présenter le même contenu que son élément de référence lorsqu'on arrive sur la page, alors qu'aucune modification de valeur de champ n'a eu lieu. À l'exception des éléments portant l'attribut "data-rappel-statique", qui doivent bénéficier des effets de surbrillance mais pas être mis à jour
        if (!element_rappel.hasAttribute("data-rappel-statique")) {
            element_rappel.textContent = element_rappel.cible.value;
        }

        // Au survol d'un rappel, son élément de référence est mis en surbrillance
        element_rappel.onmouseover = function () {
            this.cible.classList.add("surbrillance");
        }

        // À la fin du survol d'un rappel, son élément de référence n'est plus en surbrillance
        element_rappel.onmouseout = function () {
            this.cible.classList.remove("surbrillance");
        }

    }

}