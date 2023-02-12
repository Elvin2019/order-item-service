import express from 'express';
import { SaleOrderItemController } from './sale-order-items.controller';

export class SaleOrderItemRouter {
  private controller = new SaleOrderItemController();

  public getRouter() {
    const router = express.Router();
    router.use('/sale-order-items', this.controller.getRoutes());
    return router;
  }
}

export default new SaleOrderItemRouter().getRouter();
