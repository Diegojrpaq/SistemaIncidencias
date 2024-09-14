import React from "react";

interface STittleProps{
    children: React.ReactNode;
}

const STittle:React.FC<STittleProps>= ({children})=>{
    return(
        <>
        <p>{children}</p>
        </>
    )
}

export default STittle;