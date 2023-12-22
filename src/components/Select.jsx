import React,{useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
},ref) {

    const id = useId();

  return (
    <div >

        {label && <label htmlFor={id} className=' m-1 p-1'>{label} :</label>}
        <select 
        {...props}
        id={id}
        ref={ref}
        className={`rounded-lg bg-zinc-900 text-zinc-100 border-zinc-100 border-4 ${className}`}
        >
            {options?.map((option)=>(
                
                    <option key={option} value={option}>
                        {option}
                    </option>
                )
            )}
        </select>

    </div>
  )
}

export default React.forwardRef(Select)