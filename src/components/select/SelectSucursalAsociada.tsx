import React, { useContext } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { IncidenciasContext } from "@/context/IncidenciasContext";
import { addSucursalIncidencia, getDataByGuia } from "@/lib/api";
import { SucursalChat } from "@/lib/interfaces";
import { urlServer } from "@/lib/url";

export const sucursales = [
    { key: 1, label: "Gonzales Gallo" },
    { key: 2, label: "Vallejo" },
    { key: 3, label: "Pablo Valdez" },
    { key: 4, label: "Zapopan" },
    { key: 5, label: "Perisur" },
];

interface PropsSelectSucursal {
    idChat: number | undefined;
    sucursalesState: SucursalChat[] | undefined;
    setSucursales: (listSucursales: SucursalChat[]) => void;
    numGuia: string;
}

export default function SelectSucursalAsociada({idChat, sucursalesState, setSucursales, numGuia} : PropsSelectSucursal) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [idSucursal, setIdSucursal] = React.useState(-1);
    const dataUser = useContext(IncidenciasContext);
    const userData = dataUser?.userData;
    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIdSucursal(Number(e.target.value));
    };

    const addSucursal = async (idSucursal: number, idChat: number | undefined, idUsuario: number | undefined) => {
        if(idSucursal === -1) {
            console.log("No se ha seleccionado ninguna sucursal");
            return;
        }

        // Enviar el Id de la sucursal al back-end para agregarlo
        console.log("Send Id: ", {idSucursal, idChat, idUsuario});
        const response = await addSucursalIncidencia(idSucursal, idChat, idUsuario);
        if(response.status === 200) {
            const getNewSucursales = await getDataByGuia(`${urlServer}/Incidencias/validacionGuia`, `${numGuia}`);
            console.log("New ",getNewSucursales)
            if(getNewSucursales.status === 200) {
                setSucursales(getNewSucursales.chatData.listSucursales);
                
            }
            //Mandar notificación
            console.log("Good: ", response.message);
        } else {
             //Mandar notificación
            console.log("Not good: ", response.message);
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
                {sucursales.map((sucursal) => (
                    <SelectItem key={sucursal.key}>{sucursal.label}</SelectItem>
                ))}
            </Select>
            <Button
                onPress={() => addSucursal(idSucursal, idChat, userData?.id)}
            >
                Agregar
            </Button>
        </div>
    );
}