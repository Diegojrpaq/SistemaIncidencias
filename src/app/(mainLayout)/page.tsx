'use client'
import Column from '../../components/Column/Column'
import { useContext } from "react";
import { IncidenciasContext } from '@/context/IncidenciasContext'
import MainIncidencias from '@/components/main/MainIncidencias';

export default function page() {
  const catalogoIncidencias = useContext(IncidenciasContext);
    
    //Filtrar las incidencias para cada columna
    const incidenciasAbiertas = catalogoIncidencias?.filter(item => item.incidencia === 1);
    const incidenciasResolucion = catalogoIncidencias?.filter(item => item.incidencia === 2);
    const incidenciasCerradas = catalogoIncidencias?.filter(item => item.incidencia === 0);

    // Mostrar las columnas con las incidencias filtradas

  return (
    <>
      <MainIncidencias>
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
      </MainIncidencias>
    </>
  )


}