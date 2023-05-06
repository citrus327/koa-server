import { db } from "@app/services/db";

export interface PostDO {
  id: Number;
  title: string;
  description: string;
  createDate: string;
  author: string;
}

const selectByPrimaryKey = ($id: PostDO["id"]) => {
  return new Promise((resolve, reject) => {
    db().run(`select * from posts where id = $id`, { $id }, function (err) {
      if (err) {
        reject(err);
      }
      resolve(this);
    });
  });
};

const insert = (payload: PostDO) => {
  const query = `INSERT INTO posts (id, title, description, createDate, author) values (
    $id,
    $title,
    $description,
    $createDate,
    $author,
  )`;

  return db().run(query, {
    $id: payload.id,
    $title: payload.title,
    $description: payload.description,
    $createDate: payload.createDate,
    $author: payload.author,
  });
};

export { selectByPrimaryKey, insert };
