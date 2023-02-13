import { Sequelize } from 'sequelize-typescript';
import { SaleOrder } from './models/sale-order.model';
import { SaleOrderItem } from './models/sale-order-item.model';
import dotenv from 'dotenv';
import { Customer } from './models/customer.model';
dotenv.config();
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.PROD_DB_PORT),
  username: process.env.PROD_DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
});

const models = [SaleOrder, SaleOrderItem, Customer]
sequelize.addModels(models);

export const MockSequelize = () => {
  const mockSequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.STAGE_DB_PORT),
    username: process.env.STAGE_DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
  });
  mockSequelize.addModels(models);
  return mockSequelize;
};

export default sequelize;
