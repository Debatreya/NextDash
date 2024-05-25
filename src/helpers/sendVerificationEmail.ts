import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    otp: string
): Promise<ApiResponse>{
    try {
        // Email sending using RESEND
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry Msg | Verification code',
            react: VerificationEmail({
                username,
                otp
            }),
        });

        return {
            success: true,
            message: 'Verification email send successfully'
        }
    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return {
            success: false,
            message: 'Failed to send verification email',
        }
    }
}

// I am using free version of RESEND. It only allows to send email to the account connected to the RESEND.
// I will make another mailer function to send email using nodemailer. ```TODO```       