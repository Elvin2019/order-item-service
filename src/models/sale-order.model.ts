import { Table, Column, Model, DataType, HasMany, BeforeCreate, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { SaleOrderItem } from './sale-order-item.model';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from './customer.model';

@Table
export class SaleOrder extends Model<SaleOrder> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  customerId: string;

  @BelongsTo(() => Customer)
  customer: Customer;

  @HasMany(() => SaleOrderItem)
  saleOrderItems: SaleOrderItem[];

  @BeforeCreate
  static generateUUID(instance: SaleOrderItem) {
    instance.id = uuidv4();
  }
}
