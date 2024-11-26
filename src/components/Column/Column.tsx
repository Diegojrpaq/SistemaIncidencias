import React from 'react'
import CardIncidencia from '@/components/CardIncidencia/CardIncidencia';
import { Incidencia } from '@/lib/interfaces';
import {Chip} from "@nextui-org/react";
interface propsColumn {
    title: string;
    incidencias: Incidencia[] | undefined;
}
const Column = ({ title, incidencias }: propsColumn) => {
    return (
        <div className='flex flex-col items-center bg-gray-200
            rounded-lg min-w-[364px]'>
            <div className='flex items-center p-4 w-full'>
                <h3 className='text-start text-lg mr-2'>{title}</h3>
                <Chip 
                    radius="sm"
                >
                    {
                        incidencias && incidencias.length
                    }
                </Chip>
            </div>
            <div className='flex flex-col
                w-full rounded-lg p-3 max-w-96 shadow-lg 
                gap-3 h-full overflow-y-auto space-y-4 
                scrollbar-hide'
            >
                {
                   incidencias && incidencias?.map((incidencia) => (
                        <CardIncidencia dataCard={incidencia} />
                    ))
                }

            </div>
        </div>
    )
}

export default Column
