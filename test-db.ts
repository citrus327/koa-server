import { Sequelize, DataTypes } from "sequelize";
import path from "node:path";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(process.cwd(), "./test.db"),
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

const exe = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();

    const jane = await User.create({ firstName: "Jane" });
    const hao = await User.create({ firstName: "Hao2" });
    const users = await User.findAll();
    console.log(users.length);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

exe();
