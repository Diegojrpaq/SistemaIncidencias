import React from 'react'
import Column from '../Column/Column'

const MainIncidencias = () => {
    return (
        <main className='flex-1 w-full overflow-x-auto'>
            <div className='flex flex-row justify-evenly
             
             gap-4 p-4 h-full'
            >
                <Column  title='Col 1'/>
                <Column  title='Col 2'/>
                <Column  title='Col 3'/>
            </div>
        </main>
    )
}

export default MainIncidencias
