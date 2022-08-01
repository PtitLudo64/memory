console.log('Memory');

const baseURL = "../img/"
const map = document.querySelectorAll('.case');
const images = [
    "bear-emoji",
    "cat-face--v1",
    "american-football-emoji",
    "game-die",
    "banana-emoji",
    "saxophone-emoji",
    "airplane-emoji",
    "watch-emoji"
];
const modale = document.querySelector('#modale');
const modaleButton = document.querySelector('#modale button');
modaleButton.addEventListener('click', init);

let secret = [];
let cpt = {};
let caseRevealed = 0;
let lastRevealed = -1;
let pairesRevealed = 0;
for (let i = 0; i < map.length; i++) {
    map[i].addEventListener('click', () => {
        reveal(i)
    });
}

function init() {
    secret = [];
    cpt = {};
    caseRevealed = 0;
    lastRevealed = -1;
    pairesRevealed = 0;
    modale.style.visibility = 'hidden';
    //masque les cases
    for (let i = 0; i < map.length; i++) {
        map[i].innerHTML = "";
    }
    for (let j = 0; j < map.length; j++) {
        let truc = countOccurences(secret);
        let nbAleatoire = randomize(1, 9);
        while (truc[nbAleatoire] == 2) {
            nbAleatoire = randomize(1, 9);
        }
        secret.push(nbAleatoire);
    }
}

//retourne un nombre aléatoire entre min (inclus) et max (exclus)
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// compte le nombre d'occurence dans un Array
function countOccurences(tab) {
    var result = {};
    tab.forEach(function (elem) {
        if (elem in result) {
            result[elem] = ++result[elem];
        } else {
            result[elem] = 1;
        }
    });
    return result;
}

function reveal(c) {
    if (map[c].innerHTML == '') {
        caseRevealed++;
        map[c].innerHTML = "<img src=" + baseURL + images[secret[c] - 1] + ".png />";
        if (caseRevealed == 2) {
            //check si 2 img identiques
            caseRevealed = 0;
            if (secret[lastRevealed] == secret[c]) {
                pairesRevealed++;
                if (pairesRevealed == 8) {
                    modale.style.visibility = 'visible';
                }
                map[c].removeEventListener('click', () => {
                    reveal(c)
                });
            } else {
                setTimeout(() => {
                    map[c].innerHTML = "";
                    map[lastRevealed].innerHTML = "";
                }, 1000);
            }
        } else {
            // Sinon ras des 2 cases
            lastRevealed = c;
        }
    }
}

init();