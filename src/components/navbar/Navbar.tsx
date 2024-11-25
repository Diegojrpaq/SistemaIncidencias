import React from 'react'
import {Select, SelectItem} from "@nextui-org/react";
const Navbar = () => {
    const destinos = [
        {key: 1, label: 'Guadalajara'},
        {key: 2, label: 'Monterrey'},
        {key: 3, label: 'Puebla'},
        {key: 4, label: 'Tijuana'},
        {key: 5, label: 'Veracruz'},
        {key: 6, label: 'Zacatecas'}
    ]
  return (
    <nav className={
        `
        flex w-full justify-between
        items-center p-4 border-b
        border-b-gray-300 max-h-20
        `
    }>
        <div className='md:w-full'>
            Destino: Guadalajara
        </div>

        <div className='w-full'>
        <Select 
        label="Selecciona un destino" 
        className="max-w-xs" 
        size='sm'
      >
        {destinos.map((destino) => (
          <SelectItem key={destino.key}>
            {destino.label}
          </SelectItem>
        ))}
      </Select>
        </div>
    </nav>
  )
}

export default Navbar
