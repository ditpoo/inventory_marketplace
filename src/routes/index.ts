import express from 'express';
import { createProuductRouter } from './productRoutes';
import { producContainer } from '../container/productContainer';

const router = express.Router();

router.use('/products', createProuductRouter(producContainer));

export default router;