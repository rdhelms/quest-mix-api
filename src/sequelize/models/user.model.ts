import { Model, Table, Column, DataType, Unique, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import World from './world.model';
import Avatar from './avatar.model';
import Background from './background.model';
import Foreground from './foreground.model';
import SceneObject from './object.model';
import Entity from './entity.model';

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

    @HasMany(() => Avatar)
    avatars!: Avatar[];

    @HasMany(() => Background)
    backgrounds!: Background[];

    @HasMany(() => Foreground)
    foregrounds!: Foreground[];

    @HasMany(() => Entity)
    entities!: Entity[];

    @HasMany(() => SceneObject)
    sceneObjects!: SceneObject[];
}