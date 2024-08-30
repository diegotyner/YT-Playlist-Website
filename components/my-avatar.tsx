'use server'

import { createClient } from "@/utils/supabase/server";
import * as Avatar from '@radix-ui/react-avatar';


const MyAvatar = async ()  => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  let avatar_url;
  if (error) { avatar_url = null}
  else {  avatar_url = data?.user.user_metadata.custom_metadata?.avatar_url}
  return (
    <>
    <Avatar.Root className="inline-flex absolute inset-0 select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <Avatar.Image src={avatar_url} className={`h-full w-full rounded-[inherit] object-cover border-[3px] 'border-neutral-400`} alt='Profile Picture'/>
      <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-[inherit] bg-white text-[15px] border-2 border-neutral-400" delayMs={1000}>
        <img src={'/icons/add_pfp.svg'} className='h-10/12 w-10/12 object-cover pl-1 opacity-70'/>
      </Avatar.Fallback>
    </Avatar.Root>
    </>
  )
}

export default MyAvatar