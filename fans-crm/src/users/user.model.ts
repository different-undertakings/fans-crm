import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  readonly id: number;

  @Column
  readonly name: string;

  @Column
  readonly password: string;

  @Column
  readonly phone: string;
}
