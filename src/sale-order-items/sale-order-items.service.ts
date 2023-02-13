import { SaleOrderItem } from '../models/sale-order-item.model';

export class SaleOrderItemService {
  async getAll(): Promise<SaleOrderItem[]> {
    const saleOrderItems = await SaleOrderItem.findAll();
    return saleOrderItems;
  }

  async getById(id: string): Promise<SaleOrderItem | null> {
    try {
      const saleOrderItem = await SaleOrderItem.findByPk(id);
      if (!saleOrderItem) {
        return null;
      }
      return saleOrderItem;
    } catch (error) {
      return null;
    }
  }

  async create(saleOrderItem: Partial<SaleOrderItem>): Promise<SaleOrderItem> {
    const createdSaleOrderItem = await SaleOrderItem.create(saleOrderItem);
    return createdSaleOrderItem;
  }

  async update(id: string, update: Partial<SaleOrderItem>): Promise<SaleOrderItem | null> {
    try {
      const saleOrderItem = await SaleOrderItem.findByPk(id);
      if (!saleOrderItem) {
        return null;
      }
      const updatedSaleOrderItem = await saleOrderItem.update(update);
      return updatedSaleOrderItem;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<SaleOrderItem | null> {
    try {
      const saleOrderItem = await SaleOrderItem.findByPk(id);
      if (!saleOrderItem) {
        return null;
      }
      await saleOrderItem.destroy();
      return saleOrderItem;
    } catch (error) {
      return null;
    }
  }
}
