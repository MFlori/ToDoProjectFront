const userNameInput = document.getElementById("userName");
const passwordInput = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const errorLogin = document.getElementById("errorLogin");

btnLogin.addEventListener("click", () => {
  if (userNameInput.value !== "" && passwordInput.value !== "") {
    const userID = getUserID(
      "http://localhost:8080/getUserID/" +
        userNameInput.value +
        "/" +
        passwordInput.value
    );
  } else {
    errorLogin.innerHTML = "Benutzername UND Passwort eingeben</br>";
  }
});

async function getUserID(url) {
  const response = await fetch(url);
  let data = await response.text();
  if (data !== "") {
    document.location = "home.html?user=" + data;
  } else {
    errorLogin.innerHTML = "Passwort ungültig oder User nicht angelegt";
  }
}
