"use strict";

import express from "express";
import cors from "cors";
import { methods } from "./queries.js";
import { nanoid } from "nanoid";

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/display", async (req, res) => {
  res.send(await methods.displayAll());
});

app.get("/display/:id", async (req, res) => {
  // .length in case of empty array, since the function returns array and empty array isn't falsy in JS
  const sameIdApps = await methods.findApp(req.params.id);
  sameIdApps.length
    ? res.send(sameIdApps)
    : res.status(404).send("The app with the given ID was not found");
});

app.get("/display/filter/:text", async (req, res) => {
  res.send(await methods.filterSearch(req.params.text));
});

app.delete("/delete/:id", async (req, res) => {
  const sameIdApps = await methods.findApp(req.params.id);
  sameIdApps.length
    ? res.send(methods.deleteApp(req.params.id))
    : res.status(404).send("The app with the given ID was not found");
});

app.put("/update/:id", async (req, res) => {
  const sameIdApps = await methods.findApp(req.params.id);

  if (!sameIdApps.length) {
    return res.status(404).send("The app with the given ID was not found");
  }

  const newApp = {
    id: req.params.id,
    imageUrl: req.body.imageUrl || sameIdApps[0].imageurl,
    name: req.body.name || sameIdApps[0].name,
    price: req.body.price || sameIdApps[0].price,
    desc: req.body.desc || sameIdApps[0].desc,
    companyName: req.body.companyName || sameIdApps[0].companyname,
  };

  res.send(methods.updateApp(newApp));
});

app.post("/insert", async (req, res) => {
  const appToAdd = {
    id: nanoid(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
    companyName: req.body.companyName,
    createdAt: new Date().toUTCString(),
  };

  const sameIdApps = await methods.findApp(appToAdd.id);
  !sameIdApps.length
    ? res.send(methods.insertApp(appToAdd))
    : res.send("cannot add app: There's an app with the same id");
});

app.listen(PORT);
