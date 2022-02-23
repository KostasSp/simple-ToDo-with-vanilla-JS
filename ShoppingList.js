// eslint-disable-next-line strict
"use strict";

const inputBox = document.querySelector(".inputBox input");
const addButton = document.querySelector(".inputBox button");
const shoppingList = document.querySelector(".shoppingItems");
const deleteAll = document.querySelector(".footer button");
const howManyPending = document.querySelector(".pendingTasks");

inputBox.onkeyup = () => {
  let elements = inputBox.value;
  if (elements.trim() !== 0) addButton.classList.add("active");
  inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addButton.click();
  });
};

populateList();

addButton.onclick = () => {
  let userInput = inputBox.value;
  let lclStr = localStorage.getItem("new");
  let temp = JSON.parse(lclStr);

  if (inputBox.value !== "") temp.push(userInput);

  localStorage.setItem("new", JSON.stringify(temp));
  populateList();
};

function populateList() {
  let temp = null;
  let getNewStuff = localStorage.getItem("new");
  getNewStuff == null ? (temp = "") : (temp = JSON.parse(getNewStuff));

  howManyPending.textContent = temp.length;

  if (temp.length > 0) deleteAll.classList.add("active");

  let listItemTag = "";
  temp.forEach((element, index) => {
    listItemTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  shoppingList.innerHTML = listItemTag;
  inputBox.value = "";
}

let deleteTask = (param) => {
  let lclStr = localStorage.getItem("new");
  let temp = JSON.parse(lclStr);
  temp.splice(param, 1);
  localStorage.setItem("new", JSON.stringify(temp));
  populateList();
};

deleteAll.onclick = () => {
  let temp = [];
  localStorage.setItem("new", JSON.stringify(temp));
  populateList();
};
