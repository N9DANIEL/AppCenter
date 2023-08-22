"use strict";

const getData = async () => {
  return await getAppList();
};

const buildAppsHTML = async (filteredApps) => {
  const apps = filteredApps || (await getData());

  const strAppsHtml = apps.map((app) => {
    const str = app.price.toString().substring(0, 4);
    return `<div class='row application' data-info='${
      app.name
    }'><div class='col-md-1 offset-md-3'>
    ${
      app.imageurl
        ? `<img src="../assets/images/${app.imageurl}" class="rounded-circle" width='100px' height='100px' />`
        : `<img src='../assets/images/Help.png' width='100px' height='100px' class='rounded-circle' />`
    }
     </div><div class='col-4'><div><div class='headline'>${app.name}</div>
 ${
   app.desc
     ? `<div class='description'>${app.desc}</div>`
     : `<div class='description'>This app does not have description</div>`
 }
      <div class='price'>Price: ${str}$</div>
   ${
     app.companyname
       ? `<div class='company'>Company name: ${app.companyname}</div>`
       : "<div class='company'>Company name: This app does not have company</div>"
   }
  </div></div>
  <div class='col-1 d-flex align-items-center'>
    <button type="button" class="btn btn-danger button-circle text-light" onclick="removeApp('${
      app.id
    }')">🗑</button>
  </div>
  <div class='col-3'></div>
  </div><br>`;
  });

  document.getElementById("Apps").innerHTML = strAppsHtml.join("");
};

const filterApplications = async (valueToFilter) => {
  buildAppsHTML(await getFilteredAppList(valueToFilter));
};

const removeApp = async (appId) => {
  await deleteAppFromList(appId);
  buildAppsHTML();
};

document.addEventListener("DOMContentLoaded", () => {
  const searchObject = document.getElementById("search");
  searchObject.addEventListener("input", () => {
    if (document.getElementById("search").value) {
      const filteredApps = filterApplications(
        document.getElementById("search").value
      );
      document.getElementById("Apps").innerHTML = "";

      filteredApps.forEach((filteredApp) => {
        document.getElementById("Apps").appendChild(filteredApp);
      });
    } else {
      buildAppsHTML();
    }
  });

  buildAppsHTML();
});
