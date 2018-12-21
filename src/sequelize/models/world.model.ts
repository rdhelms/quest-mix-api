import { Model, Table, Column, PrimaryKey, AutoIncrement, BelongsTo, DataType, ForeignKey } from 'sequelize-typescript';
import User from './user.model';
import Player from './player.model';

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

export interface ISettings {
    speed: number;
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
    settings!: ISettings;

    @Column(DataType.ARRAY(DataType.JSON))
    scenes!: IScene[];

    @Column
    currentSceneId!: number;

    @ForeignKey(() => Player)
    @Column
    playerId!: number;

    @BelongsTo(() => Player)
    player!: Player;

    @ForeignKey(() => User)
    @Column
    ownerId!: number;

    @BelongsTo(() => User)
    owner!: User;
}