'use client'
import Column from '../../components/Column/Column'
import { useContext } from "react";
import { IncidenciasContext } from '@/context/IncidenciasContext'
import MainIncidencias from '@/components/main/mainIncidencias';
import { Incidencia } from '@/lib/interfaces';
import { useSearch } from '@/context/SearchContext';

export default function Page() { // Cambié 'page' a 'Page'
  const dataUserAndIncidencias = useContext(IncidenciasContext);
  const incidencias = dataUserAndIncidencias?.incidencias;
  const { query, filter, statusFilter } = useSearch();

  console.log('statusFilter:', statusFilter); // Para debug

  const filteredCards = incidencias?.filter((incidencia) => {
    const matchesQuery =
      incidencia.numGuia.toLowerCase().includes(query.toLowerCase());

    const matchesSucursalFilter =
      filter === -1 ||
      filter === 0 ||
      incidencia.idSucursal === filter;

    // Lógica CORREGIDA para el filtro de estatus
    const matchesStatusFilter =
      statusFilter.length === 0 || // Si el array está vacío, mostrar TODOS
      statusFilter.includes(incidencia.resuelto); // Si hay filtros, verificar coincidencia

    return matchesQuery && matchesSucursalFilter && matchesStatusFilter;
  });

  // Filtrar las incidencias para cada columna
  const incidenciasAbiertas = filteredCards?.filter((item: Incidencia) => item.resuelto === 1);
  const incidenciasResolucion = filteredCards?.filter((item: Incidencia) => item.resuelto === 2 || item.resuelto === 3);
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