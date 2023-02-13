// customer.service.ts

import { Customer } from "../models/customer.model";

export class CustomerService {
  async create(customer: Customer) {
    return await Customer.create(customer);
  }

  async getAll() {
    return await Customer.findAll();
  }

  async getById(id: string) {
    return await Customer.findByPk(id);
  }

  async update(id: string, customer: Partial<Customer>) {
    return await Customer.update(customer, { where: { id } });
  }

  async delete(id: string) {
    try {
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return null;
      }
      await customer.destroy();
      return customer;
    } catch (error) {
      return null;
    }
  }
}
