import React, { useContext } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { IncidenciasContext } from "@/context/IncidenciasContext";
import { addSucursalIncidencia, getDataByGuia } from "@/lib/api";
import { SucursalChat } from "@/lib/interfaces";
import { urlServer } from "@/lib/url";
import { showToast } from "../toast/showToast";
import { FaCheck } from "react-icons/fa6";

interface PropsSelectSucursal {
    idChat: number | undefined;
    sucursalesState: SucursalChat[] | undefined;
    setSucursales: (listSucursales: SucursalChat[]) => void;
    numGuia: string;
    sucursalCombo: any[];
}

export default function SelectSucursalAsociada({
    idChat,
    setSucursales,
    numGuia,
    sucursalCombo
}: PropsSelectSucursal) {
    const [idSucursal, setIdSucursal] = React.useState(-1);
    const dataUser = useContext(IncidenciasContext);
    const userData = dataUser?.userData;
    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIdSucursal(Number(e.target.value));
    };

    const addSucursal = async (
        idSucursal: number,
        idChat: number | undefined,
        idUsuario: number | undefined
    ) => {
        if (idSucursal === -1 || idSucursal === 0) {
            showToast(
                'No se ha seleccionado ninguna sucursal',
                'info',
                3000,
                "bottom-center"
            )
            return;
        }

        // Enviar el Id de la sucursal al back-end para agregarlo
        const response = await addSucursalIncidencia(idSucursal, idChat, idUsuario);
        if (response.status === 200) {
            const getNewSucursales = await getDataByGuia(
                `${urlServer}/Incidencias/validacionGuia`,
                `${numGuia}`
            );
            if (getNewSucursales.status === 200) {
                setSucursales(getNewSucursales.chatData.listSucursales);
            }
            //Mandar notificación
            const info: string = response.data.answerinfo;
            if (info.includes("0")) {
                showToast(
                    'Se elimino la sucursal',
                    'error',
                    3000,
                    "bottom-center"
                )
            } else if (info.includes("1")) {
                showToast(response.message, 'success', 3000, "bottom-center")
            }

        } else {
            //Mandar notificación
            showToast(
                response.message,
                'error',
                3000,
                "bottom-center"
            )
        }
    }
    return (
        <div className="flex w-full max-w-xs items-center gap-2">
            <Select
                value={idSucursal}
                size="sm"
                className="max-w-xs"
                //defaultSelectedKeys={["cat"]}
                label="Agregar sucursal"
                placeholder="Selecciona una sucursal"
                onChange={handleSelectionChange}
            >
                {sucursalCombo.map((sucursal) => (
                    <SelectItem key={sucursal.key}>
                        {sucursal.label}
                    </SelectItem>
                ))}
            </Select>
            <Button
                onPress={() => addSucursal(idSucursal, idChat, userData?.id)}
            >
                <FaCheck size={18} />
            </Button>
        </div>
    );
}