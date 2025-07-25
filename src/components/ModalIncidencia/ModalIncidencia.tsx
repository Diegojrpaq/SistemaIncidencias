import { getDataByGuia, getEscaneo } from "@/lib/api";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Skeleton,
} from "@nextui-org/react";
import { useState } from "react";
import ContainerCards from "./cardsModal/ContainerCards";
import Chat from "../Chat/Chat";
import SkeletonInfoGuia from "../skeleton/skeletonInfoGuia";
import { urlServer } from "@/lib/url";
import { EyeIcon } from "../icons/EyeIcon";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface modalProps {
    numGuia: string;
    textButton: string;
}

const ModalIncidencia = ({ numGuia, textButton }: modalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [inc, setInc] = useState();
    const [statusRes, setStatusRes] = useState();
    const [chatData, setChatData] = useState();
    const [detalleEscaneo, setDetalleEscaneo] = useState();

    const getData = async () => {
        const { status, ...dataIncidencia } = await getDataByGuia(`${urlServer}/Incidencias/validacionGuia`, `${numGuia}`);
        const dataEscaneo = await getEscaneo(numGuia);
        setDetalleEscaneo(dataEscaneo.scanDto)
        setInc(dataIncidencia)
        setStatusRes(status)
        setChatData(dataIncidencia.chatData)
    }

    return (
        <>
            {
                textButton === "Ver mas" ?
                    <Button
                        onPress={() => { onOpen(); getData() }}
                        variant='bordered'
                        size='md'
                    >
                        {textButton}
                    </Button> :
                    <EyeIcon onClick={() => { onOpen(); getData() }} />
            }
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
                            <ToastContainer position='bottom-center' autoClose={3000} />
                            <ModalHeader className="flex">Detalles</ModalHeader>
                            <ModalBody className="flex justify-center items-center">
                                <div className="w-full flex">
                                    {/* Sección izquierda - Información */}
                                    {
                                        inc && statusRes === 200 ?
                                            <div className="w-2/3 max-h-[700px] overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                                                <ContainerCards
                                                    incidencia={inc}
                                                    chatData={chatData}
                                                    detalleEscaneo={detalleEscaneo}
                                                />
                                            </div>
                                            : statusRes === 204 ?
                                                <div className="text-lg text-center w-96">
                                                    No existe la guía
                                                </div>
                                                :
                                                <div className="w-2/3 max-h-[700px] overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                                                    <SkeletonInfoGuia />
                                                </div>

                                    }
                                    {/* Sección derecha - Chat */}
                                    {
                                        inc && statusRes === 200 ?
                                            <Chat chatData={chatData} />
                                            : statusRes === 204 ?
                                                <div className="w-1/2 text-lg text-center w-full">
                                                    No existe información del chat
                                                </div> :
                                                <>
                                                    <div className="w-1/3 max-h-[700px] rounded-lg">
                                                        <Skeleton className="h-full w-full rounded-md" />
                                                    </div>
                                                </>
                                    }
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
