import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      try {
        // check the username and email
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          return false;
        } else {
          // hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // return the result
          await client.user.create({
            data: {
              username,
              email,
              name,
              location,
              password: hashedPassword,
              avatarURL,
              githubUsername,
            },
          });

          return true;
        }
      } catch (error) {
        return error;
      }
    },
  },
};
