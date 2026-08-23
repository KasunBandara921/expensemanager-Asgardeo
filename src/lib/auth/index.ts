import NextAuth from "next-auth"
import { prisma } from "@/lib/db/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "wso2",
      name: "WSO2",
      type: "oidc",
      issuer: `${process.env.WSO2IS_HOST}/oauth2/token`,
      clientId: process.env.WSO2IS_CLIENT_ID,
      clientSecret: process.env.WSO2IS_CLIENT_SECRET,
      authorization: { params: { scope: "openid profile email" } },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name || profile.username || profile.email?.split("@")[0],
          email: profile.email,
        }
      },
    },
  ],
  debug: process.env.NODE_ENV !== "production",
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.idToken = account.id_token
      }
      if (user) {
        if (account?.provider === "wso2") {
          if (!user.email) {
            console.error("JWT Callback: WSO2 provider did not return an email.")
            return token
          }

          // Sync authenticated WSO2 user with local Prisma database
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email },
          })

          if (!dbUser) {
            console.log("JWT Callback: Creating new local user for WSO2 account", { email: user.email })
            dbUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "WSO2 User",
                password: "", // No local password needed
              },
            })
          }

          token.id = dbUser.id
        }
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      if (token.idToken) {
        session.idToken = token.idToken as string
      }
      return session
    },
  },
})
