import express from 'express';
import { SaleOrderController } from './sale-order.controller';

export class SaleOrderRouter {
  private controller = new SaleOrderController();

  public getRouter() {
    const router = express.Router();
    router.use('/sale-order', this.controller.getRoutes());
    return router;
  }
}

export default new SaleOrderRouter().getRouter();
