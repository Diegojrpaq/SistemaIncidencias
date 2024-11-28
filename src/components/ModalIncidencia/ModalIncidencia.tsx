import { getDataByGuia } from "@/lib/api";
import { Incidencia } from "@/lib/interfaces";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Card,
    CardHeader,
    Divider,
    CardBody,
    Image
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import ContentModal from "../ContentModal/ContentModal";
import InfoGuia from "../infoGuia/InfoGuia";

interface modalProps {
    incidencia: Incidencia
}

const ModalIncidencia = ({ incidencia }: modalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [inc, setInc] = useState();


    useEffect(() => {
        const getData = async () => {
            const res = await getDataByGuia('http://192.168.10.137/Incidencias/validacionGuia', `${incidencia.numGuia}`);
            setInc(res)
        }

        getData();
    }, [])

    console.log("Modal post:", inc)
    //setInc(res);
    return (
        <>
            <Button
                onPress={onOpen}
                variant='bordered'
                size='md'
            >
                Ver mas
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="5xl"
                className="max-h-[700px] w-full overflow-y-scroll
                    scrollbar-hide min-w-[800px]"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalles</ModalHeader>
                            <ModalBody>
                                {/* <ContentModal incidencia={incidencia} /> */}
                                <div className="flex">
                                    {/* Sección izquierda - Información */}
                                    <div className="w-2/3 h-96 overflow-y-auto p-4">
                                        {/* Aquí va tu contenido de la izquierda */}
                                        {/* <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p>
                                        <p>Contenido de la información...</p> */}
                                        <InfoGuia incidencia={incidencia} />
                                    </div>

                                    {/* Sección derecha - Chat */}
                                    <div className="w-1/3 h-96 overflow-y-auto p-4">
                                        {/* Aquí va tu contenido de chat */}
                                        <div>Chat...</div>
                                        <div>Mensaje 1</div>
                                        <div>Mensaje 2</div>
                                        <div>Mensaje 3</div>
                                        <div>Mensaje 4</div>
                                        <div>Mensaje 1</div>
                                        <div>Mensaje 2</div>
                                        <div>Mensaje 3</div>
                                        <div>Mensaje 4</div>
                                        <div>Mensaje 1</div>
                                        <div>Mensaje 2</div>
                                        <div>Mensaje 3</div>
                                        <div>Mensaje 4</div>
                                        <div>Mensaje 1</div>
                                        <div>Mensaje 2</div>
                                        <div>Mensaje 3</div>
                                        <div>Mensaje 4</div>
                                        <div>Mensaje 1</div>
                                        <div>Mensaje 2</div>
                                        <div>Mensaje 3</div>
                                        <div>Mensaje 4</div>
                                        {/* Continúa el contenido... */}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalIncidencia
