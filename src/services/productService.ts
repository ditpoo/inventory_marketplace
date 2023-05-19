import "reflect-metadata";
import Product from "../models/product";
import { injectable } from 'inversify';

export interface IProduct {
    name: string
    description: string
    price: number
    quantity: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface IProductService {
    get(id: number): Promise<IProduct | null>;
    getAll(): Promise<IProduct[]>
    add(data: IProduct): Promise<void>;
    update(id: number, data: IProduct): Promise<void>;
    delete(id: number): Promise<void>;
}

@injectable()
export class ProductService implements IProductService {
    async get(id: number) {
        const product = await Product.findByPk(id);

        return product
    }

    async getAll() {
        const products = await Product.findAll();

        return products
    }

    async add(data: IProduct) {
        const product = new Product({...data})
        await product.save()
    }

    async update(id: number, data: IProduct) {
        await Product.update(data, { where: { id: id }})
    }

    async delete(id: number) {
        await Product.destroy({ where: { id: id }});
    }
}