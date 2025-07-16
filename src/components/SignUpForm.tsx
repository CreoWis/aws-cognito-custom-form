"use client";

import { useState } from "react";
import { signUp, confirmSignUp } from "@aws-amplify/auth";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"signup" | "confirm">("signup");

  const handleSignUp = async () => {
    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });
      setStep("confirm");
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      alert("Signup confirmed!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      {step === "signup" ? (
        <>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2"
          />
          <button onClick={() => handleSignUp()}>Sign Up</button>
        </>
      ) : (
        <>
          <input
            placeholder="Confirmation Code"
            onChange={(e) => setCode(e.target.value)}
            className="border p-2"
          />
          <button onClick={() => handleConfirm()}>Confirm</button>
        </>
      )}
    </div>
  );
}
