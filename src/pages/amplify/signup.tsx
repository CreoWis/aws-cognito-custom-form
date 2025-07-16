"use client";
import { confirmSignUp, signUp } from "@aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignUpFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"signup" | "confirm">("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });
      setStep("confirm");
    } catch (err) {
      setError(`ERROR: ${err}`);
      console.error(err);
    }
    setLoading(false);
  };

  const handleConfirm = async () => {
    setError("");
    setLoading(true);
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      alert("Signup confirmed!");
    } catch (err) {
      console.error(err);
    }
    redirect("/amplify/redirect");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border rounded-lg p-16">
        {loading ? (
          <label>Processing. Please wait...</label>
        ) : (
          <div className="p-4 space-y-2">
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
              <div className="flex flex-col gap-2 w-128">
                <label> Confirmation code sent to {email}</label>
                <input
                  placeholder="Confirmation Code"
                  onChange={(e) => setCode(e.target.value)}
                  className="border p-2"
                />
                <button
                  onClick={() => handleConfirm()}
                  className="bg-blue-600 text-white px-4 py-2 cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            )}
            <label>
              {" "}
              Already have an account?{" "}
              <Link href="/amplify/signin" className="text-blue-500">
                Signin
              </Link>
            </label>
            <div className="py-3">
              {error ? <label className="text-red-500">{error}</label> : <></>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
