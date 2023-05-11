import sqlite3, { Database } from "sqlite3";

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
