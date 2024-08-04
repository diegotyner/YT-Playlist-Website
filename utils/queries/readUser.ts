'use server'
import { createClient } from "@/utils/supabase/server";

// ID should be UUID, but I don't want to import crypto
export const readUser = async (id: any) => {
  console.time('readUser()');
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('supabase_id', id)
    .single();

  
  if (error) {
    console.error('Error checking user preferences:', id, error);
    return null
  }

  // console.log('Fetched preference data:', data);
  console.timeEnd('readUser()');
  return (data);
};