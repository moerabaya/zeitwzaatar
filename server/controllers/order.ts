import { type Context } from '..'
import { type OrderInput } from '../graphql/resolvers/types'
import { Cart as CartSchema } from '../models/Cart'
import { default as OrderSchema } from '../models/Order'

class Order {
  constructor () {
    return {
      createOrder: this.createOrder,
      getOrders: this.getOrders
    }
  }

  async createOrder ({ input }: { input: OrderInput }, context: Context) {
    console.log('create order')
    return new Promise(async (resolve, reject) => {
      try {
        const productTotal = await CartSchema.aggregate([
          {
            $unwind: '$products'
          },
          {
            $lookup: {
              from: 'products',
              localField: 'products.id',
              foreignField: '_id',
              as: 'productDetails'
            }
          },
          {
            $unwind: '$productDetails'
          },
          {
            $project: {
              totalPrice: {
                $multiply: ['$products.quantity', '$productDetails.price']
              }
            }
          },
          {
            $group: {
              _id: null,
              totalSum: { $sum: '$totalPrice' }
            }
          }
        ])

        console.log(productTotal)
        const order = new OrderSchema({
          user: context.req.session.userId,
          shippingAddress: input.shippingAddress,
          billingAddress: input.billingAddress,
          products: input.products,
          totalAmount: productTotal[0].totalSum,
        })
        order.id = order._id
        console.log(order)
        order.save((error) => {
          if (error) reject(error);
        });
        resolve(order);
      } catch (error) {
        console.error(error)
      }
    })
  }

  getOrders (_: unknown, context: Context) {
    return OrderSchema.find({
      user: context.req.session.userId
    })
  }
}

export default Order
