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
    Image,
    Spinner
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import ContentModal from "../ContentModal/ContentModal";
import InfoGuia from "../infoGuia/InfoGuia";
import Chat from "../Chat/Chat";

interface modalProps {
    incidencia: Incidencia
}

const ModalIncidencia = ({ incidencia }: modalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [inc, setInc] = useState();
    const [statusRes, setStatusRes] = useState();
    const getData = async () => {
        const { status, ...dataIncidencia } = await getDataByGuia('http://192.168.10.137/Incidencias/validacionGuia', `${incidencia.numGuia}`);
        setInc(dataIncidencia)
        setStatusRes(status)
        console.log(status)
        //console.log(dataIncidencia)
    }
    return (
        <>
            <Button
                onPress={() => { onOpen(); getData() }}
                variant='bordered'
                size='md'
            >
                Ver mas
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="5xl"
                className="max-h-[800px] w-full overflow-y-scroll
                    scrollbar-hide min-w-[800px]"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex">Detalles</ModalHeader>
                            <ModalBody className="flex justify-center items-center">
                                {/* <ContentModal incidencia={incidencia} /> */}
                                <div className="flex">
                                    {/* Sección izquierda - Información */}

                                    <div className="w-2/3 h-96 overflow-y-auto p-4">
                                        {
                                            inc && statusRes === 200 ?
                                                <InfoGuia incidencia={inc} />
                                                : <Spinner />
                                        }
                                    </div>


                                    {/* Sección derecha - Chat */}
                                    <div className="w-1/3 h-96 overflow-y-auto p-4">
                                        {
                                            inc && statusRes === 200 ?
                                                <Chat />
                                                : <Spinner />
                                        }
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
