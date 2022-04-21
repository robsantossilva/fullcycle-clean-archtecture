import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
import { Optional } from "sequelize/types";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";

// type OrderModelAttributes = {
//   id: number;
//   customer_id: string;
//   items: OrderItemModel[];
//   total: number;
// };

// // we're telling the Model that 'id' is optional
// // when creating an instance of the model (such as using Model.create()).
// type OrderModelCreationAttributes = Optional<OrderModelAttributes, 'id'>;

@Table({
  tableName: "orders",
  timestamps: false,
})

//export default class OrderModel extends Model<OrderModelAttributes, OrderModelCreationAttributes> {

export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}