"use client";

import { AuthUser, getCurrentUser, signOut, signIn } from "@aws-amplify/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function SignInFormPage() {
  const [user, setUser] = useState<AuthUser>();
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const check = async () => {
      await checkLogin();
    };
    check();
  }, []);

  const checkLogin = async () => {
    try {
      const u = await getCurrentUser();
      console.log("User is logged in:", u);
      setUser(u);
    } catch (err) {
      console.log(`User is not logged in ${err}`);
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await signIn({
        username: email,
        password,
      });
      console.error(`Signed in ${user}`);
      //   alert("Signed in");
    } catch (err) {
      setError(`${err}`);
      console.error(err);
      //   alert(`Sign-in failed  ${err}`);
    }
    await checkLogin();
    setLoading(false);
  };

  const handleSignout = async () => {
    setLoading(true);
    await signOut();
    setUser(undefined);
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border rounded-lg p-16">
        {loading ? (
          <label>Processing. Please wait...</label>
        ) : (
          <>
            {user ? (
              <div className="flex flex-col gap-2 justify-center items-center">
                <label className="text-lg">{user.username}</label>
                <div>
                  <button
                    className="text-sm border cursor-pointer p-4"
                    onClick={() => {
                      handleSignout();
                    }}
                  >
                    Signout
                  </button>
                </div>
              </div>
            ) : (
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
                <label>
                  {" "}
                  No Account?{" "}
                  <Link href="/amplify/signup" className="text-blue-500">
                    Create one
                  </Link>
                </label>
                <div className="py-3">
                  {error ? (
                    <label className="text-red-500">{error}</label>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
