import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	await dbConnect();

	try {
		const { username, email, password } = await request.json(); //await is imp here in NextJS

		// Find only those useres by Username who are verified
		const existingUserVerifiedByUsername = await UserModel.findOne({
			username,
			isVerified: true,
		});

		if (existingUserVerifiedByUsername) {
			return Response.json(
				{
					success: false,
					message: "Username already taken",
				},
				{ status: 400 }
			);
		}

		// Finding User By Email
		const existingUserByEmail = await UserModel.findOne({ email });
		// Generating VerifyCode (OTP)
		const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

		if (existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already existes with this email"
                }, {status: 400})
            }
            else{
                // User Exists but NOT VERIFIED
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
		} else {
			// User is here for the first time
			const hashedPassword = await bcrypt.hash(password, 10);
			const expiryDate = new Date();
			expiryDate.setHours(expiryDate.getHours() + 1);

			const newUser = new UserModel({
				username,
				email,
				password: hashedPassword,
				verifyCode,
				verifyCodeExpiry: expiryDate,
				isVerified: false,
				isAcceptingMessage: true,
                messages: []
			});

            await newUser.save()

            // Send Verification Email
            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            )
            if(!emailResponse.success){
                return Response.json({
                    success: false,
                    message: emailResponse.message
                }, {status: 500})
            }

            return Response.json({
                success: true,
                message: "User registered successfully, Please verify your email"
            }, {status: 201})
		}
	} catch (error) {
		console.error("Error registering user", error);
		return Response.json(
			{
				success: false,
				message: "Error registering user",
			},
			{
				status: 500,
			}
		);
	}
}
