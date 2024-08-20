"use server";

import PreferenceForm from "@/components/preference-form";
import { createClient } from "@/utils/supabase/server";

export default async function configureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return <p>Error getting user session</p>;
  }

  const user = data.user;
  // console.log(data.user)
  return (
    <>
      {children}
      <PreferenceForm
        id={user.id}
        username={
          user.user_metadata.custom_metadata?.display_name ||
          user.user_metadata.name
        }
        thumbnail={user.user_metadata.custom_metadata?.avatar_url}
      />
      {/* id, username, thumbnail */}
    </>
  );
}
