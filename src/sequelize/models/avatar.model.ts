import { Model, AutoIncrement, PrimaryKey, Column, DataType, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import User from './user.model';
import Player from './player.model';

export interface IPixel {
    pos: {
        x: number;
        y: number;
    };
    size: number;
    color: string;
}

export type TFrame = IPixel[][];

@Table({
    tableName: 'avatars',
})
export default class Avatar extends Model<Avatar> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @Column(DataType.ARRAY(DataType.JSON))
    frames!: TFrame[];

    @HasMany(() => Player)
    players!: Player[];

    @ForeignKey(() => User)
    @Column
    ownerId!: number;

    @BelongsTo(() => User)
    owner!: User;
}