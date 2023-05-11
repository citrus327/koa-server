import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";
import { User } from "./users";

@Table
export class Post extends Model {
  @AutoIncrement
  @PrimaryKey
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  authorId: User["id"];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  upadtedAt: Date;
}
