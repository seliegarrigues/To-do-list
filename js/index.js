// Définit la fonction toDoList qui est appelée lors du clic sur le bouton
function toDoList(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre et de rafraîchir la page

    // Récupère l'élément input par son ID et stocke dans la variable input
    const input = document.querySelector("#task");

    // Supprime les espaces avant et après le texte entré et stocke le résultat
    const nouvelleTache = input.value.trim();

    // Vérifie si la nouvelle tâche n'est pas une chaîne vide
    if (nouvelleTache !== "") {

        // Crée un nouvel élément li pour la liste
        const li = document.createElement("li");

        // Utiliser une structure de texte + bouton
        li.textContent = nouvelleTache;  // Assigner directement le texte à li

        // Crée un bouton pour supprimer la tâche
        const boutonEffac = document.createElement("button");

        // Définit le texte du bouton à "Supprimer"
        boutonEffac.textContent = "Supprimer";

        // Écoute l'événement au bouton qui, lorsqu'il est cliqué, supprime le li de la liste
        boutonEffac.addEventListener("click", function() {
            li.parentNode.removeChild(li);
            sauvegarderTaches();
        });

        // Ajoute le bouton de suppression à l'élément li
        li.appendChild(boutonEffac);

        // Ajoute l'élément li à la liste ul par son ID
        const listeTaches = document.querySelector("#liste");
        listeTaches.appendChild(li);

        // Sauvegarde après ajout
        sauvegarderTaches();
    }

    // Vide le champ input après l'ajout de la tâche pour préparer l'entrée de la prochaine tâche
    input.value = ""; // Vide l'input
}

// Ajoutez une fonction pour sauvegarder la liste des tâches dans le stockage local.
function sauvegarderTaches() {
    const listeLi = document.querySelectorAll("#liste li");
    const taches = Array.from(listeLi).map(li => li.firstChild.textContent || li.textContent);
    localStorage.setItem("task", JSON.stringify(taches));
}

// Fonction pour charger les tâches sauvegardées au chargement de la page
function chargerTaches() {
    const taches = JSON.parse(localStorage.getItem("task")) || [];
    taches.forEach(tache => {
        const li = document.createElement("li");
        li.textContent = tache;
        const boutonEffac = document.createElement("button");
        boutonEffac.textContent = "Supprimer";
        boutonEffac.addEventListener("click", function() {
            li.parentNode.removeChild(li);
            sauvegarderTaches();
        });
        li.appendChild(boutonEffac);
        document.querySelector("#liste").appendChild(li);
    });
}

// Ajoute un écouteur d'événement pour charger les tâches au chargement de la page
document.addEventListener("DOMContentLoaded", chargerTaches);

// Sélection du formulaire et attacher l'écouteur d'événement pour prévenir la soumission normale
const form = document.querySelector("#form");
form.addEventListener("submit", toDoList);
