import { Sequelize } from 'sequelize-typescript';
import { SaleOrder } from './models/sale-order';
import { SaleOrderItem } from './models/sale-order-item';
import dotenv from 'dotenv';
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

sequelize.addModels([SaleOrder, SaleOrderItem]);

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
  mockSequelize.addModels([SaleOrder, SaleOrderItem]);
  return mockSequelize;
};

export default sequelize;
