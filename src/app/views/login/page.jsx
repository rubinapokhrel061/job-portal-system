"use client";

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function SignIn() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      localStorage.setItem("user", JSON.stringify(session.user));

      window.location.href = "/";
    }
  }, [session]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full sm:w-96 p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign In to Your Account
        </h2>

        <div className="mt-4 space-y-4">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center py-3 px-6 rounded-lg bg-[#4285F4] text-white hover:bg-[#357ae8] transition-all duration-300 focus:outline-none transform hover:scale-105 shadow-lg"
          >
            <div className="bg-white p-[2px] rounded-full mr-2">
              <Image
                src="/google.png"
                alt="google"
                width={35}
                height={35}
                className="rounded-full"
              />
            </div>
            <span>Sign In with Google</span>
          </button>

          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center py-3 px-6 rounded-lg bg-[#333] text-white hover:bg-[#444] transition-all duration-300 focus:outline-none transform hover:scale-105 shadow-lg"
          >
            <div className="bg-white p-2 flex justify-center items-center rounded-full mr-2">
              <Image
                src="/github.png"
                alt="github"
                width={25}
                height={25}
                className="rounded-full"
              />
            </div>
            <span>Sign In with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
