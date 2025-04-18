// $ This function handles the registration to Cognito with Amplify

import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
// import { useRouter } from "next/navigation";

interface ConfirmSignUpResponse {
  success: boolean;
  message: string;
}

export async function ConfirmSignUp(
  email: string,
  // password: string,
  code: string
): Promise<ConfirmSignUpResponse> {
  try {
    const { isSignUpComplete } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });

    if (isSignUpComplete) {
      console.log(`SignUp Complete`);
    }

    return {
      success: false,
      message: "Unable to confirm signup",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    // Check for specific error types
    if (errorMessage.includes("ExpiredCodeException")) {
      return {
        success: false,
        message: "Confirmation code has expired. Please request a new code.",
      };
    }
    console.error("Error confirming signup:", error);
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function resendConfirmationCode(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    await resendSignUpCode({ username: email });
    return {
      success: true,
      message: "A new confirmation code has been sent to your email",
    };
  } catch (error) {
    console.error("Error resending code:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to resend code",
    };
  }
}
