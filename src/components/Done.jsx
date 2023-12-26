import React, { useEffect } from 'react'
import Tick from '../assets/Tick.png'
import { useDone } from '../context/DoneProvider'

function Done({text}) {

    const {done,setDone} = useDone();

    useEffect(()=>{
        if(done){
            setTimeout(()=>{
                setDone(false);
            },3000)
        }
    },[done])

    const click = ()=>{
        setDone(false)
    }

  return (
    <div className={` ${done ? `right-[2rem]` : `left-[100%]` } w-auto min-w-[25%] h-[4rem] absolute top-[5rem]  bg-neutral-800 rounded-s-md duration-300`}>
        <div className=' h-[100%] flex justify-start '>
            <img className=' bg-green-500 rounded-s-md ' src={Tick} alt="" />
            <div className=' mx-4 my-auto font-medium'>
                {text}
            </div>
            <button onClick={click} className=' my-auto border-l-2 border-neutral-300 h-[90%] aspect-square mx-auto'>
                X
            </button>
        </div>
    </div>
  )
}

export default Done