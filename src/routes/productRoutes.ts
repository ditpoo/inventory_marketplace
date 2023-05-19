import express from 'express';
import { interfaces } from 'inversify';
import ProductController from '../controllers/productController';
import asyncHandler from '../utils/asyncHandler';

export function createProuductRouter(container: interfaces.Container): express.Router {
    const products = express.Router();
    const controller = container.resolve(ProductController);

    products.get('/:id', asyncHandler(controller.getProduct.bind(controller)));
    products.get('/', asyncHandler(controller.getAllProduct.bind(controller)));
    products.post('/', asyncHandler(controller.addProduct.bind(controller)));
    products.put('/:id', asyncHandler(controller.updateProduct.bind(controller)));
    products.delete('/:id', asyncHandler(controller.deleteProduct.bind(controller)));
  
    return products;
}