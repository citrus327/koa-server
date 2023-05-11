import { Sequelize } from "sequelize-typescript";
import path from "node:path";
import { User } from "@app/model/users";
import chalk from "chalk";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(process.cwd(), "./test.db"),
  models: [User],
  logging: (...args) => {
    console.log(chalk.blue(`[DB] ${args}`));
  },
});

export const initializeDataBase = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log(
        chalk.blue(
          `[DB] Connection to the database has been established successfully.`
        )
      );
    })
    .catch((err) => {
      console.error(chalk.red("[DB] Unable to connect to the database:", err));
    })
    .then(() => sequelize.sync())
    .then(() => {
      console.log(
        chalk.blue(`[DB] The database has been synced successfully.`)
      );
    })
    .catch((err) => {
      console.error(chalk.red("[DB] Unable to sync to the database:", err));
    });
};

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
