"use strict";

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
  document.getElementById("taskContainer").innerHTML = "";

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
  getTodos(api_url);
}

//deletes Task from Server
function deleteTodos(url) {
  console.log(url);
  fetch(url, { method: "DELETE" });
}

//fügt den View eine neue Zeile Todos hinzu
function addTaskLine(newTask) {
  taskContainer.innerHTML += `  
    <div class="row taskHeader" id="${newTask.id}">
     <div class="col" id="taskElement">${newTask.task}</div>
     <div class="col" id="taskElement">${newTask.notes}</div>
     <div class="col" id="taskElement">${
       newTask.status === true ? "erledigt" : "offen"
     }</div>
     <div class="col" id="taskElement">${formatDate(newTask.dateCreated)}</div>
     <div class="col" id="taskElement"><img class="deleteTaskImage" src="./resources/images/del_icon.png" alt="removeImg" /></div>
    </div>`;
  //// CONTINUE HERE!!! don't use "onclick" --> better use Eventlistener
}

function formatDate(str) {
  return (
    str.substring(8, 10) + "." + str.substring(5, 7) + "." + str.slice(0, 4)
  );
  //  2022-09-26T07:17:41.024+00:00
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
    let idTask = e.target.parentNode.parentNode.id;
    deleteTodos(api_url + "/" + idTask);
    e.target.parentNode.parentNode.remove();
  }
});
