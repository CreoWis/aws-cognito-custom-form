import { Amplify } from "aws-amplify";
import { signIn, signUp, confirmSignUp } from "@aws-amplify/auth";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "XXXXXXXXXXXXXXX",
      userPoolId: "XXXXXXXXXXXXXXX",
    },
  },
});
