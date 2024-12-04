import { Incidencia } from "@/lib/interfaces";
import {
    Card,
    CardHeader,
    Divider,
    CardBody,
    Image
} from "@nextui-org/react";

interface contentModalProps {
    incidencia: Incidencia
}

const ContentModal = ({ incidencia }: contentModalProps) => {
    return (
        <div>
            <div className="flex w-full gap-1">
                <div className="flex flex-col gap-3 
                    w-2/3 p-4 overflow-y-scroll"
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
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p>numGuia: {incidencia.numGuia}</p>
                                    <p>origen: {incidencia.origen}</p>
                                    <p>destino: {incidencia.destino}</p>
                                    <p>cliente origen: {incidencia.clienteOrigenNombre}</p>
                                </div>
                                <div>
                                    <p>volumen: {incidencia.volumen}</p>
                                    <p>peso: {incidencia.peso}</p>
                                    <p>cantidad: {incidencia.cantidad}</p>
                                    <p>cliente destino: {incidencia.clienteDestinoNombre}</p>
                                </div>
                            </div>
                        </CardBody>

                    </Card>
                    {/* <div className="bg-white rounded-md p-3">
                                            info incidencia
                                            Motivo incidencia:
                                            Creada por:
                                            status:
                                        </div> */}
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
                                <div>
                                    <p>Motivo incidencia: {incidencia.nota}</p>
                                    <p>Creada por: {incidencia.empleadoNombre}</p>
                                    <p>status: {
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

                {/* <div className="bg-gray-200 w-1/3 p-4 rounded-lg shadow-lg">
                    Hoolichat
                </div> */}
            </div>
        </div>
    )
}

export default ContentModal
