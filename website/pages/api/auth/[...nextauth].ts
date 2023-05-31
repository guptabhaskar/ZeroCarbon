import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { Sequelize } from "sequelize";
import pg from "pg";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectModule: pg,
});

// Calling sync() is not recommended in production
sequelize.sync();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async session({ session, user }: any) {
      session.user = {
        id: user.id,
        ...session.user,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
