import { IncidenciasContext } from '@/context/IncidenciasContext';
import { sendMessage, uploadImage } from '@/lib/api';
import { chatData } from '@/lib/interfaces';
import { convertImageToBase64, getDateAndTimeFormat } from '@/lib/utils';
import { Input, Spinner } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import UploadFile from '../uploadFile/UploadFile';
import { showToast } from '../toast/showToast';
import ImageGalleryModal from '../ImagenesChat/Galeria';

interface dataMessage {
    body: string;
    from: string | undefined;
    createdAt: string;
    type: number;
}

interface propsChat {
    chatData: chatData | undefined;
}

const Chat = ({ chatData }: propsChat) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const images = chatData?.listMensajes?.filter(msg => msg.idTipoMensaje === 2).map(msg => msg.mensaje) || [];
    const dataUserAndIncidencias = useContext(IncidenciasContext);
    const userData = dataUserAndIncidencias?.userData;
    const [messages, setMessages] = useState<dataMessage[]>([]);
    const [valueMsg, setValueMsg] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSendingImg, setIsSendingImg] = useState(false);

    useEffect(() => {
        setMessages(
            chatData !== undefined
                ? chatData?.listMensajes?.map(item => ({
                      body: item.mensaje,
                      from: item.user,
                      createdAt: getDateAndTimeFormat(item.fechaRegistro),
                      type: item.idTipoMensaje,
                  }))
                : []
        );
    }, [chatData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValueMsg(e.target.value);
    };

    const handleSend = async () => {
        if (valueMsg.trim()) {
            setIsSending(true);
            const fechaHoy = new Date();
            const newMsg: dataMessage = {
                body: valueMsg,
                from: userData?.nombre,
                createdAt: getDateAndTimeFormat(fechaHoy),
                type: 1,
            };

            const sendDataMsg = {
                idChat: chatData?.idChat,
                idUser: userData?.id,
                msgText: valueMsg,
            };

            const sendMsg = await sendMessage(sendDataMsg);

            if (sendMsg.status === 200) {
                if (messages === undefined) {
                    setMessages([newMsg]);
                    setValueMsg('');
                } else {
                    setMessages([...messages, newMsg]);
                    setValueMsg('');
                }
                setIsSending(false);
            } else {
                showToast('No se pudo enviar el mensaje', 'error', 3000, 'top-center');
                setIsSending(false);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = async (file: File) => {
        if (file && file.type.startsWith('image/')) {
            try {
                setIsSendingImg(true);
                const base64 = await convertImageToBase64(file);
                if (chatData !== undefined && userData !== undefined) {
                    const idChat = chatData.idChat;
                    const idUser = userData.id;
                    const sendImage = await uploadImage(base64, idChat, idUser);
                    if (sendImage.status === 200) {
                        const newMsgFile: dataMessage = {
                            body: sendImage.data.listStatusImgInsertado[0].url,
                            from: userData?.nombre,
                            createdAt: getDateAndTimeFormat(new Date()),
                            type: 2,
                        };
                        if (messages === undefined) {
                            setMessages([newMsgFile]);
                            setValueMsg('');
                        } else {
                            setMessages([...messages, newMsgFile]);
                            setValueMsg('');
                        }
                        setIsSendingImg(false);
                    }
                }
            } catch (error) {
                showToast('Error al subir la imagen', 'error', 3000, 'top-center');
                console.log('Error al subir la imagen: ', error);
            }
        } else {
            showToast('El archivo seleccionado no es una imagen.', 'error', 3000, 'top-center');
        }
    };

    return (
        <>
            <div className="w-1/3 max-h-[700px] flex flex-col bg-gray-200 shadow-lg rounded-lg p-2">
                <div className="w-full pl-3 pb-1 text-lg border-b-1 border-gray-600 break-words flex justify-between items-center">
                    <h3>Chat: {chatData?.nombreChat}</h3>
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={() => setIsGalleryOpen(true)}
                    >
                        📷 Galería
                    </button>
                </div>
                <div className="overflow-y-auto p-4 overflow-x-hidden scrollbar-hide">
                    <div className="h-screen">
                        <ul>
                            {messages &&
                                messages.map((msg, index) => (
                                    <li
                                        key={index}
                                        className={`message max-w-xs my-2 p-3 table text-sm rounded-md block ${
                                            msg.from === userData?.nombre
                                                ? 'bg-gray-300 ml-auto'
                                                : 'bg-zinc-600 text-white'
                                        }`}
                                    >
                                        <span
                                            className={`block mb-1 ${
                                                msg.from === userData?.nombre
                                                    ? 'text-green-600'
                                                    : 'text-orange-300'
                                            }`}
                                        >
                                            {msg.from}
                                        </span>
                                        <div className="message max-w-xs">
                                            {msg.type === 1 ? (
                                                <>
                                                    <p className="break-words">{msg.body}</p>
                                                    <p className="text-right text-xs mt-2">{msg.createdAt}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <img
                                                        className="w-full rounded-md"
                                                        src={msg.body}
                                                        alt="Imagen subida"
                                                    />
                                                    <p className="text-right text-xs mt-2">{msg.createdAt}</p>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                ))}
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
                                className={`cursor-pointer flex items-center`}
                                onClick={!isSending ? handleSend : undefined}
                            >
                                {!isSending ? (
                                    <IoSendSharp size={18} />
                                ) : (
                                    <Spinner color="warning" size="md" />
                                )}
                            </div>
                        }
                        onKeyDown={handleKeyDown}
                        disabled={isSending}
                    />
                    <UploadFile onFileSelect={handleFileSelect} isSending={isSendingImg} />
                </div>
            </div>
            <ImageGalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                images={images}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
            />
        </>
    );
};

export default Chat;