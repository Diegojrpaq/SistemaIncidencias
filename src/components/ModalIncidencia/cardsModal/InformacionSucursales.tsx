import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Divider
} from "@nextui-org/react"
import SelectSucursalAsociada from "@/components/select/SelectSucursalAsociada"
import TableSucursales from "@/components/table/TableSucursales"
import {
    chatData,
    IncidenciaDataModal,
    SucursalChat
} from "@/lib/interfaces";
import { getAllSucursales } from "@/lib/api";



interface infoSucursalesProps {
    incidencia: IncidenciaDataModal;
    chatData: chatData | undefined;
}

function InformacionSucursales({
    incidencia,
    chatData,
}: infoSucursalesProps) {
    const [listSucursales, setListSucursales] = useState<SucursalChat[] | undefined>(chatData?.listSucursales);
    const [sucursalesCombo, setSucursalesCombo] = useState<any[]>([]);
    let sucursalesArr: any[];
    useEffect(() => {
        const getSucursales = async () => {
            const sucursales = await getAllSucursales();
            if (sucursales.status === 200) {
                sucursalesArr = sucursales.Sucursales.map((suc: any) => ({
                    key: suc.id,
                    label: suc.nombre,
                }));
                setSucursalesCombo(sucursalesArr)
            }
        }

        getSucursales();
    }, []);
    return (
        <Card>
            <CardHeader className="flex gap-3">
                <div className="flex w-full justify-between items-center gap-2 ml-3">
                    <p className="text-lg">Información Sucursales</p>
                    <SelectSucursalAsociada
                        idChat={chatData?.idChat}
                        sucursalesState={listSucursales}
                        setSucursales={setListSucursales}
                        numGuia={incidencia.numGuia}
                        sucursalCombo={sucursalesCombo}
                    />
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <TableSucursales sucursales={listSucursales} />
            </CardBody>
        </Card>
    )
}

export default InformacionSucursales
