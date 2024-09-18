"use client";
import React, { useState } from "react";
import { api } from "@/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ErrorResponse } from "@/types/error";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/user/signup", { username, password });

      console.log("user", data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage("Signup successful. Redirecting to login...");
      router.push("/");
    } catch (error) {
      setMessage(
        "Signup failed: " + (error as ErrorResponse).response.data.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>
        </form>
        <div>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600">
              Login{" "}
            </Link>
          </p>
        </div>
        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
