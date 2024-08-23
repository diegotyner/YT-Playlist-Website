import React from 'react'

const PlaylistSkeleton = () => {
  return (
    <div className='w-[400px] border-2 border-neutral-400 p-3 rounded-2xl'>
      <div className="h-[200px] w-full inset-attempt bg-gray-800  clickable py-6 rounded-2xl">

      </div>
      <div className="flex w-auto mx-2 mt-2">
        <div className='bg-gray-800  inline-flex h-[75px] w-[75px] select-none items-center justify-center overflow-hidden rounded-full align-middle'>
          <div className={`h-full w-full rounded-[inherit] object-cover border-[3px] border-neutral-400`}></div>
        </div>
        <div className="flex-grow flex flex-col w-1 pl-3 my-2">
          <h1 className="bg-gray-800 w-11/12 h-[1rem] my-[0.25rem] rounded-md"></h1>
          <p className="bg-gray-800 w-1/3 h-[1rem] my-[0.25rem] rounded-md"></p>
        </div>
      </div>
    </div>
  )
}

export default PlaylistSkeleton