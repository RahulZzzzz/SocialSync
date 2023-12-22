import React from 'react'
import { useSelector } from 'react-redux'

function Middle({username}) {

    const userData = useSelector((state)=> state.auth.userData);

    // console.log(userData);

  return (
    <div className=' w-[100%] h-[8rem] border-b-[1px] p-5 border-zinc-400 justify-start flex items-center '>
        <div className=' font-bold text-4xl text-center underline'>
            {username}
        </div>
    </div>
  )
}

export default Middle