import { 
    Table, 
    Column, 
    Model,
    CreatedAt,
    UpdatedAt, 
    DataType } from 'sequelize-typescript';

@Table
export default class Product extends Model {
    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    description!: string;

    @Column(DataType.DECIMAL)
    price!: number;
    
    @Column(DataType.INTEGER)
    quantity!: number;

    @CreatedAt
    @Column(DataType.DATE)
    created_at!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updated_at!: Date;
}