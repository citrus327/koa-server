import sqlite3 from "sqlite3";
// https://github.com/TryGhost/node-sqlite3/wiki/API
const db = new sqlite3.Database("./test.db");

interface PostDO {
  id: Number;
  title: string;
  description: string;
  createDate: string;
  author: string;
}

const createPostTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS posts (
    id integer PRIMARY KEY,
    title text,
    description text,
    createDate text,
    author text
  )`;

  return db.run(query);
};

createPostTable();

const insert = () => {
  const query = `INSERT INTO posts (id, title, description, createDate, author) values (
    $id,
    $title,
    $description,
    $createDate,
    $author
  )`;

  db.run(query, {
    $id: parseInt((Math.random() * 100).toFixed(0)),
    $title: "A Sqlite Random Title",
    $description: "Sit sint sint pariatur consectetur.",
    $createDate: "2020-02-22",
    $author: "Hao Peng",
  });
};

insert();

const query = () => {
  db.all<PostDO>(`SELECT * from posts`, (err, rows) => {
    if (err) {
      throw err;
    }

    rows.forEach((row) => {
      console.log(`${row.id}, ${row.title}, ${row.description}`);
    });
  });
};

query();

db.close();
