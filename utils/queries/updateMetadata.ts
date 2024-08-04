'use server'
import { createClient } from "@/utils/supabase/server";

export const updateMetadata = async (id: any, display_name: string, thumbnail: string) => {
  const supabase = createClient();
  const metadata_object = { display_name, avatar_url: thumbnail };
  const { data, error } = await supabase.auth.updateUser({
    data: {custom_metadata: metadata_object}
  });

  if (error) {
    return null
  }

  // console.log(data.user);
  return (data);
}

