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
      className="fixed inset-y-1/3 inset-x-0 flex justify-center items-start"
    >
      <button className="flex items-center gap-3 text-2xl p-4 rounded-3xl bg-slate-300 hover:bg-slate-400">
        <div className="h-[50px] w-[50px] rounded-2xl bg-gray-600"><img className="h-full w-full" src="icons/g_icon.svg"/> </div>
        <span>Sign in with Google</span>
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
