import * as Avatar from '@radix-ui/react-avatar';

interface CustomAvatarProps {
  avatar_url?: string;
  backup?: string;
  selected?: boolean;
}
const CustomAvatar = ({avatar_url, backup, selected}:CustomAvatarProps)  => {
  return (
    <Avatar.Root className="bg-blackA1 inline-flex h-[75px] w-[75px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <Avatar.Image src={avatar_url} className={`h-full w-full rounded-[inherit] object-cover border-[3px] ${selected ? 'border-cyan-700' : 'border-neutral-400'}`} alt='Profile Picture'/>
      <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-[inherit] bg-white text-[15px] border-2 border-neutral-400" delayMs={1000}>
        <img src={backup ? backup : '/icons/add_pfp.svg'} className='h-10/12 w-10/12 object-cover pl-1 opacity-70'/>
      </Avatar.Fallback>
  </Avatar.Root>
  )
}

export default CustomAvatar