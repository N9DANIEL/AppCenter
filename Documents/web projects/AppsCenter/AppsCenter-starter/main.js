"use strict";

const getData = () => {
    if (localStorage.getItem('applications') == null) {
        localStorage.setItem('applications', JSON.stringify(applications));
        localStorage.setItem('id', id);
    }

    return JSON.parse(localStorage.getItem('applications'));
}

document.addEventListener("DOMContentLoaded", () => {

});

const showApps = () => {
    let stringHTML = "";
    let apps = getData();

    for (let index = 0; index < apps.length; index++) {
        let appDesc = apps[index].desc;
        let appCompanyName = apps[index].companyName;
        stringHTML += 
        `
        <div class = "item rounded" id = "${apps[index].id}">
            <div class = "image">
                <img src = "./images/${apps[index].imageUrl}" class = "rounded-circle"
                 alt = "Not Found" onerror="this.src='images/Help.png';" height = "150" width = "150">
            </div>
            <div class = "details" style= "margin-left: 3vh; margin-top: 1vh">
                <h3>${apps[index].name}</h3>
                <p>${appDesc.length == 0 ? "This app does not have a description" : appDesc} </br>
                Price: ${apps[index].price} $ </br>
                Company Name: ${appCompanyName.length == 0 ? "This app does not have a company" : appCompanyName}
                </p>
            </div>
        </div>
        `;
    }

    document.getElementById("content").innerHTML = stringHTML;
}

window.onload = () => {
    showApps();
    let filterBox = document.getElementById("filterBox");

    filterBox.addEventListener("input", (event) => {
        let text = filterBox.value;
        let apps = getData();
        
        apps.forEach((app) => {
            let element = document.getElementById(app.id);
            app.name.toLowerCase().includes(text.toLowerCase()) ? 
            element.style.display = "flex": element.style.display = "none";
        });
    });
}