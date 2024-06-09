// Déclaration et initialisation des variables pour accéder aux éléments du DOM
let inputTache = document.getElementById("task");
let ajouter = document.getElementById("add");
let listeTaches = document.getElementById("liste");

// Fonction pour récupérer les tâches depuis le stockage local
function recupererTaches() {
  let taches = JSON.parse(localStorage.getItem("taches")) || [];
  return taches;
}
// Fonction pour afficher toutes les tâches dans la liste HTML
function afficherTaches() {
  // Efface le contenu actuel de la liste pour éviter les doublons
  listeTaches.innerHTML = ""; // Vide la liste avant de l'afficher

  // Récupère les tâches du stockage local
  const taches = recupererTaches();

  taches.forEach((tache) => {
    // Crée un nouvel élément 'li' pour chaque tâche
    let li = document.createElement("li");
    // Crée un bouton pour supprimer la tâche
    let btn = document.createElement("button");
    btn.textContent = "supprimer";
    // Définit le texte de 'li' avec la tâche
    li.textContent = tache;
    // Ajoute le bouton à 'li'
    li.appendChild(btn);
    // Ajoute un écouteur d'événements pour supprimer la tâche quand le bouton est cliqué
    btn.addEventListener("click", function () {
      supprimer(tache);
    });
    // Ajoute 'li' à la liste 'ul' dans le DOM
    listeTaches.appendChild(li);
  });
}
// Fonction pour ajouter une nouvelle tâche à partir de l'input
function ajouterTask() {
  // Récupère les tâches actuelles du stockage local
  let taches = recupererTaches();
  // Nettoie la valeur entrée et la stocke
  let nouvelleTacheValue = inputTache.value.trim();

  // Vérifie si la tâche est non vide et unique
  if (nouvelleTacheValue && !taches.includes(nouvelleTacheValue)) {
    // Ajoute la nouvelle tâche au tableau
    taches.push(nouvelleTacheValue);
    // Met à jour le stockage local
    localStorage.setItem("taches", JSON.stringify(taches));
    // Efface le champ de saisie
    inputTache.value = "";
    // Rafraîchit l'affichage des tâches
    afficherTaches();
  } else {
    // Alerte si la tâche est un doublon ou vide
    alert("Cette tâche existe déjà ou est vide!");
  }
}
// Attache la fonction ajouterTask à l'événement click du bouton
ajouter.addEventListener("click", ajouterTask);

// Fonction pour supprimer une tâche spécifique du stockage local et de l'affichage
function supprimer(tacheASupprimer) {
  // Récupère les tâches actuelles
  let taches = recupererTaches();
  // Trouve l'indice de la tâche à supprimer
  let index = taches.indexOf(tacheASupprimer);
  if (index > -1) {
    // Supprime la tâche du tableau
    taches.splice(index, 1);
    // Met à jour le stockage local
    localStorage.setItem("taches", JSON.stringify(taches));
    afficherTaches(); // Rafraîchit la liste après la suppression
  }
}
// Attache la fonction afficherTaches à l'événement DOMContentLoaded pour charger les tâches au démarrage
document.addEventListener("DOMContentLoaded", afficherTaches);
