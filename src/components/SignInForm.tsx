"use client";

import { signIn } from "@aws-amplify/auth";
import { useState } from "react";

export default function SignInForm() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    setError("");
    try {
      const user = await signIn({
        username: email,
        password,
      });
      //   alert("Signed in");
    } catch (err) {
      setError(`${err}`);
      console.error(err);
      //   alert(`Sign-in failed  ${err}`);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border rounded-lg p-16">
        <div className="p-4 max-w-md mx-auto space-y-4 flex flex-col items-center justify-center w-128">
          <h1>AWS Cognito demo using amplify</h1>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full  rounded-md"
          />
          <button
            onClick={handleSignIn}
            className="bg-blue-600 text-white px-4 py-2 cursor-pointer"
          >
            Sign In
          </button>
          <div className="py-3">
            {error ? <label className="text-red-500">{error}</label> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}
