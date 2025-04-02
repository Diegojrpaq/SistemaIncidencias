import React, { useContext, useState } from 'react';
import {
    dataFocusVisibleClasses,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IncidenciasContext } from '@/context/IncidenciasContext';
import { changeStatus, getDataByGuia, getUserSession } from '@/lib/api';
import { Incidencia, Permiso } from '@/lib/interfaces';
import { showToast } from '../toast/showToast';
import ModalCierre from '../modalCierre/ModalCierre';
import ModalCalificacion from '../modalCierreCalificacion/modalcierreCalificacion';
import { urlServer } from '@/lib/url';

interface propsMenuDropDown {
    idIncidencia: number;
    idEmpleadoOpenIncidencia: number;
    numGuia: string;
}

const MenuDropdown = ({
    idIncidencia,
    idEmpleadoOpenIncidencia,
    numGuia
}: propsMenuDropDown) => {
    const dataUser = useContext(IncidenciasContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chatDataId, setChatDataId] = useState(0);
    const arrActualIncidencias = dataUser?.incidencias;
    let setIncidencias: ((incidencias: Incidencia[]) => void);
    let idUser = 0;
    let userPermisos;

    if (dataUser !== undefined) {
        idUser = dataUser?.userData.id;
        setIncidencias = dataUser?.setIncidencias;
        userPermisos = dataUser?.userData?.permisos
    }


    const hasPermission = userPermisos?.some(p => p.id === 43 || p.id === 44)
    /* let isAdmin : Permiso[] | undefined
    isAdmin= userPermisos.find(objeto => objeto.id === 43); */

  console.log(userPermisos)



    const changeStatusIncidencia = async (key: number) => {
        let idResuelto = key;
        const response = await changeStatus({
            idIncidencia,
            idStatus: key,
            idUser,
            idSucursal: 0,
            idDestino: 0,
            idSucursalResponsable: 0,
            idTipoIncidencia: 0,
        });

        if (response.status === 200) {
            showToast(
                'Se cambió el estatus de la incidencia',
                "success",
                3000,
                "top-center"
            );
            if (arrActualIncidencias !== undefined) {
                const newArr = arrActualIncidencias.map(item =>
                    item.idIncidencia === idIncidencia ?
                        { ...item, resuelto: idResuelto } : item
                );
                setIncidencias(newArr);
            }
        } else {
            showToast(
                'Error al cambiar el estado de la incidencia',
                "error",
                3000,
                "top-center"
            );
        }
    };

    const getDataChat = async () => {
        const { status, ...dataIncidencia } = await getDataByGuia(
            `${urlServer}/Incidencias/validacionGuia`,
            `${numGuia}`
        );
        setChatDataId(dataIncidencia.chatData.idChat);
    };

    return (
        <div>
            <Dropdown size='sm'>
                <DropdownTrigger>
                    <div className='flex'>
                        <IoEllipsisHorizontal size={25} />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Acciones">
                    <DropdownItem
                        key={1}
                        onClick={() => changeStatusIncidencia(1)}
                    >
                        Abierta
                    </DropdownItem>
                    <DropdownItem
                        key={2}
                        onClick={() => changeStatusIncidencia(2)}
                    >
                        En Resolución
                    </DropdownItem>
                    <DropdownItem
                        key={4}
                        onClick={() => {
                            setIsModalOpen(true);
                            getDataChat();
                        }}
                    >
                        Cerrada
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            {/* Modal de Calificación o Cierre según el rol del usuario */}
            {hasPermission ? (
                <ModalCalificacion
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    idIncidencia={idIncidencia}
                    idEmpleadoOpenIncidencia={idEmpleadoOpenIncidencia}
                    arrActualIncidencias={arrActualIncidencias}
                    idChat={chatDataId}
                />
            ) : (
                <ModalCierre
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    idIncidencia={idIncidencia}
                    idEmpleadoOpenIncidencia={idEmpleadoOpenIncidencia}
                    arrActualIncidencias={arrActualIncidencias}
                    idChat={chatDataId}
                />
            )}
        </div>
    );
}

export default MenuDropdown;
