import Coupon from '@/domain/entity/Coupon'
import Order from '@/domain/entity/Order'
import OrderRepository from '@/domain/repository/OrderRepository'
import Database from '@/infra/database/Database'
import { env } from '@/infra/env/environment'

export default class OrderRepositoryDatabase implements OrderRepository {
  database: Database

  constructor(database: Database) {
    this.database = database
  }

  async save(order: Order): Promise<void> {
    const orderData = await this.database.one(
      `insert into ${env.DATABASE_SCHEMA}.order (coupon_code, code, cpf, issue_date, freight, taxes, serial) values ($1, $2, $3, $4, $5, $6, $7) returning *`,
      [
        order.coupon?.code,
        order.code.value,
        order.cpf.value,
        order.issueDate,
        order.freight,
        order.taxes,
        order.sequence,
      ],
    )
    for (const orderItem of order.items) {
      await this.database.one(
        `insert into ${env.DATABASE_SCHEMA}.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4) returning *`,
        [orderData.id, orderItem.idItem, orderItem.price, orderItem.quantity],
      )
    }
  }

  async get(code: string): Promise<Order> {
    const orderData = await this.database.one(
      `select * from ${env.DATABASE_SCHEMA}.order where code = $1`,
      [code],
    )
    if (!orderData) throw new Error('Order not found')
    const orderItemsData = await this.database.many(
      `select * from ${env.DATABASE_SCHEMA}.order_item where id_order = $1`,
      [orderData.id],
    )
    const order = new Order(
      orderData.cpf,
      new Date(orderData.issue_date),
      orderData.serial,
    )
    for (const orderItemData of orderItemsData) {
      order.addItem(
        orderItemData.id_item,
        orderItemData.price,
        // parseFloat(orderItemData.price),
        orderItemData.quantity,
      )
    }
    if (orderData.coupon_code) {
      const couponData = await this.database.one(
        `select * from ${env.DATABASE_SCHEMA}.coupon where code = $1`,
        [orderData.coupon_code],
      )
      const coupon = new Coupon(
        couponData.code,
        couponData.percentage,
        new Date(couponData.expire_date),
      )
      order.addCoupon(coupon)
    }
    order.freight = parseFloat(orderData.freight)
    return order
  }

  async count(): Promise<number> {
    const countData = await this.database.one(
      `select count(*)::int as count from ${env.DATABASE_SCHEMA}.order`,
      [],
    )
    return countData.count
  }

  async clean(): Promise<void> {
    await this.database.none(
      `delete from ${env.DATABASE_SCHEMA}.order_item`,
      [],
    )
    await this.database.none(`delete from ${env.DATABASE_SCHEMA}.order`, [])
  }
}
