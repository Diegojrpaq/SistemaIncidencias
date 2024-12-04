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
    Spinner, Skeleton
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import ContentModal from "../ContentModal/ContentModal";
import InfoGuia from "../infoGuia/InfoGuia";
import Chat from "../Chat/Chat";
import SkeletonInfoGuia from "../skeleton/skeletonInfoGuia";

interface modalProps {
    incidencia: Incidencia
}

const ModalIncidencia = ({ incidencia }: modalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [inc, setInc] = useState();
    const [statusRes, setStatusRes] = useState();
    //Estado del skeleton
    const [isLoaded, setIsLoaded] = useState(false);

    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    };

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
                className="max-h-[800px] w-full
                    scrollbar-hide lg:min-w-[1300px]"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex">Detalles</ModalHeader>
                            <ModalBody className="flex justify-center items-center">
                                <div className="flex">
                                    {/* Sección izquierda - Información */}
                                    <div className="w-2/3 max-h-[700px] overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                                        {
                                            inc && statusRes === 200 ?
                                                <InfoGuia incidencia={inc} />
                                                : statusRes === 204 ?
                                                    <div className="text-lg text-left w-96">
                                                        No existe la guía
                                                    </div>
                                                    :
                                                    <SkeletonInfoGuia />
                                        }
                                    </div>
                                    {/* Sección derecha - Chat */}
                                    <div className="w-1/3  max-h-[700px] overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                                        {
                                            inc && statusRes === 200 ?
                                                <Chat />
                                                : statusRes === 204 ?
                                                    <div className="text-lg text-left w-96">
                                                        No existe información del chat
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="h-screen shadow-lg">
                                                            <Skeleton className="h-screen w-full rounded-md" />
                                                        </div>
                                                    </>
                                        }
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalIncidencia
