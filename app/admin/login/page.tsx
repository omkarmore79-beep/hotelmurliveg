"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
       router.replace("/admin");
      }
    });

  return () => subscription.unsubscribe();
}, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fceee6]">
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

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[#903e13] text-[#903e13] placeholder-[#903e13] p-2 rounded mb-3"
          required
        />

        {/* Password with eye toggle */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#903e13] text-[#903e13] placeholder-[#903e13] p-2 rounded pr-10"
            required
          />

          {/* Eye Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <img src="/blackeyehide.png" alt="Hide" className="w-5 h-5" />
            ) : (
              <img src="/blackeyeshow.png" alt="Show" className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-[#903e13] text-[#fcf3e6] active:scale-95 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
