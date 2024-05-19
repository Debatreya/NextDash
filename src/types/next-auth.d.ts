// This folder is used to redeclare types for NextAuth.js
// You can add any type redeclaration here
// Currently I am not satisfied with the types in user provided by NextAuth.js
// So I redeclare it here

import "next-auth";
import { DefaultSession } from "next-auth";
declare module "next-auth" {
	interface User {
		_id?: string;
		isVerified?: boolean;
		isAcceptingMessages?: boolean;
		username?: string;
	}
	interface Session {
		user: {
			_id?: string;
			isVerified?: boolean;
			isAcceptingMessages?: boolean;
			username?: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
}
