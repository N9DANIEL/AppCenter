"use strict";

const MIN_NAME_LENGTH = 4;
const MAX_NAME_LENGTH = 30;
const MIN_PRICE_LENGTH = 1;
const MAX_DESC_LENGTH = 500;
const MAX_COMPNAME_LENGTH = 30;
const MAX_IMG_URL_LENGTH = 300;

const addItemToTheList = (data) => {
    localStorage.setItem('applications', JSON.stringify(JSON.parse(localStorage.getItem('applications')).concat(data)));
}

const getNextId = () => {
    let id = localStorage.getItem('id');
    localStorage.setItem('id', ++id);
    
    return id;
}

document.addEventListener("DOMContentLoaded", () => {
		
});

const validateName = (name) => {
    let pattern = new RegExp(/^[a-zA-Z0-9]*$/);
    
    if ((name.length < MIN_NAME_LENGTH) || (name.length > MAX_NAME_LENGTH)) {
        return false;
    }

    return pattern.test(name);
}

const validatePrice = (priceStr) => {
    let pattern = new RegExp(/^[0-9.]*$/);

    if (priceStr.length < MIN_PRICE_LENGTH) {
        return false;
    }

    return pattern.test(priceStr);
}

const validateDescription = ((description) => description.length <= MAX_DESC_LENGTH);

const validateCompanyName = ((companyName) => companyName.length <= MAX_COMPNAME_LENGTH);

const validateImageUrl = ((imageUrl) => imageUrl.length <= MAX_IMG_URL_LENGTH);

const validateApp = (app) => {
    if (!validateName(app.name)) {
        return false;
    }

    if (!validatePrice(app.price)) {
        return false;
    }

    if (!validateDescription(app.description)) {
        return false;
    }

    if (!validateCompanyName(app.companyName)) {
        return false;
    }

    if (!validateImageUrl(app.imageUrl)) {
        return false;
    }

    return true;
}

window.onload = () => {
    let nameElement = document.getElementById("name");

    nameElement.addEventListener("input", (event) => {
        let name = nameElement.value;

        if (validateName(name)) {
            nameElement.classList.remove("invalid-input");
            nameElement.classList.add("valid-input")
        } else {
            nameElement.classList.remove("valid-input");
            nameElement.classList.add("invalid-input");
        }
    })

    let priceElement = document.getElementById("price");
    
    priceElement.addEventListener("input", (event) => {
        let price = priceElement.value;

        if (validatePrice(price)) {
            priceElement.classList.remove("invalid-input");
            priceElement.classList.add("valid-input")
        } else {
            priceElement.classList.remove("valid-input");
            priceElement.classList.add("invalid-input")
        }
    });

    document.getElementById("form").addEventListener("submit", (event) => {
        event.preventDefault();

        let app = {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            description: document.getElementById("description").value,
            companyName: document.getElementById("companyName").value,
            imageUrl: document.getElementById("imageUrl").value,
        }

        if (validateApp(app)) {
            let data = {
                id: getNextId(),
                imageUrl: app.imageUrl,
                name: app.name,
                price: app.price,
                desc: app.description,
                companyName: app.companyName,
            }

            addItemToTheList(data);
            location.href = "./mainPage.html";
        } else {
            document.getElementById("errorBar").innerHTML = "Oops, something went wrong! </br> Check your fields again."
        }
    });
}