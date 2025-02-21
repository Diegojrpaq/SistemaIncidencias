import { IncidenciasContext } from '@/context/IncidenciasContext';
import { sendMessage } from '@/lib/api';
import { chatData } from '@/lib/interfaces';
import { getDateAndTimeFormat } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import {
    useContext,
    useEffect,
    useState,
} from 'react'
import { IoSendSharp } from "react-icons/io5";
import UploadFile from '../uploadFile/UploadFile';

interface dataMessage {
    body: string;
    from: string | undefined;
    createdAt: string;
}

interface propsChat {
    chatData: chatData | undefined;
}
const Chat = ({ chatData }: propsChat) => {
    const dataUserAndIncidencias = useContext(IncidenciasContext);
    const userData = dataUserAndIncidencias?.userData;
    const [messages, setMessages] = useState<dataMessage[]>([]);
    const [valueMsg, setValueMsg] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        setMessages(
            chatData !== undefined ? chatData?.listMensajes?.map(item => ({
                body: item.mensaje,
                from: item.user,
                createdAt: getDateAndTimeFormat(item.fechaRegistro),
            }))
                : []
        )
    }, [chatData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValueMsg(e.target.value);
    };

    // Manejador de envío
    const handleSend = async () => {
        if (valueMsg.trim()) {
            const fechaHoy = new Date();
            //Crear nuevo mensaje
            const newMsg = {
                body: valueMsg,
                from: userData?.nombre,
                createdAt: getDateAndTimeFormat(fechaHoy),
            }

            const sendDataMsg = {
                idChat: chatData?.idChat,
                idUser: userData?.id,
                msgText: valueMsg,
            }
            //Guardar mensaje API
            const sendMsg = await sendMessage(sendDataMsg)

            /*Si se guardo correctamente en BD, se renderizara en el chat, 
            si hay error aparecera aviso de error.*/
            if (sendMsg.status === 200) {
                if (messages === undefined) {
                    setMessages([newMsg]);
                    setValueMsg("");
                } else {
                    setMessages([...messages, newMsg]);
                    setValueMsg("");
                }
            } else {
                console.log('Error al guardar mensaje')
            }
        }
    };

    // Manejador para Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = async (file: File) => {
        setSelectedFile(file);
        console.log("Archivo seleccionado: ", file.name)
        // const formData = new FormData();
        // formData.append("file", file);

        // try {
        //     const response = await fetch("http://localhost:5000/files/upload", {
        //         method: "POST",
        //         body: formData,
        //     });

        //     if (response.status !== 201) {
        //         throw new Error("Error al subir el archivo");
        //     }

        //     const result = await response.json();
        //     console.log("Archivo subido:", result.url);
        // } catch (error) {
        //     console.error("Error:", error);
        // }


        //Cargar la imagen en el chat
    }
    return (
        <>
            <div className="w-1/3 max-h-[700px] flex flex-col bg-gray-200 shadow-lg rounded-lg p-2">
                <div className='w-full pl-3 pb-1 text-lg border-b-1 border-gray-600 break-words'>
                    <h3>Chat: {chatData?.nombreChat}</h3>
                </div>
                <div className="overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                    <div className="h-screen">
                        <ul>
                            {
                                messages && messages.map((msg, index) => (
                                    <li key={index}
                                        className={
                                            `message max-w-xs my-2 p-3 table text-sm rounded-md block
                                            ${msg.from === userData?.nombre ?
                                                'bg-gray-300 ml-auto'
                                                : 'bg-zinc-600 text-white'
                                            }`
                                        }
                                    >
                                        <span className={
                                            `block mb-1 ${msg.from === userData?.nombre ?
                                                'text-green-600' : 'text-orange-300'
                                            }`
                                        }>
                                            {msg.from}
                                        </span>

                                        <div className='message max-w-xs'>
                                            <p className="break-words">{msg.body}</p>
                                            <p className='text-right text-xs mt-2'>{msg.createdAt}</p>
                                        </div>
                                    </li>
                                ))

                            }
                        </ul>

                    </div>
                </div>
                <div className="flex items-center mt-3">
                    <Input
                        value={valueMsg}
                        type="text"
                        placeholder="Escribe un comentario..."
                        className=""
                        size="lg"
                        onChange={handleInputChange}
                        endContent={
                            <div
                                className={`cursor-pointer`}
                                onClick={handleSend}
                            >
                                <IoSendSharp />
                            </div>
                        }
                        onKeyDown={handleKeyDown}
                    />

                    <UploadFile onFileSelect={handleFileSelect} />
                </div>
            </div>
        </>


    )
}

export default Chat
