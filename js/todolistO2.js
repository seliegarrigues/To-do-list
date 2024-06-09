// cibler les 3 élements task c'est l'input add c'est le bouton, liste c'est ul
let task = document.getElementById("task"); // methode 1
let add = document.querySelector("#add"); // methode 2
let liste = document.querySelector("#liste");
let form = document.querySelector("#form");
// on doit declarer un tableau ici vide dans la fonction display

function getData() {
  let array = JSON.parse(localStorage.getItem("data")) || [];
  return array;
}

console.log(getData());

function addTask() {
  let array = getData();
  array.push(task.value);
  localStorage.setItem("data", JSON.stringify(array));
  task.value = "";
  task.focus();
}

function displayTask() {
  let array = getData();
  let i = 1;
  for (let task of array) {
    // variable qui présente chanq eelement d ema liste
    createElement(task); // à chaque fois, je cree un li sur toute la longueur d elaise
    console.log(i);
    i++;
  }
}

function createElement(task) {
  let li = document.createElement("li");
  li.textContent = task;
  let btn = document.createElement("button");
  btn.textContent = "supprimer";
  li.appendChild(btn);
  liste.appendChild(li);
  btn.addEventListener("click", function () {
    deleteTask(task);
  });
}
function deleteTask(tache) {
  let tab = getData();
  let index = tab.indexOf(tache);
  tab.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(array));
}

displayTask();
form.addEventListener("submit", addTask);
