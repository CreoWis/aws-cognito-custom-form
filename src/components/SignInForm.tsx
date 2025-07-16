"use client";

import { signIn } from "@aws-amplify/auth";
import { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const user = await signIn({
        username: email,
        password,
      });
      alert("Signed in");
    } catch (err) {
      console.error(err);
      alert(`Sign-in failed  ${err}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleSignIn}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Sign In
      </button>
    </div>
  );
}
