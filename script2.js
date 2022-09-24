"use strict";
import { Task } from "./task.js";

//DOM Elements

let taskInput = document.getElementById("task");
let notesInput = document.getElementById("notes");
let statusInput = document.getElementById("completed");
let taskContainer = document.getElementById("taskContainer");
const btnAddTask = document.getElementById("addtask");

const api_url = "http://localhost:8080/tasks";

getTodos(api_url);

///FUNCTIONS

// GET Todos from Server
async function getTodos(url) {
  const response = await fetch(url);
  let data = await response.json();

  data.forEach((element) => {
    addTaskLine(element);
  });
}

// POST Todos to Server and update 'taskArray'
async function postTodos(url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: taskInput.value,
      notes: notesInput.value,
      status: statusInput.checked ? true : false,
    }),
  });
  addTaskAfterPostRequest();
}

//deletes Task from Server
function deleteTodos(url) {
  console.log(url);
  fetch(url, { method: "DELETE" });
}

//adds the posted Element to View
async function addTaskAfterPostRequest() {
  await fetch(api_url)
    .then((res) => res.json())
    .then((data) => {
      addTaskLine(data[data.length - 1]);
    });
}

//fügt den View eine neue Zeile Todos hinzu
function addTaskLine(newTask) {
  taskContainer.innerHTML += `  
    <div class="row taskHeader" id="task${newTask.id}">
     <div class="col" id="taskElement">${newTask.task}</div>
     <div class="col" id="taskElement">${newTask.notes}</div>
     <div class="col" id="taskElement">${
       newTask.status === true ? "erledigt" : "offen"
     }</div>
     <div class="col" id="taskElement"><img class="deleteTaskImage" src="./resources/images/del_icon.png" alt="removeImg" /></div>
    </div>`;
  //// CONTINUE HERE!!! don't use "onclick" --> better use Eventlistener
}

//EVENTLISTENER

//click on button starts post request
btnAddTask.addEventListener("click", () => {
  if (taskInput.value.length > 0) {
    postTodos(api_url);
    taskInput.value = "";
    notesInput.value = "";
    statusInput.checked = false;
  } else {
    alert("Todo Feld muss befüllt werden");
  }
});

//click on trashcan icon starts removal of this task
document.getElementById("taskContainer").addEventListener("click", (e) => {
  if (e.target.className === "deleteTaskImage") {
    let idTask = e.target.parentNode.parentNode.id.slice(4);
    deleteTodos(api_url + "/" + idTask);
    e.target.parentNode.parentNode.remove();
  }
});
