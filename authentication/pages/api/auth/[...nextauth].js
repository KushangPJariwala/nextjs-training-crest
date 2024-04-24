import NextAuth from "next-auth";
// import Providers from 'next-auth/providers'
import CredentialsProvider from "next-auth/providers/credentials";

import { dbConnect } from "../../../db/db";
import { verifyPassword } from "../../../db/auth";

export default NextAuth({
  session: { jwt: true },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await dbConnect();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
            throw new Error("user mot exists");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("invalid credentials");
        }
        return { email: user.email };
      },
    }),
  ],
});
