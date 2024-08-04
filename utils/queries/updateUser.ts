'use server'
import { createClient } from "@/utils/supabase/server";

export const updateUser = async (id: any, display_name: string, thumbnail: string) => {
  console.log("Update User Called")

  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_preferences')
    .update({username: display_name, thumbnail: thumbnail, validated: true})
    .eq('supabase_id', id)
    .single();

  
  if (error) {
    console.error('Error checking user preferences:', id, error);
    return null
  }

  // console.log(id, display_name, thumbnail);
  // console.log('Updated preference data:', data);
  return (200);
}

// Should I store in metadata instead?