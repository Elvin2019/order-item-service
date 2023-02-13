import express, { Request, Response } from 'express';
import { SaleOrderItemService } from './sale-order-items.service';
import Joi from 'joi';

export class SaleOrderItemController {
  private service = new SaleOrderItemService();

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
    const saleOrderItems = await this.service.getAll();
    return res.json(saleOrderItems);
  }

  public async getById(req: Request, res: Response) {
    const saleOrderItem = await this.service.getById(req.params.id);
    if (!saleOrderItem) {
      return res.status(404).json({ message: 'Sale order item not found' });
    }
    return res.json(saleOrderItem);
  }

  public async create(req: Request, res: Response) {
    const schema = Joi.object({
      name: Joi.string().required(),
      code: Joi.string().required(),
      price: Joi.number().min(0).required(),
      quantity: Joi.number().min(0).required(),
      saleOrderId: Joi.string().required(),
    });

    try {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const saleOrderItem = await this.service.create(value);
      return res.status(201).json(saleOrderItem);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async update(req: Request, res: Response) {
    const schema = Joi.object({
      name: Joi.string(),
      code: Joi.string(),
      price: Joi.number().min(0),
      quantity: Joi.number().min(0),
      saleOrderId: Joi.string(),
    }).min(1);

    try {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const saleOrderItem = await this.service.update(req.params.id, value);
      if (!saleOrderItem) {
        return res.status(404).json({ message: 'Sale order item not found' });
      }
      return res.status(200).json(saleOrderItem);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async delete(req: Request, res: Response) {
    const wasDeleted = await this.service.delete(req.params.id);
    if (!wasDeleted) {
      return res.status(404).json({ message: 'Sale order item not found' });
    }
    return res.json({ message: 'Sale order item deleted' });
  }
}
