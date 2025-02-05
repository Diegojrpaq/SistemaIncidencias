import React, { ReactNode} from 'react'
const MainIncidencias = ({children}:{children:ReactNode}) => {
    return (
        <main className='flex-1 w-full overflow-x-auto h-screen'>
            <div className='flex flex-row justify-evenly
             
             gap-4 p-4 h-full'
            >
               {children}
            </div>
        </main>
    )
}

export default MainIncidencias
