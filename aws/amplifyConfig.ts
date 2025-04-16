// $ This is the configuration file for Amplify by setting all the environment variables.

import { Amplify } from "aws-amplify";

export default function configureAmplify() {
  if (
    !process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID ||
    !process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
  ) {
    throw new Error(
      "Missing required environment variables for Cognito configuration"
    );
  }

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        signUpVerificationMethod: "code",
        loginWith: {
          email: true,
        },
        userAttributes: {
          email: {
            required: true,
          },
        },
      },
    },
  });
}
