import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String
  }
})

const Category = mongoose.model('category', schema)

export default Category
