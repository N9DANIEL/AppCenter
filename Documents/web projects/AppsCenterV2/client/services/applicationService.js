"use strict";

const getAppList = async () => {
  const response = await fetch("http://localhost:4000/display");
  const data = await response.json();
  return data;
};

const getFilteredAppList = async (text) => {
  const response = await fetch(`http://localhost:4000/display/filter/${text}`);
  const data = await response.json();
  return data;
};

const addAppToList = async (appToAdd) => {
  const response = await fetch(`http://localhost:4000/insert`, {
    method: "POST",
    body: JSON.stringify(appToAdd),
    headers: { "content-type": "application/json" },
  });

  const data = await response.json();
  return data;
};

const deleteAppFromList = async (appId) => {
  const response = await fetch(`http://localhost:4000/delete/${appId}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
};
