import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function supabaseServer() {   // ← MUST be async
  const cookieStore = await cookies();     // ← FIXED

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },

        set(name: string, value: string, options: any) {
          // cannot set cookies in server components
        },

        remove(name: string, options: any) {
          // cannot remove cookies
        }
      },
    }
  );
}
