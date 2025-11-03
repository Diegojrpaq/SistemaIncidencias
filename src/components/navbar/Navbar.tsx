import React, { useCallback, useState, useEffect } from 'react'
import { Select, SelectItem, Input } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import { catalogoSucursales, dataUser } from '@/lib/interfaces';
import { useSearch } from '@/context/SearchContext';
import { getDataByGuia, getOrigenesFromAPI } from "@/lib/api";
import { urlServer } from "@/lib/url";

interface navbarProps {
  user?: dataUser;
  catalogoSucursales: catalogoSucursales[];
}

const statusOptions = [
  { name: "Abiertas", uid: 1 },
  { name: "En resolución", uid: 2 },
  { name: "Cerradas", uid: 4 },
];

const Navbar = ({ user, catalogoSucursales }: navbarProps) => {
  const {
    query,
    setQuery,
    filter,
    setFilter,
    statusFilter,
    setStatusFilter,
    origenFilter,
    setOrigenFilter,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    hasSearched,
    setHasSearched
  } = useSearch();

  const [sucursalValue, setSucursalValue] = React.useState<string>(`${user?.Sucursal_principal}`);
  const [statusValues, setStatusValues] = React.useState<Set<string>>(new Set());
  const [origenValues, setOrigenValues] = React.useState<Set<string>>(new Set());
  const [filterValue, setFilterValue] = useState("");
  const [origenOptions, setOrigenOptions] = useState<{ name: string, uid: string }[]>([]);
  const [loadingOrigenes, setLoadingOrigenes] = useState(false);
  const pathname = usePathname();

  const isHistorialRoute = pathname === '/historial';
  const isTableRoute = pathname === '/table'; // Nueva variable para ruta /table

  // Efecto para cargar orígenes desde la API - solo en ruta /table
  useEffect(() => {
    if (isTableRoute) {
      const loadOrigenes = async () => {
        setLoadingOrigenes(true);
        try {
          const destinos = await getOrigenesFromAPI();
          console.log("📍 Destinos cargados desde API:", destinos);

          // Mapear los datos a la estructura necesaria
          const options = destinos.map(destino => ({
            name: destino.nombre.trim(), // Limpiar espacios en blanco
            uid: destino.nombre.trim()   // Usar el nombre como ID único
          }));

          // Ordenar alfabéticamente
          options.sort((a, b) => a.name.localeCompare(b.name, 'es'));

          setOrigenOptions(options);
          console.log("📍 Opciones de origen procesadas:", options);
        } catch (error) {
          console.error('Error cargando orígenes:', error);
          // Opcional: setear algunos orígenes por defecto en caso de error
          setOrigenOptions([
            { name: "GUADALAJARA", uid: "GUADALAJARA" },
            { name: "MONTERREY", uid: "MONTERREY" },
            { name: "PUEBLA", uid: "PUEBLA" },
          ]);
        } finally {
          setLoadingOrigenes(false);
        }
      };

      loadOrigenes();
    }
  }, [isTableRoute]); // Solo ejecutar cuando isTableRoute cambie

  const handleSucursalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSucursalValue(e.target.value);
    setFilter(Number(e.target.value))
  };

  const handleStatusSelectionChange = (keys: any) => {
    const keysSet = new Set(keys);
    setStatusValues(keys);
    const numericValues = Array.from(keysSet).map(key => Number(key));
    setStatusFilter(numericValues);
  };

  const handleOrigenSelectionChange = (keys: any) => {
    const keysSet = new Set(keys);
    setOrigenValues(keys);
    const stringValues = Array.from(keysSet).map(key => String(key));
    setOrigenFilter(stringValues);
  };

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

  const onSearchChange = useCallback((value: string) => {
    if (isHistorialRoute) {
      setFilterValue(value);
    } else {
      setQuery(value);
    }
  }, [isHistorialRoute, setQuery]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = isHistorialRoute ? filterValue : query;

      if (isHistorialRoute) {
        setQuery(value);
        if (value.trim()) {
          searchIncidencia(value);
        } else {
          setSearchResults([]);
          setHasSearched(false);
        }
      }
    }
  }, [isHistorialRoute, filterValue, query, searchIncidencia, setQuery, setSearchResults, setHasSearched]);

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
    key: suc.id?.toString() || '',
    label: suc.sucursal || 'Sin nombre',
  })) || []

  sucursales.push({
    key: '-1',
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

      <div className='w-full flex justify-end pr-4 gap-4'>
        {/* Filtro de Sucursales - siempre visible */}
        {/* <Select
          value={sucursalValue}
          label="Sucursal"
          className="max-w-xs"
          size='sm'
          defaultSelectedKeys={["-1"]}
          onChange={handleSucursalChange}
        >
          {sucursales?.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select> */}

        {/* Filtro de Origen - solo en ruta /table */}
        {isTableRoute && (
          <Select
            label="Origen"
            selectionMode="multiple"
            placeholder={loadingOrigenes ? "Cargando orígenes..." : "Todos los orígenes"}
            className="max-w-xs"
            size='sm'
            selectedKeys={origenValues}
            onSelectionChange={handleOrigenSelectionChange}
            isLoading={loadingOrigenes}
            isDisabled={loadingOrigenes}
          >
            {origenOptions.map((item) => (
              <SelectItem key={item.uid} value={item.uid}>
                {item.name}
              </SelectItem>
            ))}
          </Select>
        )}

        {/* Filtro de Estatus - solo en ruta /table */}
        {isTableRoute && (
          <Select
            label="Estatus"
            selectionMode="multiple"
            placeholder="Todos los estatus"
            className="max-w-xs"
            size='sm'
            selectedKeys={statusValues}
            onSelectionChange={handleStatusSelectionChange}
          >
            {statusOptions?.map((item) => (
              <SelectItem key={item.uid.toString()} value={item.uid.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </Select>
        )}
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

        {/* Estado de búsqueda - solo en /historial */}
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