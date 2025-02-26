import React, { useContext, useState } from 'react'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    modal
} from '@nextui-org/react'
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IncidenciasContext } from '@/context/IncidenciasContext';
import { changeStatus } from '@/lib/api';
import { Incidencia } from '@/lib/interfaces';
import { showToast } from '../toast/showToast';
import ModalCierre from '../modalCierre/ModalCierre';

interface propsMenuDropDown {
    idIncidencia: number;
    idEmpleadoOpenIncidencia: number;
}
const MenuDropdown = ({ idIncidencia, idEmpleadoOpenIncidencia }: propsMenuDropDown) => {
    const dataUser = useContext(IncidenciasContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    let setIncidencias: ((incidencias: Incidencia[]) => void);
    const arrActualIncidencias = dataUser?.incidencias
    let idUser = 0;
    if (dataUser !== undefined) {
        idUser = dataUser?.userData.id;
        setIncidencias = dataUser?.setIncidencias;

    }
    const changeStatusIncidencia = async (key: number) => {
        let idResuelto = key;
        const response = await changeStatus({
            idIncidencia,
            idStatus: key,
            idUser,
        })

        if (response.status === 200) {
            showToast('Se cambio el estatus de la incidencia', "success", 3000, "top-center")
            if (arrActualIncidencias !== undefined) {
                const newArr = arrActualIncidencias.map(item =>
                    item.idIncidencia === idIncidencia ?
                        { ...item, resuelto: idResuelto } : item
                );
                setIncidencias(newArr);
            }
        } else {
            showToast('Error al cambiar el estado de la incidencia', "error", 3000, "top-center")
        }
    }

    // Función que recibe la información del modal
    // const handleModalSubmit = (data: any) => {
    //     setModalData(data);
    //     console.log("padre data: ", data)
    // };

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
                //onAction={(key) => changeStatusIncidencia(Number(key))}
                >
                    <DropdownItem key={1} onClick={() => changeStatusIncidencia(1)}>
                        Abierta
                    </DropdownItem>
                    <DropdownItem key={2} onClick={() => changeStatusIncidencia(2)}>
                        En Resolución
                    </DropdownItem>
                    {/* <DropdownItem key={4}>
                        Cerrada
                    </DropdownItem> */}
                    <DropdownItem key={4} onClick={() => setIsModalOpen(true)}>
                        Cerrada
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <ModalCierre
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                //onSubmit={handleModalSubmit}
                idUser={idUser}
                idIncidencia={idIncidencia}
                idEmpleadoOpenIncidencia={idEmpleadoOpenIncidencia}
                arrActualIncidencias={arrActualIncidencias}
            />
        </div>
    )
}

export default MenuDropdown
