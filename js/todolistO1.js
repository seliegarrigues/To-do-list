// cibler les 3 élements task c'est l'input add c'est le bouton, liste c'est ul
let task = document.getElementById("task"); // methode 1
let add = document.getElementById("add"); // methode 1
let liste = document.getElementById("liste"); // methode 1
let form = document.querySelector("#form"); // methode 2
let error = document.querySelector("#error");

// Initialisation du tableau des tâches à partir du localStorage ou à vide si rien n'est trouvé
let array = [];
array = JSON.parse(localStorage.getItem("data")) || []; // il recupère les données sinon il laisse le tableau vide et ne fait rien

// Fonction pour afficher les tâches
function displayText() {
  // Nettoie la liste avant de l'afficher
  liste.innerHTML = "";

  for (let item of array) {
    // représente chaque élément du tableau
    let li = document.createElement("li"); // creation de li
    li.textContent = item; // le contenu du li correspond à la valeur de ce qui est dans l'input
    liste.appendChild(li); // pour afficher ce qu'on a cree ici li, il faut qu'il appartienne à un parent
    let btn = document.createElement("button"); // creer un bouton pour supprimer la liste
    btn.textContent = "supprimer"; // indique le contenu du bouton que l'on vient de créer
    li.appendChild(btn); // pour afficher il faut le rattacher à son parent
    btn.addEventListener("click", function () {
      let index = array.indexOf(item); // recherche la valeur pour recueprer son indice
      array.splice(index, 1); // pour supprimer il faut sa place et 1 cad le nombre d'elements à supprimer
      localStorage.setItem("data", JSON.stringify(array));
      displayText();
    });
  }
}
// Fonction pour ajouter des tâches
function ajouterTache(e) {
  e.preventDefault(); // fonction a utiliser tout le temps cela evite que la page se recharge automatiquement,
  // ce que fait forcement un form avec le submit

  if (!task.value || array.includes(task.value)) {
    // 2 opérateurs logiques le not et le ou
    //alert(`la valeur de ${task.value} existe déjà ou la tâche est vide`) // pour eviter  d'ajouter quand une valeur est identique ou vide
    error.textContent = `La valeur '${task.value}' existe déjà ou la tâche est vide.`;
    task.focus();
  } else {
    array.push(task.value); // ajoute la valeur de l'input dans le tableau
    localStorage.setItem("data", JSON.stringify(array)); // envoyer les données et les transformer en format adapté au local storage
    task.value = ""; //  pour remettre l input a zero, cette ligne doit etre apres le push
    task.focus(); // pour que le curseur revienne dans l'input
    displayText(); // pour rappeler la fonction displaytext pour qu'elle se déclenche à nouveau
  }
}
// ajouter un évènement, ici au click et declenche la fonction ajouterTache
//add.addEventListener ("click",ajouterTache)
form.addEventListener("submit", ajouterTache);

// Appel initial pour afficher les tâches existantes
displayText();
