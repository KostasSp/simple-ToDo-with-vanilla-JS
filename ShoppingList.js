// eslint-disable-next-line strict
"use strict";

const inputBox = document.querySelector(".inputBox input");
const addButton = document.querySelector(".inputBox button");
const shoppingList = document.querySelector(".shoppingItems");
const deleteAll = document.querySelector(".footer button");
const howManyPending = document.querySelector(".pendingTasks");
//const bt = document.getElementById("submit");

// const btn = document.getElementById("myBtn")
// const input = document.getElementById("myInput")
// inputBox.addEventListener("keyup", function(event) {
//     if (event.key === 'Enter') {
//         event.preventDefault();
//         addButton.click();
//     }
//  });

//||

inputBox.onkeyup = () => {
  let elements = inputBox.value;
  if (elements.trim() !== 0) {
    addButton.classList.add("active");
  }
  inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      //event.preventDefault();
      addButton.click();
    }
  });
};

// inputBox.onkeyup = () => {
//     let elements = inputBox.value;
//         if (elements.trim() !== 0) {
//             addButton.classList.add("active");

//     }
// }

//howManyPending.textContent = 0;
whatIsThis();

addButton.onclick = () => {
  let userInput = inputBox.value;
  let lclStr = localStorage.getItem("new");
  let myList = [];

  //if (lclStr) {
  myList = JSON.parse(lclStr);
  //}

  if (inputBox.value !== "") {
    myList.push(userInput);
  }

  localStorage.setItem("new", JSON.stringify(myList));
  console.log(localStorage);
  console.log(myList);
  whatIsThis();
};

function whatIsThis() {
  let myList = [];
  let getNewStuff = localStorage.getItem("new");
  if (getNewStuff == null) {
    myList = [];
  } else {
    myList = JSON.parse(getNewStuff);
  }

  howManyPending.textContent = myList.length;

  if (myList.length > 0) {
    deleteAll.classList.add("active");
    // } else {
    //     deleteButton.classList.remove("active");
  }
  let listItemTag = "";
  myList.forEach((element, index) => {
    listItemTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  shoppingList.innerHTML = listItemTag;
  inputBox.value = "";
}

let deleteTask = (param) => {
  let lclStr = localStorage.getItem("new");
  let myList = JSON.parse(lclStr);
  myList.splice(param, 1);
  localStorage.setItem("new", JSON.stringify(myList));
  whatIsThis();
};

deleteAll.onclick = () => {
  let myList = []; //empty the array
  localStorage.setItem("new", JSON.stringify(myList)); //set the item in localstorage
  whatIsThis(); //call the showTasks function
};
