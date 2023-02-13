import express from 'express';
import { CustomerController } from './customer.controller';

export class CustomerRouter {
  private controller = new CustomerController();

  public getRouter() {
    const router = express.Router();
    router.use('/customers', this.controller.getRoutes());
    return router;
  }
}

export default new CustomerRouter().getRouter();
