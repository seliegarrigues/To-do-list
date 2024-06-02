// Déclare un tableau global pour stocker les tâches
let taches = [];

document.addEventListener("DOMContentLoaded", function() {
    chargerTaches();
    document.querySelector("#form").addEventListener("submit", ajouterTache);
    document.querySelector("#ok").addEventListener("click", function() {
        document.querySelector("#task").focus(); // Met le focus sur le champ input
    });
});

function ajouterTache(event) {
    // Empêche le formulaire de se soumettre et de rafraîchir la page
    event.preventDefault(); 
    const input = document.querySelector("#task");
    // Récupère l'élément input et sa valeur, nettoyée des espaces superflus
    const nouvelleTache = input.value.trim();
    const error = document.querySelector("#error");

    if (!nouvelleTache) {
        error.textContent = "Le champ est vide!";
        return;
    }
    if (taches.includes(nouvelleTache)) {
        error.textContent = "C'est déjà dans la liste!";
        return;
    }

    taches.push(nouvelleTache);
    afficherTache(nouvelleTache);
    sauvegarderTaches();
    input.value = ""; // Réinitialise l'input après l'ajout
    error.textContent = ""; // Efface le message d'erreur
}

// Fonction pour afficher une tâche dans le DOM (Document Object Model)
function afficherTache(tache) {
    // Crée un nouvel élément <li>
    const li = document.createElement("li");
    // Définit le texte de cet élément avec la tâche passée en paramètre
    li.textContent = tache;
    // Crée un nouveau bouton pour la suppression de la tâche
    const boutonEffac = document.createElement("button");
    // Définit le texte du bouton
    boutonEffac.textContent = "supprimer";
    // Ajoute un écouteur d'événement sur le bouton pour gérer la suppression
    boutonEffac.addEventListener("click", function() {
        // Trouve l'indice de la tâche dans le tableau
        const index = taches.indexOf(tache);
        // Vérifie si l'indice existe
        if (index > -1) {
            // Supprime la tâche du tableau
            taches.splice(index, 1);
            // Supprime l'élément <li> du DOM
            li.parentNode.removeChild(li);
            // Met à jour le stockage local après la suppression
            sauvegarderTaches();
        }
       
    });

             
    // Ajoute le bouton au <li>
    li.appendChild(boutonEffac);
    // Ajoute le <li> à la liste ul#liste dans le DOM
    document.querySelector("#liste").appendChild(li);
}



// Fonction pour sauvegarder l'état actuel des tâches dans le stockage local
function sauvegarderTaches() {
    // Convertit le tableau des tâches en chaîne JSON et l'enregistre dans localStorage
    localStorage.setItem("taches", JSON.stringify(taches));
}

// Fonction pour charger les tâches sauvegardées lorsque le document est prêt
function chargerTaches() {
    // Récupère les tâches enregistrées dans localStorage, ou utilise un tableau vide si rien n'est trouvé
    const tachesEnregistrees = localStorage.getItem("taches");
    // Parse la chaîne JSON en un tableau d'objets
    taches = tachesEnregistrees ? JSON.parse(tachesEnregistrees) : [];
    // Pour chaque tâche dans le tableau, l'affiche dans le DOM
    taches.forEach(afficherTache);
}

// Ajoute un écouteur d'événement pour charger les tâches lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", chargerTaches);
