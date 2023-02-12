import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
} from 'sequelize-typescript';
import { SaleOrder } from './sale-order';
import { v4 as uuidv4 } from 'uuid';

@Table
export class SaleOrderItem extends Model<SaleOrderItem> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column(DataType.DOUBLE)
  price: number;

  @Column(DataType.INTEGER)
  quantity: number;

  @ForeignKey(() => SaleOrder)
  @Column(DataType.UUID)
  saleOrderId: string;

  @BelongsTo(() => SaleOrder)
  saleOrder: SaleOrder;

  @BeforeCreate
  static generateUUID(instance: SaleOrderItem) {
    instance.id = uuidv4();
  }
}
