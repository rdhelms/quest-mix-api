import { Model, Table, Column, DataType, Unique, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import World from './world.model';

@Table({
    tableName: 'users',
})
export default class User extends Model<User> {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Unique
    @Column
    username!: string;

    @Column
    password!: string;

    @Column
    provider!: string;

    @Column
    displayname!: string;

    @Column
    familyname!: string;

    @Column
    givenname!: string;

    @Column
    middlename!: string;

    @Column(DataType.ARRAY(DataType.STRING))
    emails!: string[];

    @Column(DataType.ARRAY(DataType.STRING))
    photos!: string[];

    @HasMany(() => World)
    worlds!: World[];
}