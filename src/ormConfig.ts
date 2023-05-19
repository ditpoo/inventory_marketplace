import { Sequelize } from 'sequelize-typescript';
import Product from './models/product';

export const sequelize = new Sequelize({
  database: 'marketplace_inventory',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
  storage: ':memory:',
  // models: [__dirname + '/models'],
  models: [Product]
});