import React from 'react'
import { Select, SelectItem, Input } from "@nextui-org/react";
import { catalogoSucursales, dataUser } from '@/lib/interfaces';
import { useSearch } from '@/context/SearchContext';
interface navbarProps {
  user?: dataUser;
  catalogoSucursales: catalogoSucursales[];
}
const Navbar = ({ user, catalogoSucursales }: navbarProps) => {
  const { query, setQuery, filter, setFilter } = useSearch();
  const [value, setValue] = React.useState<string>(`${user?.Sucursal_principal}`);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    setFilter(Number(e.target.value))
  };
  const sucursales = catalogoSucursales.map((suc) => ({
    key: suc.id,
    label: suc.sucursal,
  }))
  sucursales.push({
    key: -1,
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
          value={filter}
          label="Selecciona una sucursal"
          className="max-w-xs"
          size='sm'
          defaultSelectedKeys={[`${-1}`]}
          onChange={handleSelectionChange}
        >
          {sucursales?.map((item) => (
            <SelectItem key={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <div className="w-[310px] rounded-md flex justify-center items-center">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            isClearable
            size='sm'
            classNames={{
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
            }}
            label="Num. Guía"
            placeholder="Buscar por número de guía"
            radius="sm"
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
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
