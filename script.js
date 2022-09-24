"use strict";
import "task.js";

const api_url = "http://localhost:8080/tasks";

//DOM Elements
let parentEl = document.getElementById("tasks");
let taskInput = document.getElementById("task");
let notesInput = document.getElementById("notes");
let statusInput = document.getElementById("completed");
let colTodo = document.getElementById("colTodo");
let colNotiz = document.getElementById("colNotiz");
let colStatus = document.getElementById("colStatus");

getTodos(api_url);

// GET Todos from Server
async function getTodos(url) {
  const response = await fetch(url);
  let data = await response.json();

  data.forEach((element) => {
    element.status === false
      ? (element.status = "offen")
      : (element.status = "erledigt");

    colTodo.innerHTML += `<p>${element.task}</p>`;
    colNotiz.innerHTML += `<p>${element.notes}</p>`;
    colStatus.innerHTML += `<p>${element.status}</p>`;
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
}

function showTodoAfterPostRequest() {
  let statusFormatted = statusInput.checked ? "erledigt" : "offen";
  colTodo.innerHTML += `<p>${taskInput.value}</p>`;
  colNotiz.innerHTML += `<p>${notesInput.value}</p>`;
  colStatus.innerHTML += `<p>${statusFormatted}</p>`;
}

const btnAddTask = document.getElementById("addtask");

btnAddTask.addEventListener("click", () => {
  if (taskInput.value.length > 0) {
    postTodos(api_url);
    showTodoAfterPostRequest();
    taskInput.value = "";
    notesInput.value = "";
    statusInput.checked = false;
  } else {
    alert("Todo Feld muss befüllt werden");
  }
});
