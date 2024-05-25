import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import {usernameValidation} from "@/schemas/signUpSchema";


// Creating a query schema
const UsernameQuerySchema = z.object({
    username: usernameValidation
});

// Defining the route
export async function GET(request: Request){
    await dbConnect();

    try {
        const {searchParams} = new URL(request.url);
        // console.log(searchParams); // TODO: Remove this line
        const queryParam = {
            username: searchParams.get("username")
        };
        // Validate with ZOD
        const result = UsernameQuerySchema.safeParse(queryParam);

        // console.log(result); // TODO: Remove this line
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid username"
                },
                { status: 400 }
            )
        }
        const {username} = result.data;
        const existingVerifiedUsername = await UserModel.findOne({username, isVerified: true});
        if (existingVerifiedUsername) {
			return Response.json(
				{
					success: false,
					message: "Username is already taken",
				},
				{ status: 400 }
			);
		}
        return Response.json(
            {
                success: true,
                message: "Username is available"
            },
            { status: 200 }
        )

    } catch (error) {
        console.error("Error checking username",error);
        return Response.json(
            {
                success: false,
                message: "An error occurred while checking the username"
            },
            { status: 500 }
    )
    }
}