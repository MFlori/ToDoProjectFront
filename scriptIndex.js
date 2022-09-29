"use strict";

const btnStartLogin = document.getElementById("btnStartLogin");
const btnStartRegister = document.getElementById("btnStartRegister");
const loginDiv = document.getElementById("loginHeader");
const registerDiv = document.getElementById("registerHeader");

//Shows Login on btn click
btnStartLogin.addEventListener("click", () => {
  loginDiv.classList.remove("hide");
  registerDiv.classList.add("hide");
});

//shows Register on btn click
btnStartRegister.addEventListener("click", () => {
  registerDiv.classList.remove("hide");
  loginDiv.classList.add("hide");
});

//closes Login and Register when clicking outside div
window.addEventListener("click", (e) => {
  if (loginDiv.contains(e.target) || btnStartLogin.contains(e.target)) {
    // Clicked in box
  } else {
    loginDiv.classList.add("hide");
  }
  if (registerDiv.contains(e.target) || btnStartRegister.contains(e.target)) {
    // Clicked in box
  } else {
    registerDiv.classList.add("hide");
  }
});
