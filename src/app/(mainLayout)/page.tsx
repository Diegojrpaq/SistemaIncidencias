'use client'
import Column from '../../components/Column/Column'
import { useContext } from "react";
import { IncidenciasContext } from '@/context/IncidenciasContext'
import MainIncidencias from '@/components/main/mainIncidencias';
import { Incidencia } from '@/lib/interfaces';
import { useSearch } from '@/context/SearchContext';

export default function page() {
  const dataUserAndIncidencias = useContext(IncidenciasContext);
  const incidencias = dataUserAndIncidencias?.incidencias;
  const { query, filter } = useSearch();

  const searchIncidencias = incidencias?.filter(
    (incidencia) =>
      incidencia.numGuia.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCards = incidencias?.filter((incidencia) => {
    const matchesQuery = 
      incidencia.numGuia.toLowerCase().includes(query.toLowerCase());

    const matchesFilter = filter === -1 || incidencia.idSucursal === filter;

    return matchesQuery && matchesFilter;
  })

  //Filtrar las incidencias para cada columna
  const incidenciasAbiertas = filteredCards?.filter((item: Incidencia) => item.resuelto === 1);
  const incidenciasResolucion = filteredCards?.filter((item: Incidencia) => item.resuelto === 2);
  const incidenciasSolicitudCierre = incidencias?.filter((item: Incidencia) => item.resuelto === 3);
  const incidenciasCerradas = filteredCards?.filter((item: Incidencia) => item.resuelto === 4);

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