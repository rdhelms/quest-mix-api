import { Table, Model, AutoIncrement, PrimaryKey, Column, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import Avatar from './avatar.model';
import World from './world.model';

export interface IPlayerPos {
    x: number;
    y: number;
}

export type TPlayerAction = 'walkUp' | 'walkRight' | 'walkDown' | 'walkLeft';

export interface IPlayerSize {
    width: number;
    height: number;
}

@Table({
    tableName: 'players',
})
export default class Player extends Model<Player> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column(DataType.JSON)
    pos!: IPlayerPos;

    @Column
    action!: TPlayerAction;

    @Column(DataType.JSON)
    size!: IPlayerSize;

    @ForeignKey(() => Avatar)
    @Column
    avatarId!: number;

    @BelongsTo(() => Avatar)
    avatar!: Avatar;

    @HasOne(() => World)
    world!: World;
}