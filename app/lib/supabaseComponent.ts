import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseComponentClient = () => {
  return createClientComponentClient();
};
