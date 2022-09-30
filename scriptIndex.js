"use strict";

const btnStartLogin = document.getElementById("btnStartLogin");
const btnStartRegister = document.getElementById("btnStartReg");
const loginDiv = document.getElementById("loginHeader");
const registerDiv = document.getElementById("registerHeader");

//Shows Login on btn click
btnStartLogin.addEventListener("click", () => {
  loginDiv.classList.remove("hidden");
  registerDiv.classList.add("hidden");
});

//shows Register on btn click
btnStartRegister.addEventListener("click", () => {
  registerDiv.classList.remove("hidden");
  loginDiv.classList.add("hidden");
});

//closes Login and Register when clicking outside div
window.addEventListener("click", (e) => {
  if (loginDiv.contains(e.target) || btnStartLogin.contains(e.target)) {
    // Clicked in box
  } else {
    loginDiv.classList.add("hidden");
  }
  if (registerDiv.contains(e.target) || btnStartRegister.contains(e.target)) {
    // Clicked in box
  } else {
    registerDiv.classList.add("hidden");
  }
});
