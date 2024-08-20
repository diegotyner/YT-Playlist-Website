import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const page = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col">
      This is my profile
      <Link href={'/profile/configure'} className="clickable bg-green-400 rounded-lg text-center">Configure</Link>
    </div>
  );
};

export default page;
