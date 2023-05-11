import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  id: number;

  @Column
  name: string;

  @Column
  birthday: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  upadtedAt: Date;
}
