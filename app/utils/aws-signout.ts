// $ aws amplify sign in function to the application
import { signOut } from "aws-amplify/auth";

export async function awsCognitoSignOut() {
  try {
    // $ Sign Out Current User
    await signOut();
  } catch (error) {
    console.error("Sign Out Error:", error);
    throw error;
  }
}
