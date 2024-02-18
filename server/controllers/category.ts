import { type Context } from '..'
import { type CategoryInput } from '../graphql/resolvers/types'
import CategorySchema from '../models/Categories'

class Category {
  constructor () {
    return {
      createCategory: this.createCategory,
      getCategories: this.getCategories
    }
  }

  async createCategory ({ input }: { input: CategoryInput }, context: Context) {
    return await new Promise((resolve, reject) => {
      const category = new CategorySchema({
        name: input.name
      })
      category.id = category._id

      category.save((error) => {
        if (error) reject(error)
        resolve(category)
      })
    })
  }

  getCategories (_: unknown, context: Context) {
    return CategorySchema.find({})
  }
}

export default Category
