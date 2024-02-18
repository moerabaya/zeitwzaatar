import mongoose from 'mongoose'

// Mongo connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/zwz')
