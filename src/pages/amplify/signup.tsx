"use client";
import SignUpForm from "@/components/SignUpForm";
import { confirmSignUp, signUp } from "@aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";

export default function SignUpFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"signup" | "confirm">("signup");
  const [loading, setLoading] = useState(true);

  const handleSignUp = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      alert("Signup confirmed!");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border rounded-lg p-16">
        {loading ? (
          <label>Processing. Please wait...</label>
        ) : (
          <div className="p-4">
            {step === "signup" ? (
              <div className="flex flex-col gap-2 w-128">
                <input
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 w-full rounded-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 w-full rounded-md"
                />
                <button
                  onClick={() => handleSignUp()}
                  className="bg-blue-600 text-white px-4 py-2 cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
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
        )}
      </div>
    </div>
  );
}
