import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className=' w-[80%] min-w-[25rem] max-w-[40rem] m-2'>
            {label && <label 
            className=' m-4' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={` mb-2 mt-2 px-3 py-2 rounded-lg bg-zinc-800 text-white outline-none focus:bg-zinc-600 duration-200 border-2 border-zinc-200 focus:border-white w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input