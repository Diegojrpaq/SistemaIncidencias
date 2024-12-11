'use client'
import Column from '../../components/Column/Column'
import { useContext } from "react";
import { IncidenciasContext } from '@/context/IncidenciasContext'
import MainIncidencias from '@/components/main/mainIncidencias';
import { Incidencia } from '@/lib/interfaces';

export default function page() {
  const dataUserAndIncidencias = useContext(IncidenciasContext);
  const incidencias = dataUserAndIncidencias?.incidencias;
  //Filtrar las incidencias para cada columna
  const incidenciasAbiertas = incidencias?.filter((item: Incidencia) => item.incidencia === 1);
  const incidenciasResolucion = incidencias?.filter((item: Incidencia) => item.incidencia === 2);
  const incidenciasCerradas = incidencias?.filter((item: Incidencia) => item.incidencia === 0);

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