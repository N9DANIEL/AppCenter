"use strict";

const setElementClassesByValidity = (elementName, isValid) => {
  document
    .getElementById(elementName)
    .classList.remove(isValid ? "is-invalid" : "is-valid");
  document
    .getElementById(elementName)
    .classList.add(isValid ? "is-valid" : "is-invalid");
};

//adding event listenner to the inputs and change there classes if not valid
document.addEventListener("DOMContentLoaded", () => {
  const namePattern = /^[a-zA-Z0-9]{4,30}$/;

  document.getElementById("name").addEventListener("input", () => {
    const isValid = document.getElementById("name").value.match(namePattern);

    setElementClassesByValidity("name", isValid);
  });

  document.getElementById("price").addEventListener("input", () => {
    const isValid =
      document.getElementById("price").value.length > 0 &&
      !isNaN(document.getElementById("price").value);

    setElementClassesByValidity("price", isValid);
  });
});

const isInputValid = (elementId) => {
  return document.getElementById(elementId).classList.contains("is-valid");
};

//check there classes - if the class contains is-valid, you can continue if not you get the error messege
const validateAppFields = () => {
  if (isInputValid("name") && isInputValid("price")) {
    return true;
  }

  document.getElementById("error").innerHTML =
    "Oops, something went wrong!<br>Check your fields again.";
  return false;
};

//check if all the fields valid  and adding the item to the local storage -getting the values from the html inputs
const addApp = async () => {
  if (validateAppFields()) {
    const appToAdd = {
      imageUrl: document.getElementById("ImageUrl").value,
      name: document.getElementById("name").value,
      price: document.getElementById("price").value,
      desc: document.getElementById("description").value
        ? document.getElementById("description").value
        : "this app does not have a description",
      companyName: document.getElementById("companyName").value
        ? document.getElementById("companyName").value
        : "this app doesnt have a company",
    };

    await addAppToList(appToAdd);

    window.location.href = "MainPage.html";
  }
};
