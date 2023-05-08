import sqlite3, { Database } from "sqlite3";
// import { Sequelize } from "sequelize";
// import path from "node:path";

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: path.resolve(process.cwd(), "./test.db"),
// });

// try {
//   await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

let instance: Database = null;

const createPostTable = () => {
  const query = `
        CREATE TABLE IF NOT EXISTS posts (
        id integer PRIMARY KEY,
        title text,
        description text,
        createDate text,
        author text )`;

  return instance.run(query);
};

const db = () => {
  if (!instance) {
    instance = new sqlite3.Database("../../test.db");
    createPostTable();
  }
  return instance;
};

export { db, createPostTable };
