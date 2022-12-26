// set JSON server API
const API = "https://sltnbv-json-server.herokuapp.com/hackathon-dom-js";

// get data from JSON server
async function getData() {
  const response = await fetch(API);
  const result = await response.json();

  return result;
}

// write data to JSON server
async function setData(dataObj) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  };
  await fetch(API, options);
}

// function to test writing and getting data from JSON server
async function test() {
  //   const testObj = {
  //     test: "test",
  //   };
  //   await setData(testObj);
  let result = await getData();
  console.log(result);
}
test();

// grab login elements
let inpUserLogin = document.getElementsByClassName(
  "first-screen__login-user"
)[0];
let inpPassLogin = document.getElementsByClassName(
  "first-screen__login-pass"
)[0];
let btnLogin = document.getElementsByClassName("first-screen__login-btn")[0];
//grab create elements
let inpUserCreate = document.getElementsByClassName(
  "first-screen__create-user"
)[0];
let inpPassCreate = document.getElementsByClassName(
  "first-screen__create-pass"
)[0];
let inpEmailCreate = document.getElementsByClassName(
  "first-screen__create-email"
)[0];
let btnCreate = document.getElementsByClassName("first-screen__create-btn")[0];
let loginModal = document.getElementsByClassName("first-screen")[0];
let welcomeMsg = document.getElementsByClassName("welcome__msg")[0];
let inpName = document.getElementsByClassName("first-screen__create-name")[0];
let inpLastName = document.getElementsByClassName(
  "first-screen__create-lname"
)[0];
// listeners
btnLogin.addEventListener("click", async function () {
  await loginUser();
});
btnCreate.addEventListener("click", async function () {
  await createNewUser();
  console.log(inpEmailCreate.value);
});

// create new user
async function createNewUser() {
  const newUser = {
    name: inpName.value,
    lastName: inpLastName.value,
    username: inpUserCreate.value,
    email: inpEmailCreate.value,
    password: inpPassCreate.value,
    posts: [],
  };
  await setData(newUser);
}

// delete user
async function deleteData(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
}

// login existing user
async function loginUser() {
  let users = await getData();
  users.forEach((user) => {
    if (
      user.username === inpUserLogin.value &&
      user.password === inpPassLogin.value
    ) {
      console.log("Login successful");
      loginModal.classList.add("first-screen__hide");
      welcomeMsg.innerHTML = `<h1>Welcome to the social media, ${user.name}</h1>`;
      return;
    }
  });
}

// remove all data from JSON server
async function nukeAll() {
  let users = await getData();
  users.forEach((user) => {
    deleteData(user.id);
  });
}

// nukeAll();
