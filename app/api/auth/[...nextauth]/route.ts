
import authAOptions from "@/app/auth/AuthOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authAOptions)


export {handler as GET, handler as POST}