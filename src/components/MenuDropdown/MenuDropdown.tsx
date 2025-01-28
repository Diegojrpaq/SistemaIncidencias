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

interface propsMenuDropDown {
    idIncidencia: number;
}
const MenuDropdown = ({ idIncidencia }: propsMenuDropDown) => {
    const dataUser = useContext(IncidenciasContext);
    let idUser = 0;
    if(dataUser !== undefined) {
        idUser = dataUser?.userData.id;
    }
    const changeStatusIncidencia = async (key: number) => {
        const response = await changeStatus({
            idIncidencia,
            idStatus: key,
            idUser,
        })
        console.log("RES ", response)
        if(response.status === 200) {
            console.log("Status cambiado ", response.incidencia.newStatus)
            // Actualizar lista de incidencias
            // const getIncidencias = await getIncidencias();
            // if(getIncidencias.status === 200) {
            //     setIncidencias(getIncidencias.data);
            // }
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
