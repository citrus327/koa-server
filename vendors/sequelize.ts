import { Sequelize } from "sequelize-typescript";
import path from "node:path";
import { User } from "@app/model/users";
import { Post } from "@app/model/posts";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(process.cwd(), "./test.db"),
  models: [User, Post],
});

export { sequelize };

// const exe = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//     await sequelize.sync();

//     const jane = await User.create({ firstName: "Jane" });
//     const hao = await User.create({ firstName: "Hao2" });
//     const users = await User.findAll();
//     console.log(users.length);
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// exe();
