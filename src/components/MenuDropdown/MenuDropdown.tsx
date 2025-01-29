import React, { useContext } from 'react'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger
} from '@nextui-org/react'
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IncidenciasContext } from '@/context/IncidenciasContext';
import { changeStatus } from '@/lib/api';
import { Incidencia } from '@/lib/interfaces';

interface propsMenuDropDown {
    idIncidencia: number;
}
const MenuDropdown = ({ idIncidencia }: propsMenuDropDown) => {
    const dataUser = useContext(IncidenciasContext);
    let setIncidencias: ((incidencias: Incidencia[]) => void);
    const arrActualIncidencias = dataUser?.incidencias
    let idUser = 0;
    if (dataUser !== undefined) {
        idUser = dataUser?.userData.id;
        setIncidencias = dataUser?.setIncidencias;

    }
    const changeStatusIncidencia = async (key: number) => {
        const response = await changeStatus({
            idIncidencia,
            idStatus: key,
            idUser,
        })

        if (response.status === 200) {
            if (arrActualIncidencias !== undefined) {
                const newArr = arrActualIncidencias.map(item =>
                    item.idIncidencia === idIncidencia ?
                        { ...item, resuelto: key } : item
                );
                setIncidencias(newArr);
            }
        } else {
            console.error('Error al cambiar el estado de la incidencia:', response.error);
            // Manejar el error apropiadamente en caso de que falle la petición.
        }
    }

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
                <DropdownMenu
                    aria-label="Static Actions"
                    onAction={(key) => changeStatusIncidencia(Number(key))}
                >
                    <DropdownItem key={1}>
                        Abierta
                    </DropdownItem>
                    <DropdownItem key={2}>
                        En Resolución
                    </DropdownItem>
                    <DropdownItem key={4}>
                        Cerrada
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default MenuDropdown
