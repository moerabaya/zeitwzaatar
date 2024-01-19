import { hash } from "bcrypt";
import { Users } from "../../models/User";
import { User } from "./types";

export const UserResolvers = {
  register: async ({ input }: { input: User }) => {
    return new Promise(async (resolve, reject) => {
      const hashedPassword = await hash(input.password, 10);
      const newUser = new Users({
        firstname: input.firstname,
        lastname: input.lastname,
        username: generateUsername(input.firstname, input.lastname),
        email: input.email,
        passowrd: hashedPassword,
        avatar: input.avatar,
      });

      newUser.id = newUser._id;
      newUser.save((err) => {
        if (err) return reject(err);
        else resolve(newUser);
      });
    });
  },
  users: () => Users.find({}),
};

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
