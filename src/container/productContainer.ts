import 'reflect-metadata';
import { Container } from 'inversify';
import { ProductService } from '../services/productService';
import { IProductService } from '../services/productService';

const producContainer = new Container();

producContainer.bind<IProductService>('ProductService').to(ProductService);

export { producContainer };
