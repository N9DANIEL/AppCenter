"use strict";

import { pool } from "./database.js";

const methods = {
  displayAll: async () => {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * 
        FROM appscenter.applications 
        ORDER BY id ASC`
    );
    return result.rows;
  },

  findApp: async (appId) => {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * 
        FROM appscenter.applications 
        WHERE (id = '${appId}')`
    );
    return result.rows;
  },

  filterSearch: async (searchText) => {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * 
        FROM appscenter.applications 
        WHERE LOWER(name) LIKE '%${searchText.toLowerCase()}%'`
    );
    return result.rows;
  },

  deleteApp: async (appId) => {
    const client = await pool.connect();
    const result = await client.query(
      `DELETE 
        FROM appscenter.applications 
        WHERE (id = '${appId}')`
    );
  },

  insertApp: async (app) => {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO appscenter.applications 
      VALUES ('${app.id}', '${app.imageUrl}', '${app.name}', '${app.price}', '${app.desc}', '${app.companyName}', '${app.createdAt}')`
    );
  },

  updateApp: async (newApp) => {
    const client = await pool.connect();
    const result = await client.query(
      `UPDATE appscenter.applications 
      SET name = '${newApp.name}', price = '${newApp.price}', "desc" = '${newApp.desc}', 
      companyname = '${newApp.companyName}', imageurl = '${newApp.imageUrl}'
      WHERE (id = '${newApp.id}')`
    );
  },
};

export { methods };
