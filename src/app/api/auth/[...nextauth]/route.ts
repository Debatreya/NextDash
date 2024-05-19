import NextAuth from "next-auth/next";
import { authOptions } from "./options";

// it must be named handler
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}