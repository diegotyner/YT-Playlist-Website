import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const page = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <div>This is my profile</div>;
};

export default page;
