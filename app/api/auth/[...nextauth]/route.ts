import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
// import  CredentialsProvider  from "next-auth/providers/credentials";
// import bcrypt from 'bcrypt'


export const authAOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        // CredentialsProvider({
        //     name: 'Credentials',
        //     credentials : {
        //         email: { label : 'Email',  type: 'email', placeholder: 'Please enter your email'},
        //         password: { label : 'Password',  type: 'password', placeholder: 'Please enter password'}
        //     },
        //     async authorize(credentials, req) {
             
        //         if(!credentials?.email || !credentials.password) return null;

        //         const user = await prisma.user.findUnique({
        //             where: {email: credentials.email}
        //         })

        //         if(!user) return null
                
        //        const passwordVerify = await bcrypt.compare(credentials.password, user.hashedPassword!)
        //        return passwordVerify ? user : null

        //     }

        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy:'jwt'
    }
} 

const handler = NextAuth(authAOptions)


export {handler as GET, handler as POST}