
/// Ecouter l'événement pour charger les tâches au chargement de la page
document.addEventListener("DOMContentLoaded", chargerTaches);

// Étape 1: Sélection du bouton par son ID
const boutonAjouter = document.querySelector("#add");


if (boutonAjouter) {
// Étape 2: Attacher l'écouteur d'événement au bouton
boutonAjouter.addEventListener("click", ajouterTache);
}

// Fonction pour ajouter une nouvelle tâche via le formulaire
function ajouterTache(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    const input = document.querySelector("#task");
    const nouvelleTache = input.value.trim();

    if (nouvelleTache) {
        const taches = recupererTaches();
        if (!taches.includes(nouvelleTache)){

            taches.push(nouvelleTache);
            sauvegarderTaches(taches);
            afficherTache(nouvelleTache);
            input.value = "";
        } else {
            alert("Cette tâche est déjà dans la liste!");
        }
    }
}

// Fonction pour afficher une tâche dans le DOM
function afficherTache(tache) {
    const li = document.createElement("li");
    li.textContent = tache;
    const boutonEffac = document.createElement("button");
    boutonEffac.textContent = "Supprimer";
    boutonEffac.addEventListener("click", function () {
        li.remove();
        supprimerTache(tache);
    });
    li.appendChild(boutonEffac);
    document.querySelector("#liste").appendChild(li);
}

// Fonction pour charger les tâches au démarrage de l'application
function chargerTaches() {
    const taches = recupererTaches();
    taches.forEach(afficherTache)
    }

// Fonction pour récupérer les tâches stockées dans le stockage local
function recupererTaches() {
    const tachesEnregistrees = localStorage.getItem("taches");
    return tachesEnregistrees ? JSON.parse(tachesEnregistrees) : [];
}

// Fonction pour sauvegarder les tâches dans le stockage local
function sauvegarderTaches(taches) {
    localStorage.setItem("taches", JSON.stringify(taches));
}

// Fonction pour supprimer une tâche du stockage local
function supprimerTache(tacheASupprimer) {
    const taches = recupererTaches();
    const index = taches.indexOf(tacheASupprimer);
    if (index > -1) {
        taches.splice(index, 1);
    }
    sauvegarderTaches(taches);
}

//Affiche un message dans la console lorsque le bouton est cliqué
console.log("le bouton est cliqué");
