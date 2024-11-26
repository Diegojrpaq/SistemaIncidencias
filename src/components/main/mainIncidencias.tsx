import React, { useContext } from 'react'
import Column from '../Column/Column'
import { IncidenciasContext } from '@/context/IncidenciasContext'

const MainIncidencias = () => {
    const catalogoIncidencias = useContext(IncidenciasContext);
    
    //Filtrar las incidencias para cada columna
    const incidenciasAbiertas = catalogoIncidencias?.filter(item => item.incidencia === 1);
    const incidenciasResolucion = catalogoIncidencias?.filter(item => item.incidencia === 2);
    const incidenciasCerradas = catalogoIncidencias?.filter(item => item.incidencia === 0);

    // Mostrar las columnas con las incidencias filtradas
    return (
        <main className='flex-1 w-full overflow-x-auto h-screen'>
            <div className='flex flex-row justify-evenly
             
             gap-4 p-4 h-full'
            >
                <Column  
                    title='Incidencias Abiertas'
                    incidencias={incidenciasAbiertas}
                />
                <Column  
                    title='Incidencias en Resolución'
                    incidencias={incidenciasResolucion}
                />
                <Column  
                    title='Incidencias Cerradas'
                    incidencias={incidenciasCerradas}
                />
            </div>
        </main>
    )
}

export default MainIncidencias
