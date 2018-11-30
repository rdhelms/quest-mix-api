import { Model, Table, Column, PrimaryKey, AutoIncrement, BelongsTo, DataType, ForeignKey } from 'sequelize-typescript';
import User from './user.model';

export interface IPlayer {
    pos: {
        x: number;
        y: number;
    };
    direction: 'left' | 'right' | 'up' | 'down';
    speed: number;
    size: {
        width: number;
        height: number;
    };
    color: string;
    sceneId: number;
}

export interface ISceneObj {
    pos: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    color: string;
}

export interface IScene {
    id?: number;
    objects: ISceneObj[];
}

@Table({
    tableName: 'worlds'
})
export default class World extends Model<World> {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @Column(DataType.JSON)
    player!: IPlayer;

    @Column(DataType.ARRAY(DataType.JSON))
    scenes!: IScene[];

    @ForeignKey(() => User)
    @Column
    ownerId!: number;

    @BelongsTo(() => User)
    owner!: User;
}