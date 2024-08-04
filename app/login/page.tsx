import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function LoginPage() {
  const signIn = async () => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    } else {
      return redirect(data.url);
    }
  };

  return (
    <form
      action={signIn}
      className="flex-1 flex min-h-screen justify-center items-center"
    >
      <button className="hover:bg-gray-800 p-8 rounded-xl">
        Sign in with Google
      </button>
    </form>
  );
}









// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
// import { headers } from "next/headers";

// export default function LoginForm() {
//   const signIn = async () => {
//     "use server";

//     const origin = headers().get("origin");
//     const supabase = createClient();
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: `${origin}/auth/callback`,
//       },
//     });

//     if (error) {
//       console.log(error);
//     } else {
//       return redirect(data.url);
//     }
//   };
// }
