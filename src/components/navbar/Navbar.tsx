import React from 'react'
import { Select, SelectItem } from "@nextui-org/react";
import { catalogoSucursales, dataUser } from '@/lib/interfaces';

interface navbarProps {
  user?: dataUser;
  catalogoSucursales: catalogoSucursales[];
}
const Navbar = ({ user, catalogoSucursales }: navbarProps) => {
  const [value, setValue] = React.useState<string>(`${user?.Sucursal_principal}`);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
  const sucursales = catalogoSucursales.map((suc) => ({
    key: suc.sucursal,
    label: suc.sucursal,
  }))
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
          label="Selecciona una sucursal"
          className="max-w-xs"
          size='sm'
          defaultSelectedKeys={[`${user?.Sucursal_principal}`]}
          onChange={handleSelectionChange}
        >
          {sucursales?.map((item) => (
            <SelectItem key={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </nav>
  )
}

export default Navbar
