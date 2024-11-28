import { IncidenciaDataModal } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";
import {
    Card,
    CardHeader,
    Divider,
    CardBody,
    Image
} from "@nextui-org/react";

interface infoGuiaProps {
    incidencia: IncidenciaDataModal
}

const InfoGuia = ({incidencia}: infoGuiaProps) => {
  return (
<div className="flex flex-col gap-3 
            p-4"
                >

                    <Card>
                        <CardHeader className="flex gap-3">
                            <div className="flex items-center gap-2">
                                <p className="text-md">Información de la guía</p>
                                {/* <p className="text-md text-default-500">asdf</p> */}
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="grid grid-cols-2 gap-5 p-2">
                                <div className="flex flex-col gap-2">
                                    <p>numGuia: {incidencia.numGuia}</p>
                                    <p>origen: {incidencia.origen}</p>
                                    <p>destino: {incidencia.destino}</p>
                                    <p>cliente origen: {incidencia.clienteOrigenNombre}</p>
                                </div>
                                <div className="flex flex-col gap-2 ">
                                    <p>volumen: {incidencia.volumen}</p>
                                    <p>peso: {incidencia.peso}</p>
                                    <p>cantidad: {incidencia.cantidad}</p>
                                    <p>cliente destino: {incidencia.clienteDestinoNombre}</p>
                                </div>
                            </div>
                        </CardBody>

                    </Card>
                    
                    <Card>
                        <CardHeader className="flex gap-3">

                            <div className="flex items-center gap-2">
                                <p className="text-md">Información de la incidencia</p>
                                {/* <p className="text-md text-default-500">asdf</p> */}
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="grid grid-cols-auto">
                                <div className="flex flex-col gap-2 p-2">
                                    <p>Motivo incidencia: {incidencia.descripcion}</p>
                                    <p>Sucursal: {incidencia.sucursal_incidencia}</p>
                                    <p>Creada por: {incidencia.empleado_registra}</p>
                                    <p>Registro incidencia: {formatDate(incidencia.fecha_registro_incidencia)}</p>
                                    <p>Descripcion: {incidencia.nota}</p>
                                    <p>Status: {
                                        `${incidencia.incidencia === 1 ? 'abierta'
                                            : ''}`
                                    }</p>
                                </div>
                            </div>
                        </CardBody>

                    </Card>


                    <Card>
                        <CardHeader className="flex gap-3">

                            <div className="flex items-center gap-2">
                                <p className="text-md">Evidencia</p>
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
                </div>
  )
}

export default InfoGuia
