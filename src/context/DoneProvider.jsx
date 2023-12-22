import React, { useContext, useState } from "react";

const DoneContext = React.createContext();

export function useDone(){
    return useContext(DoneContext);
}

export function DoneProvider({children}){

    const [done,setDone] = useState(false);

    return(
        <DoneContext.Provider value={{done,setDone}}>
            {children}
        </DoneContext.Provider>
    )

}