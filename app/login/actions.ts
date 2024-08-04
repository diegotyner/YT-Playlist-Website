// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'

// import { createClient } from '@/utils/supabase/server'

// export async function login(formData: FormData) {
//   const supabase = createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signInWithPassword(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }

// export async function signup(formData: FormData) {
//   const supabase = createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }




// "use server";

// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
// import { headers } from "next/headers";

// export async function signIn() {
//   const origin = headers().get("origin");
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: `${origin}/auth/callback`,
//     },
//   });

//   if (error) {
//     console.log(error);
//   } else {
//     return redirect(data.url);
//   }
// };
