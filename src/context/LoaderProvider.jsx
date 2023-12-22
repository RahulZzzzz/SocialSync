import React, { useContext, useState } from 'react'

const LoaderContext = React.createContext();

export function useLoader(){
    return useContext(LoaderContext);
}

export function LoaderProvider({children}) {

    const [progress,setProgress] = useState(10);

  return (
    <LoaderContext.Provider value = {{progress,setProgress}}>
        {children}
    </LoaderContext.Provider>
  )
}