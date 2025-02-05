import {
    chatData,
    escaneoData,
    IncidenciaDataModal,
    scanDto,
    SucursalChat
} from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";
import {
    Card,
    CardHeader,
    Divider,
    CardBody,
    Image,
    Chip
} from "@nextui-org/react";
import TableSucursales from "../table/TableSucursales";
import SelectSucursalAsociada from "../select/SelectSucursalAsociada";
import { useState } from "react";
import TableDetalleEscaneo from "../table/TableDetalleEscaneo";

interface infoGuiaProps {
    incidencia: IncidenciaDataModal;
    chatData: chatData | undefined;
    detalleEscaneo: scanDto | undefined;
}

const InfoGuia = ({
    incidencia,
    chatData,
    detalleEscaneo
}: infoGuiaProps) => {
    const [listSucursales, setListSucursales] = useState<SucursalChat[] | undefined>(chatData?.listSucursales);
    let arrEscaneo: escaneoData[] | undefined;
    if (detalleEscaneo?.escaneo) {
        arrEscaneo = detalleEscaneo.escaneo
    } else {
        arrEscaneo = []
    }
    return (
        <div className="flex flex-col gap-3 p-4">
            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex items-center gap-2 ml-3">
                        <p className="text-lg">Información de la guía</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="grid grid-cols-2 gap-5 p-2">
                        <div className="flex flex-col gap-2">
                            <div><Chip size="lg" radius="sm">NumGuia:</Chip> {incidencia.numGuia}</div>
                            <div><Chip size="lg" radius="sm">Origen:</Chip> {incidencia.origen}</div>
                            <div><Chip size="lg" radius="sm">Destino:</Chip> {incidencia.destino}</div>
                            <div><Chip size="lg" radius="sm">Cliente Origen:</Chip> {incidencia.clienteOrigenNombre}</div>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <div><Chip size="lg" radius="sm">Volumen:</Chip> {incidencia.volumen} mt3</div>
                            <div><Chip size="lg" radius="sm">Peso:</Chip> {incidencia.peso} kg</div>
                            <div><Chip size="lg" radius="sm">Cantidad:</Chip> {incidencia.cantidad}</div>
                            <div><Chip size="lg" radius="sm">Cliente Destino:</Chip> {incidencia.clienteDestinoNombre}</div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex items-center gap-2 ml-3">
                        <p className="text-lg">Información de la incidencia</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="grid grid-cols-auto">
                        <div className="flex flex-col gap-2 p-2">
                            <div><Chip size="lg" radius="sm">Motivo incidencia:</Chip> {incidencia.descripcion}</div>
                            <div><Chip size="lg" radius="sm">Sucursal:</Chip> {incidencia.suc_genera_incidencia}</div>
                            <div><Chip size="lg" radius="sm">Creada por:</Chip> {incidencia.empleado_registra}</div>
                            <div><Chip size="lg" radius="sm">Registro incidencia:</Chip> {formatDate(incidencia.fecha_registro_incidencia)}</div>
                            <div><Chip size="lg" radius="sm">Descripcion:</Chip> {incidencia.nota}</div>
                            <div><Chip size="lg" radius="sm">Status:</Chip> {
                                `${incidencia.incidencia === 1 ? 'Abierta'
                                    : ''}`
                            }</div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex items-center gap-2 ml-3">
                        <p className="text-lg">Evidencia</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex justify-center w-full items-center">
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Image
                                width={200}
                                alt="NextUI hero Image"
                                src="https://nextui.org/images/hero-card-complete.jpeg"
                            />
                            <Image
                                width={200}
                                src="https://app.requestly.io/delay/1000/https://nextui.org/images/fruit-4.jpeg"
                                fallbackSrc="https://via.placeholder.com/300x200"
                                alt="NextUI Image with fallback"
                            />
                            <Image
                                width={200}
                                alt="NextUI hero Image"
                                src="https://nextui.org/images/hero-card-complete.jpeg"
                            />
                            <Image
                                width={200}
                                alt="NextUI hero Image"
                                src="https://nextui.org/images/hero-card-complete.jpeg"
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex w-full justify-between items-center gap-2 ml-3">
                        <p className="text-lg">Información Sucursales</p>
                        <SelectSucursalAsociada
                            idChat={chatData?.idChat}
                            sucursalesState={listSucursales}
                            setSucursales={setListSucursales}
                            numGuia={incidencia.numGuia}
                        />
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <TableSucursales sucursales={listSucursales} />
                </CardBody>
            </Card>

            <Card>
                <CardHeader className="flex">
                    <div className="flex items-center justify-center ml-3">
                        <p className="text-lg">Detalle Escaneo</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <TableDetalleEscaneo arrEscaneo={arrEscaneo} />
                </CardBody>
            </Card>
        </div>
    )
}

export default InfoGuia
