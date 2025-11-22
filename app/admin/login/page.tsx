"use client";

import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin"); // redirect to dashboard
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fceee6] relative z-[50]">
      <form
        onSubmit={handleLogin}
        className="p-6 rounded-xl shadow-md w-80 bg-[#fcf3e6]"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-[#903e13]">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[#903e13] text-[#903e13] placeholder-[#903e13] p-2 rounded mb-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[#903e13] text-[#903e13] placeholder-[#903e13] p-2 rounded mb-3"
          required
        />

        <button
          type="submit"
          className="w-full py-2 rounded bg-[#903e13] text-[#fcf3e6] active:scale-95 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
