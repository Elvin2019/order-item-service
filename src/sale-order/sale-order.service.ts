import { SaleOrder } from '../models/sale-order.model';

export class SaleOrderService {
  async getAll(): Promise<SaleOrder[]> {
    const saleOrders = await SaleOrder.findAll();
    return saleOrders;
  }

  async getById(id: string): Promise<SaleOrder | null> {
    try {
      const saleOrder = await SaleOrder.findByPk(id);
      if (!saleOrder) {
        return null;
      }
      return saleOrder;
    } catch (error) {
      return null;
    }
  }

  async create(saleOrder: Partial<SaleOrder>): Promise<SaleOrder> {
    try {
      const createdSaleOrder = await SaleOrder.create(saleOrder);
      return createdSaleOrder;
    } catch (error) {
      return null;
    }
  }

  async update(id: string, update: Partial<SaleOrder>): Promise<SaleOrder | null> {
    try {
      const saleOrder = await SaleOrder.findByPk(id);
      if (!saleOrder) {
        return null;
      }
      const updatedSaleOrder = await saleOrder.update(update);
      return updatedSaleOrder;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<SaleOrder> {
    try {
      const saleOrder = await SaleOrder.findByPk(id);
      if (!saleOrder) {
        return null;
      }
      await saleOrder.destroy();
      return saleOrder;
    } catch (error) {
      return null;
    }
  }
}
