import { IncidenciasContext } from '@/context/IncidenciasContext';
import { chatData, Mensaje } from '@/lib/interfaces';
import { Input } from '@nextui-org/react';
import React, { useContext, useEffect, useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
interface dataMessage {
    body: string;
    from: string | undefined;
}

interface propsChat {
    chatData: chatData | undefined;
}
const Chat = ({chatData}: propsChat) => {
    const dataUserAndIncidencias = useContext(IncidenciasContext);
    const userData = dataUserAndIncidencias?.userData;
    const [messages, setMessages] = useState<dataMessage[]>([
        // {
        //     body: 'Falta mercancia',
        //     from: 'Juan Zaragoza',
        // },
        // {
        //     body: 'Se envio completa',
        //     from: 'Pedro Serrano',
        // },
    ]);
    const [valueMsg, setValueMsg] = useState("");

    const formatMessages = (arr: Mensaje[]) => {
        const messages = arr.map(message => {
            return {
                body: message.mensaje,
                from: message.user,
            }
        })
        return messages;
    }

    useEffect(() => {
        setMessages(
            chatData !== undefined ? chatData?.listMensajes?.map(item => ({
                body: item.mensaje,
                from: item.user,
            }))
            : []
        )
    }, [chatData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValueMsg(e.target.value);
    };

    // Manejador de envío
    const handleSend = () => {
        if (valueMsg.trim()) {
            //Crear nuevo mensaje
            const newMsg = {
                body: valueMsg,
                from: userData?.nombre,
            }
            //Guardar mensaje API

            /*Si se guardo correctamente en BD, se renderizara en el chat, 
            si hay error aparecera aviso de error.*/

            //Guardarlo para que se vea en el chat
            setMessages([...messages, newMsg]);
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
    return (
        <>
            <div className="w-1/3 max-h-[700px] flex flex-col bg-gray-200 shadow-lg rounded-lg p-2">
                <div className='w-full pl-3 pb-1 text-lg border-b-1 border-gray-600 break-words'>
                    <h3>Nombre del chat: {chatData?.nombreChat}</h3>
                </div>
                <div className="overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                    <div className="h-screen">
                        <ul>
                            {
                                messages.map((msg, index) => (
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
                                        </div>
                                    </li>
                                ))

                            }
                        </ul>

                    </div>
                </div>
                <div className="mt-3">
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
                </div>
            </div>
        </>


    )
}

export default Chat
