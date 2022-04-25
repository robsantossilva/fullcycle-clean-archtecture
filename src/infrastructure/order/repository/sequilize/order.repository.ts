import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface{

  async update(entity: Order): Promise<void> {

    await this.removeOrderItems(entity.id);

    entity.items.map(async (item) => {
      await OrderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id
      });
    }),

    await OrderModel.update({
      customer_id: entity.customerId,
      total: entity.total()
    },{
      where: {
        id: entity.id
      },
    });
  }

  async find(orderId: string): Promise<Order> {
      const orderModel = await OrderModel.findOne(
      {
        where: { id: orderId }
      });

      const orderItems: OrderItem[] = await this.findAllOrderItems(orderId);

      return new Order(
          orderModel?.id as string,
          orderModel?.customer_id as string,
          orderItems
      )
  }

  async findAllOrderItems(orderId: string): Promise<OrderItem[]> {
    const orderItemModels = await OrderItemModel.findAll({
      where:{
        order_id: orderId
      }
    })
    return orderItemModels.map((orderItemModel) =>
      new OrderItem(
        orderItemModel.id,
        orderItemModel.name,
        orderItemModel.price,
        orderItemModel.product_id,
        orderItemModel.quantity
      )
    );
  }

  async removeOrderItems(orderId: string) {

    const order = await OrderModel.findOne({
      where: { id:orderId },
      include: [
        {
          model: OrderItemModel
        }
      ]
    });

    await OrderItemModel.destroy({
      where: {
        id: order?.items?.map( item => item.id )
      }
    })
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll(
      {
        include: [{ model: OrderItemModel }],
      }
    );

    const orders: Order[] = orderModels.map((orderModel) => {
        return new Order(
          orderModel.id,
          orderModel.customer_id,
          orderModel.items.map(i =>
            new OrderItem(
              i.id,
              i.name,
              i.price,
              i.product_id,
              i.quantity
            )
          )
        )
      }
    );

    return orders;
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}