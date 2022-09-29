const userNameInput = document.getElementById("userName");
const passwordInput = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", () => {
  const userID = getUserID(
    "http://localhost:8080/getUserID/" +
      userNameInput.value +
      "/" +
      passwordInput.value
  );
});

async function getUserID(url) {
  const response = await fetch(url);
  let data = await response.text();
  if (data !== "") {
    console.log(data);
    document.location = "home.html?user=" + data;
  } else {
    console.log("error");
  }
}
