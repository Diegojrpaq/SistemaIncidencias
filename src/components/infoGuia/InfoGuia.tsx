import { chatData, IncidenciaDataModal } from "@/lib/interfaces";
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

interface infoGuiaProps {
    incidencia: IncidenciaDataModal;
    chatData: chatData | undefined;
}

const InfoGuia = ({incidencia, chatData}: infoGuiaProps) => {
  return (
<div className="flex flex-col gap-3 
            p-4"
                >

                    <Card>
                        <CardHeader className="flex gap-3">
                            <div className="flex items-center gap-2 ml-3">
                                <p className="text-lg">Información de la guía</p>
                                {/* <p className="text-md text-default-500">asdf</p> */}
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="grid grid-cols-2 gap-5 p-2">
                                <div className="flex flex-col gap-2">
                                    <p><Chip size="lg" radius="sm">NumGuia:</Chip> {incidencia.numGuia}</p>
                                    <p><Chip size="lg" radius="sm">Origen:</Chip> {incidencia.origen}</p>
                                    <p><Chip size="lg" radius="sm">Destino:</Chip> {incidencia.destino}</p>
                                    <p><Chip size="lg" radius="sm">Cliente Origen:</Chip> {incidencia.clienteOrigenNombre}</p>
                                </div>
                                <div className="flex flex-col gap-2 ">
                                    <p><Chip size="lg" radius="sm">Volumen:</Chip> {incidencia.volumen} mt3</p>
                                    <p><Chip size="lg" radius="sm">Peso:</Chip> {incidencia.peso} kg</p>
                                    <p><Chip size="lg" radius="sm">Cantidad:</Chip> {incidencia.cantidad}</p>
                                    <p><Chip size="lg" radius="sm">Cliente Destino:</Chip> {incidencia.clienteDestinoNombre}</p>
                                </div>
                            </div>
                        </CardBody>

                    </Card>
                    
                    <Card>
                        <CardHeader className="flex gap-3">

                            <div className="flex items-center gap-2 ml-3">
                                <p className="text-lg">Información de la incidencia</p>
                                {/* <p className="text-md text-default-500">asdf</p> */}
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="grid grid-cols-auto">
                                <div className="flex flex-col gap-2 p-2">
                                    <p><Chip size="lg" radius="sm">Motivo incidencia:</Chip> {incidencia.descripcion}</p>
                                    <p><Chip size="lg" radius="sm">Sucursal:</Chip> {incidencia.suc_genera_incidencia}</p>
                                    <p><Chip size="lg" radius="sm">Creada por:</Chip> {incidencia.empleado_registra}</p>
                                    <p><Chip size="lg" radius="sm">Registro incidencia:</Chip> {formatDate(incidencia.fecha_registro_incidencia)}</p>
                                    <p><Chip size="lg" radius="sm">Descripcion:</Chip> {incidencia.nota}</p>
                                    <p><Chip size="lg" radius="sm">Status:</Chip> {
                                        `${incidencia.incidencia === 1 ? 'Abierta'
                                            : ''}`
                                    }</p>
                                </div>
                            </div>
                        </CardBody>

                    </Card>


                    <Card>
                        <CardHeader className="flex gap-3">

                            <div className="flex items-center gap-2 ml-3">
                                <p className="text-lg">Evidencia</p>
                                {/* <p className="text-md text-default-500">asdf</p> */}
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
                                        // height={200}
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
                            <div className="flex items-center gap-2 ml-3">
                                <p className="text-lg">Información Sucursales</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <TableSucursales sucursales={chatData?.listSucursales}/>
                        </CardBody>

                    </Card>
                </div>
  )
}

export default InfoGuia
