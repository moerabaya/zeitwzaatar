import { compare, genSalt, hash } from 'bcrypt'
import { type Context } from '..'
import {
  type ForgotPassword,
  type LoginInput,
  type User as UserInput
} from '../graphql/resolvers/types'
import { Users } from '../models/User'
import { ServerError } from './server-error'

export class User {
  constructor () {}

  async register ({ input }: { input: UserInput }) {
    return await new Promise(async (resolve, reject) => {
      const salt = await genSalt(10)
      const hashedPassword = await hash(input.password, salt)

      const newUser = new Users({
        firstname: input.firstname,
        lastname: input.lastname,
        username: generateUsername(input.firstname, input.lastname),
        email: input.email,
        password: hashedPassword,
        avatar: input.avatar
      })

      newUser.id = newUser._id
      newUser.save((err) => {
        if (err) { reject(err) } else resolve(newUser)
      })
    })
  }

  async forgotPassword ({ input }: { input: ForgotPassword }) {
    const { email, password, newPassword } = input
    return await new Promise(async (resolve, reject) => {
      const salt = await genSalt(10)
      const hashPassword = await hash(newPassword, salt)

      Users.findOne({ email }, async (error: Error, user: UserInput) => {
        if (error) reject(error)
        const passwordMatch = await compare(password, user.password)
        if (passwordMatch) {
          Users.findOneAndUpdate(
            { email },
            { password: hashPassword },
            async (error: Error, user: UserInput) => {
              if (error) reject(error)
              resolve(user)
            }
          )
        } else reject(new ServerError('PASSWORD_DONT_MATCH'))
      })
    })
  }

  async login ({ input }: { input: LoginInput }, context: Context) {
    const { email, password } = input
    return await new Promise((resolve, reject) => {
      const { req } = context
      Users.findOne({ email }, async (error: Error, user: UserInput) => {
        if (error) { reject(error); return }
        if (!user) { reject(new ServerError('ACCOUNT_NOT_FOUND')); return }

        const passwordMatch = await compare(password, user.password)
        if (passwordMatch) {
          // Set user data in session
          req.session.userId = user.id
          req.session.username = user.username
          resolve(user)
        } else {
          reject(new ServerError('INVALID_PASSWORD'))
        }
      })
    })
  }

  async logout (_: unknown, { req }: Context) {
    req.session.destroy()
    return await Promise.resolve(true)
  }

  async getUser (_: unknown, { req }: Context) {
    const userId = req.session.userId
    return await Users.findById(userId)
  }

  async users () {
    return await Users.find({})
  }

  getResolvers () {
    return {
      login: this.login,
      logout: this.logout,
      register: this.register,
      allUsers: this.users,
      user: this.getUser,
      forgotPassword: this.forgotPassword
    }
  }
}
function generateUsername (firstName: string, lastName: string) {
  // Extract the first three characters of each name
  const firstChars = firstName.slice(0, 3).toLowerCase()
  const lastChars = lastName.slice(0, 3).toLowerCase()

  // Generate a random string or use a unique identifier
  const randomString = Math.random().toString(36).substr(2, 5).toLowerCase()

  // Combine the extracted characters and the random string
  const username = `${firstChars}${lastChars}${randomString}`

  return username
}
