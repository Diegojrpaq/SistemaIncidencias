import React, { useCallback, useState } from 'react'
import { Select, SelectItem, Input } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import { catalogoSucursales, dataUser, Incidencia } from '@/lib/interfaces';
import { useSearch } from '@/context/SearchContext';
import { getDataByGuia } from "@/lib/api";
import { urlServer } from "@/lib/url";

interface navbarProps {
  user?: dataUser;
  catalogoSucursales: catalogoSucursales[];
}

const Navbar = ({ user, catalogoSucursales }: navbarProps) => {
  const {
    query,
    setQuery,
    filter,
    setFilter,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    hasSearched,
    setHasSearched
  } = useSearch();

  const [value, setValue] = React.useState<string>(`${user?.Sucursal_principal}`);
  const [filterValue, setFilterValue] = useState("");
  const pathname = usePathname();

  // Verificar si estamos en la ruta /historial
  const isHistorialRoute = pathname === '/historial';

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    setFilter(Number(e.target.value))
  };

  // Función para hacer la petición API (solo para /historial)
  const searchIncidencia = useCallback(async (numGuia: string) => {
    if (!numGuia.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await getDataByGuia(`${urlServer}/Incidencias/validacionGuia`, numGuia);

      if (data) {
        const results = Array.isArray(data) ? data : [data];
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }

      setHasSearched(true);
    } catch (error) {
      console.error("Error al buscar incidencia:", error);
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  }, [setSearchResults, setHasSearched, setIsSearching]);

  // Función para manejar cambios en el input (solo actualiza el valor, no busca)
  const onSearchChange = useCallback((value: string) => {
    if (isHistorialRoute) {
      // Solo actualizar el valor del input, no buscar aún
      setFilterValue(value);
    } else {
      // Para otras rutas, actualizar query
      setQuery(value);
    }
  }, [isHistorialRoute, setQuery]);

  // Función para manejar la búsqueda al presionar Enter
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = isHistorialRoute ? filterValue : query;

      if (isHistorialRoute) {
        setQuery(value); // Actualizar query para que la tabla lo vea
        if (value.trim()) {
          searchIncidencia(value);
        } else {
          setSearchResults([]);
          setHasSearched(false);
        }
      }
      // Para otras rutas, el valor ya está en query, no necesita hacer nada más
    }
  }, [isHistorialRoute, filterValue, query, searchIncidencia, setQuery, setSearchResults, setHasSearched]);

  // Función para limpiar el input
  const onClear = useCallback(() => {
    if (isHistorialRoute) {
      setFilterValue("");
      setQuery("");
      setSearchResults([]);
      setHasSearched(false);
    } else {
      setQuery("");
    }
  }, [isHistorialRoute, setQuery, setSearchResults, setHasSearched]);

  const sucursales = catalogoSucursales?.map((suc) => ({
    key: suc.id?.toString() || '', // Asegurar que sea string y no undefined
    label: suc.sucursal || 'Sin nombre',
  })) || []

  sucursales.push({
    key: '-1', // Cambiar a string
    label: 'Todas sucursales',
  })

  return (
    <nav className={
      `
        flex w-full justify-between
        items-center p-4 border-b
        border-b-gray-300 max-h-20
        `
    }>
      <div className='md:w-full'>
        Destino: {user?.Destino}
      </div>

      <div className='w-full flex justify-end pr-4'>
        <Select
          value={filter.toString()}
          label="Selecciona una sucursal"
          className="max-w-xs"
          size='sm'
          defaultSelectedKeys={["-1"]}
          onChange={handleSelectionChange}
        >
          {sucursales?.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <div className="w-[310px] rounded-md flex justify-center items-center">
          <Input
            isClearable={isHistorialRoute}
            value={isHistorialRoute ? filterValue : query}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onClear={isHistorialRoute ? onClear : undefined}
            isDisabled={isHistorialRoute ? isSearching : false}
            size='sm'
            classNames={{
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
            }}
            label="Num. Guía"
            placeholder={isHistorialRoute ? "Buscar por número de guía... (Presiona Enter)" : "Buscar por número de guía"}
            radius="sm"
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>

        {/* Mostrar estado de búsqueda solo en /historial */}
        {isHistorialRoute && (
          <div className="text-xs text-default-400 mt-1 text-center">
            {isSearching && "Buscando..."}
            {hasSearched && !isSearching && searchResults.length === 0 && "No se encontraron resultados"}
            {hasSearched && !isSearching && searchResults.length > 0 && `${searchResults.length} resultado(s) encontrado(s)`}
          </div>
        )}
      </div>
    </nav>
  )
}

export const SearchIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Navbar