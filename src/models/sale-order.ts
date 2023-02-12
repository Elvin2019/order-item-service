import { Table, Column, Model, DataType, HasMany, BeforeCreate } from 'sequelize-typescript';
import { SaleOrderItem } from './sale-order-item';
import { v4 as uuidv4 } from 'uuid';

@Table
export class SaleOrder extends Model<SaleOrder> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column(DataType.STRING)
  customerName: string;

  @HasMany(() => SaleOrderItem)
  saleOrderItems: SaleOrderItem[];

  @BeforeCreate
  static generateUUID(instance: SaleOrderItem) {
    instance.id = uuidv4();
  }
}
