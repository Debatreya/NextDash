import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { log } from "console";

export async function POST(request: Request) {
	await dbConnect();
	try {
		const { username, code } = await request.json();

		const decodedUsername = decodeURIComponent(username);
		const user = await UserModel.findOne({ username: decodedUsername });
		if (!user) {
			return Response.json(
				{
					success: false,
					message: "User not found",
				},
				{ status: 404 }
			);
		}

		const isCodevalid = user.verifyCode === code;
		const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

		// If the code is valid, update the user's isVerified field to true
		if (isCodevalid && isCodeExpired) {
			user.isVerified = true;
			await user.save();

			return Response.json(
				{
					success: true,
					message: "Code is valid",
				},
				{ status: 200 }
			);
		}else if(!isCodeExpired){
            return Response.json(
                {
                    success: false,
                    message: "Verification code has expired, please sign up again to get a new code",
                },
                { status: 400 }
            );
        }else{
            return Response.json(
                {
                    success: false,
                    message: "Incorrect verification code",
                },
                { status: 400 }
            );
        
        }

	} catch (error) {
		console.error("Error verifying code", error);
		return Response.json(
			{
				success: false,
				message: "An error occurred while verifying the code",
			},
			{ status: 500 }
		);
	}
}
