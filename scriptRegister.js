const btnRegister = document.getElementById("btnRegister");
const newFirstName = document.getElementById("newFirstName");
const newLastName = document.getElementById("newLastName");
const newEmail = document.getElementById("newEmail");
const newPassword = document.getElementById("newPassword");
const errorRegister = document.getElementById("errorRegister");
const newPasswordx2 = document.getElementById("newPasswordx2");
const regFields = new Array(
  newFirstName,
  newLastName,
  newEmail,
  newPassword,
  newPasswordx2
);

const api_url = "http://localhost:8080/newuser";

btnRegister.addEventListener("click", (e) => {
  checkReg(regFields) ? postNewUser(api_url) : null;
});

// POST Todos to Server
async function postNewUser(url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: newFirstName.value,
      lastName: newLastName.value,
      email: newEmail.value,
      password: newPassword.value,
    }),
  }).then((text) => {
    if (text.status === 200) {
      errorRegister.innerHTML += "EmailAdresse bereits registriert";
    } else if (text.status === 201) {
      errorRegister.innerHTML = `User erfolgreich registriert!`;
      errorRegister.style.color = "black";
    } else {
      errorRegister.innerHTML = `Server error!`;
    }
  });
}
function checkReg(fieldArr) {
  let checker = true;
  errorRegister.innerHTML = "";
  errorRegister.style.color = null;
  for (let field of fieldArr) {
    if (field.value === "") {
      field.style.borderColor = "rgb(178, 0, 0)";
      errorRegister.innerHTML +=
        field.getAttribute("aria-label") + " fehlt</br>";
      checker = false;
    } else {
      field.style.borderColor = null;
    }
  }
  if (
    newPassword.value !== newPasswordx2.value &&
    newPassword.value !== "" &&
    newPasswordx2.value !== ""
  ) {
    newPassword.style.borderColor = "rgb(178, 0, 0)";
    newPasswordx2.style.borderColor = "rgb(178, 0, 0)";
    errorRegister.innerHTML += "Passwort wiederholen ist ungleich ";
    checker = false;
  }
  if (ValidateEmail(newEmail.value) === false) {
    errorRegister.innerHTML += "keine gültige Emailadresse eingegeben";
    checker = false;
  }
  return checker;
}

function ValidateEmail(emailString) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailString)) {
    return true;
  } else {
    return false;
  }
}
