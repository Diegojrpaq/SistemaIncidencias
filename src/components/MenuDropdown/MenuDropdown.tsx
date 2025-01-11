import React from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { IoEllipsisHorizontal } from "react-icons/io5";
const MenuDropdown = () => {
    return (
        <div>
            <Dropdown
                className=''
                size='sm'
            >
                <DropdownTrigger>
                    <div className='flex'>
                        <IoEllipsisHorizontal size={25} />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="abierta">Abierta</DropdownItem>
                    <DropdownItem key="resolucion">En Resolución</DropdownItem>
                    <DropdownItem key="cerrada">Cerrada</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default MenuDropdown
