// $ aws amplify user registration function to the application
import { signUp, SignUpOutput } from "aws-amplify/auth";

// $ Basic Form Handling without AWS Cognito

export async function awsCognitoSignUp(
  name: string,
  email: string,
  password: string
): Promise<SignUpOutput> {
  try {
    // $ Validate and format email
    const trimmedEmail = email.trim().toLowerCase();
    const signUpResult = await signUp({
      username: trimmedEmail,
      password: password,
      options: {
        userAttributes: {
          name: name,
        },
        autoSignIn: true, // Enable auto sign-in after successful sign-up
      },
    });

    if (signUpResult.isSignUpComplete) {
      console.log("Signup Successfull");
    }

    return signUpResult;
  } catch (error) {
    throw error;
  }
}
