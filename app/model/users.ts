import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  AutoIncrement,
  DataType,
  UpdatedAt,
} from "sequelize-typescript";

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.DATE })
  birthday: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  upadtedAt: Date;
}
