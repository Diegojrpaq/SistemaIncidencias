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
    Skeleton,
    Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import ContentModal from "../ContentModal/ContentModal";
import InfoGuia from "../infoGuia/InfoGuia";
import Chat from "../Chat/Chat";
import SkeletonInfoGuia from "../skeleton/skeletonInfoGuia";
import { IoSendSharp } from "react-icons/io5";
interface modalProps {
    incidencia: Incidencia
}

const ModalIncidencia = ({ incidencia }: modalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [inc, setInc] = useState();
    const [statusRes, setStatusRes] = useState();
    //Estado del skeleton
    const [valueMsg, setValueMsg] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValueMsg(e.target.value);
    };

    // Manejador de envío
    const handleSend = () => {
        if (valueMsg.trim()) {
            console.log("Texto enviado:", valueMsg); // Enivar texto
            setValueMsg(""); // Limpia el input
        }
    };

    // Manejador para Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
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
                                    {/* <div className="w-2/3 max-h-[700px] overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
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
                                    </div> */}

                                    {
                                        inc && statusRes === 200 ?
                                            <div className="w-2/3 max-h-[700px] overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                                                <InfoGuia incidencia={inc} />
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
                                            <div className="w-1/3 max-h-[700px] flex flex-col bg-gray-200 shadow-lg rounded-lg p-2">
                                                <h3>Comentarios</h3>
                                                <div className="overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                                                    <Chat />
                                                </div>
                                                <div className="">
                                                    <Input
                                                        value={valueMsg}
                                                        type="text"
                                                        placeholder="Send a message"
                                                        className=""
                                                        size="lg"
                                                        onChange={handleInputChange}
                                                        endContent={
                                                            <div
                                                                className={`
                                                                    cursor-pointer
                                                                    
                                                                `}
                                                                onClick={handleSend}
                                                            >
                                                                <IoSendSharp />
                                                            </div>
                                                        }
                                                        onKeyDown={handleKeyDown}
                                                    />
                                                </div>
                                            </div>
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
                                    {/* <div className="w-1/3 max-h-[700px] flex flex-col bg-gray-200 shadow-lg rounded-lg p-2">
                                        {
                                            inc && statusRes === 200 ?
                                                <>
                                                    <h3>Chat</h3>
                                                    <div className="overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                                                        <Chat />
                                                    </div>
                                                    <div>Send message</div>
                                                </> : statusRes === 204 ?
                                                    <div className="text-lg text-left w-96">
                                                        No existe información del chat
                                                    </div> :
                                                    <>
                                                        <div className="h-full">
                                                            <Skeleton className="h-full w-full rounded-md bg-transparent" />
                                                        </div>
                                                    </>

                                        } */}
                                    {/* <h3>Chat</h3>
                                        <div className="overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
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
                                        <div>Send message</div> */}
                                    {/* </div> */}
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
