"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userIdentifier: "", // Can be either email or username
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        userIdentifier: formData.userIdentifier,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard"); // Redirect to dashboard on success
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <FiUser />
            </div>
            <input
              type="text"
              placeholder="Email or username"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={formData.userIdentifier}
              onChange={(e) =>
                setFormData({ ...formData, userIdentifier: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <FiLock />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800 transition"
          >
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Signing in...
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-600">Don't have an account?</span>{" "}
        <a
          href="/auth/register"
          className="text-blue-600 hover:text-blue-800 transition"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};
