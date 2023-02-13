import Joi from 'joi';
import express, { Request, Response } from 'express';
import { CustomerService } from './customer.service';

export class CustomerController {
    private service = new CustomerService();
   
    public getRoutes() {
    const router = express.Router();

    router.get('/', (req, res) => this.getAll(req, res));
    router.get('/:id', (req, res) => this.getById(req, res));
    router.post('/', (req, res) => this.create(req, res));
    router.put('/:id', (req, res) => this.update(req, res));
    router.delete('/:id', (req, res) => this.delete(req, res));

    return router;
  }
  
  async create(req: Request, res: Response) {
    const customerSchema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      emailAddress: Joi.string().email().required()
    });
    const { error, value } = customerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const customer = await this.service.create(value);
    res.status(201).json({ customer });
  }

  async getAll(req: Request, res: Response) {
    const customers = await this.service.getAll();
    return res.json({ customers });
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const customer = await this.service.getById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ customer });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const customerSchema = Joi.object({
      name: Joi.string(),
      address: Joi.string(),
      phoneNumber: Joi.string(),
      emailAddress: Joi.string().email()
    });
    const { error, value } = customerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const customer = await this.service.update(id, value);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ customer });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const customer = await this.service.delete(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.json({ message: 'Customer deleted successfully' });
  }
}
