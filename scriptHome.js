"use strict";

//DOM Elements

const taskInput = document.getElementById("task");
const notesInput = document.getElementById("notes");
const statusInput = document.getElementById("completed");
const taskContainer = document.getElementById("taskContainer");
const changeTask = document.getElementById("changeTask");
const changeNotes = document.getElementById("changeNotes");
const changeStatus = document.getElementById("changeCompleted");
const btnAddTask = document.getElementById("btnAddTask");
const btnUpdateTask = document.getElementById("btnSaveChange");
const dimmer = document.getElementById("dimmer");
const todoChanger = document.getElementById("todoChanger");
const userID = getUserID().slice(1, -1);
let selectedId;

const api_url = "http://localhost:8080/tasks";

getTodos(api_url + "/" + userID);

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

// POST Todos to Server
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
  getTodos(api_url + "/" + userID);
}

// UPDATE Todos to Server
async function updateTodos(url) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: changeTask.value,
      notes: changeNotes.value,
      status: changeStatus.checked ? true : false,
    }),
  });
  getTodos(api_url);
}

//deletes Task from Server
function deleteTodos(url) {
  fetch(url, { method: "DELETE" });
}

//fügt den View eine neue Zeile Todos hinzu
function addTaskLine(newTask) {
  taskContainer.innerHTML += `  
    <div class="row taskHeader" id="${newTask.id}">
     <div class="col editableTodo" id="taskElementTask">${newTask.task}</div>
     <div class="col editableTodo" id="taskElementNotes">${newTask.notes}</div>
     <div class="col editableTodo" id="taskElementState">${
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

function getUserID() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  return params.user; // "some_value"
}

//EVENTLISTENER

//click on button starts post request
btnAddTask.addEventListener("click", () => {
  if (taskInput.value.length > 0) {
    postTodos(api_url + "/" + userID);
    taskInput.value = "";
    notesInput.value = "";
    statusInput.checked = false;
  } else {
    alert("Todo Feld muss befüllt werden");
  }
});

//start update process with click on button

btnUpdateTask.addEventListener("click", () => {
  updateTodos(api_url + "/update/" + selectedId);
  closeChanger();
});

//show details or delete Tasks
document.getElementById("taskContainer").addEventListener("click", (e) => {
  //click on trashcan icon starts removal of this task
  if (e.target.className === "deleteTaskImage") {
    let idTask = e.target.parentNode.parentNode.id;
    deleteTodos(api_url + "/delete/" + idTask);
    e.target.parentNode.parentNode.remove();
  }
  //click on anything else in this row starts change process
  if (e.target.className === "col editableTodo") {
    dimmer.style.visibility = "visible";
    todoChanger.style.visibility = "visible";
    changeTask.value = e.target.parentNode.children[0].textContent;
    changeNotes.value = e.target.parentNode.children[1].textContent;
    e.target.parentNode.children[2].textContent === "erledigt"
      ? (changeCompleted.checked = true)
      : (changeCompleted.checked = false);
  }
  selectedId = e.target.parentNode.id;
});

//dimm Screen when changing Todos
dimmer.addEventListener("click", () => closeChanger());

function closeChanger() {
  dimmer.style.visibility = "hidden";
  todoChanger.style.visibility = "hidden";
}
