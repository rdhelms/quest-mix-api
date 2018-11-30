import { Model, AutoIncrement, PrimaryKey, Column, DataType, Table } from 'sequelize-typescript';

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
    tableName: 'entities'
})
export default class Entity extends Model<Entity> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @Column(DataType.ARRAY(DataType.JSON))
    frames!: TFrame[];
}