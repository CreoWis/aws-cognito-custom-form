import { Amplify } from "aws-amplify";
import { signIn, signUp, confirmSignUp } from "@aws-amplify/auth";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_USERPOOL_CLIENT_ID || "",
      userPoolId: process.env.NEXT_PUBLIC_USERPOOL_ID || "",
    },
  },
});
