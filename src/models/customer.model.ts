import { Table, Column, Model, DataType, BeforeCreate, HasOne } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { SaleOrder } from './sale-order.model';

@Table
export class Customer extends Model<Customer> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({type: DataType.STRING, allowNull: false })
  name: string;

  @Column({type: DataType.STRING, allowNull: false })
  address: string;

  @Column({type: DataType.STRING, allowNull: false })
  phoneNumber: string;

  @Column({type: DataType.STRING, allowNull: false })
  emailAddress: string;

  @BeforeCreate
  static generateUUID(instance: Customer) {
    instance.id = uuidv4();
  }

  @HasOne(() => SaleOrder)
  saleOrder: SaleOrder;
}
