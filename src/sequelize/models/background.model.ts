import { Model, AutoIncrement, PrimaryKey, Column, DataType, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.model';

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
    tableName: 'backgrounds',
})
export default class Background extends Model<Background> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @Column(DataType.ARRAY(DataType.JSON))
    frames!: TFrame[];

    @ForeignKey(() => User)
    @Column
    ownerId!: number;

    @BelongsTo(() => User)
    owner!: User;
}