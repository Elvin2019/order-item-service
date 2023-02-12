import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import saleOrderRouter from './sale-order/sale-order.router';
import saleOrderItemRouter from './sale-order-items/sale-order-items.router';

const createApp = () => {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(saleOrderRouter);
  app.use(saleOrderItemRouter);
  return app;
};

export { createApp };
