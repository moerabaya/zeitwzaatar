import { compare, genSalt, hash } from "bcrypt";
import { Context } from "..";
import { LoginInput, User as UserInput } from "../graphql/resolvers/types";
import { Users } from "../models/User";
import { ServerError } from "./server-error";

export class User {
  constructor() {}

  async register({ input }: { input: UserInput }) {
    return new Promise(async (resolve, reject) => {
      const salt = await genSalt(10);
      const hashedPassword = await hash(input.password, salt);
      console.log(input.password);
      const newUser = new Users({
        firstname: input.firstname,
        lastname: input.lastname,
        username: generateUsername(input.firstname, input.lastname),
        email: input.email,
        password: hashedPassword,
        avatar: input.avatar,
      });

      newUser.id = newUser._id;
      newUser.save((err) => {
        if (err) return reject(err);
        else resolve(newUser);
      });
    });
  }

  async login({ input }: { input: LoginInput }, context: Context) {
    const { email, password } = input;
    return new Promise((resolve, reject) => {
      const { req } = context;
      Users.findOne({ email }, async (error: Error, user: UserInput) => {
        if (error) return reject(error);
        if (!user) return reject(new ServerError("ACCOUNT_NOT_FOUND"));
        console.log("user", user);
        const passwordMatch = await compare(password, user.password);
        if (passwordMatch) {
          // Set user data in session
          req.session.userId = user.id;
          req.session.username = user.username;
          return resolve(user);
        } else {
          return reject(new ServerError("INVALID_PASSWORD"));
        }
      });
    });
  }
  async logout(_: any, { req }: Context) {
    req.session.destroy();
    return Promise.resolve(true);
  }

  async getUser(_: any, { req }: Context) {
    const userId = req.session.userId;

    return await Users.findById(userId);
  }

  async users() {
    return Users.find({});
  }

  getResolvers() {
    return {
      login: this.login,
      logout: this.logout,
      register: this.register,
      allUsers: this.users,
      user: this.getUser,
    };
  }
}

function generateUsername(firstName: string, lastName: string) {
  // Extract the first three characters of each name
  const firstChars = firstName.slice(0, 3).toLowerCase();
  const lastChars = lastName.slice(0, 3).toLowerCase();

  // Generate a random string or use a unique identifier
  const randomString = Math.random().toString(36).substr(2, 5).toLowerCase();

  // Combine the extracted characters and the random string
  const username = `${firstChars}${lastChars}${randomString}`;

  return username;
}
