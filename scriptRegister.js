const btnRegister = document.getElementById("btnRegister");
const newFirstName = document.getElementById("newFirstName");
const newLastName = document.getElementById("newLastName");
const newEmail = document.getElementById("newEmail");
const newPassword = document.getElementById("newPassword");
const registerInfo = document.getElementById("registerInfo");

const api_url = "http://localhost:8080/newuser";

btnRegister.addEventListener("click", (e) => {
  console.log("Hello World");
  postNewUser(api_url);
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
      registerInfo.innerHTML = "EmailAdresse bereits registriert";
    } else if (text.status === 201) {
      registerInfo.innerHTML = `User erfolgreich registriert! <a href="login.html">login here</a>`;
    } else {
      console.log(text.status);
      registerInfo.innerHTML = `Server error!`;
    }
  });
}
