import express, { Request, Response } from 'express';
import Joi from 'joi';
import { SaleOrderService } from './sale-order.service';

export class SaleOrderController {
  private service = new SaleOrderService();

  public getRoutes() {
    const router = express.Router();

    router.get('/', (req, res) => this.getAll(req, res));
    router.get('/:id', (req, res) => this.getById(req, res));
    router.post('/', (req, res) => this.create(req, res));
    router.put('/:id', (req, res) => this.update(req, res));
    router.delete('/:id', (req, res) => this.delete(req, res));

    return router;
  }

  public async getAll(req: Request, res: Response) {
    const saleOrders = await this.service.getAll();
    return res.status(200).json(saleOrders);
  }

  public async getById(req: Request, res: Response) {
    const saleOrder = await this.service.getById(req.params.id);
    if (!saleOrder) {
      return res.status(404).json({ message: 'Sale order  not found' });
    }
    return res.json(saleOrder);
  }

  public async create(req: Request, res: Response) {
    const schema = Joi.object({
      customerName: Joi.string().required(),
    });
    try {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const saleOrder = await this.service.create(value);
      return res.status(201).json(saleOrder);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async update(req: Request, res: Response) {
    const schema = Joi.object({
      customerName: Joi.string().required(),
    }).min(1);

    try {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const saleOrder = await this.service.update(req.params.id, value);
      if (!saleOrder) {
        return res.status(404).json({ message: 'Sale order  not found' });
      }
      return res.status(200).json(saleOrder);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async delete(req: Request, res: Response) {
    const wasDeleted = await this.service.delete(req.params.id);
    if (!wasDeleted) {
      return res.status(404).json({ message: 'Sale order  not found' });
    }
    return res.json({ message: 'Sale order  deleted' });
  }
}
