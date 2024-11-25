import React from 'react'

interface propsColumn {
    title: string;
}
const Column = ({ title }: propsColumn) => {
    return (
        <div className='flex flex-col bg-gray-200
    w-full rounded-lg p-3 max-w-96 shadow-lg'
        >
            <h3 className='text-center'>{title}</h3>
            <div className='bg-indigo-500 p-2 rounded-md'>
                Card
            </div>
        </div>
    )
}

export default Column
