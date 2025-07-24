import { useRef } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { FaImage } from "react-icons/fa6";

interface uploadFileProps {
    onFileSelect: (file: File) => void;
    isSending: boolean;
}

const UploadFile = ({ onFileSelect, isSending }: uploadFileProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            onFileSelect(file);
        }
    };

    return (
        <div className='ml-1'>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
            />
            <Button
                isIconOnly
                variant="light"
                onClick={handleClick}
                disabled={isSending}
            >
                {
                    !isSending ? <FaImage size={22} />
                        : <Spinner color='warning' size='md' />
                }
            </Button>
        </div>
    );
};

export default UploadFile;
