import { useRef } from "react";
import { Button } from "@nextui-org/react";
import { FaImage } from "react-icons/fa6";

const UploadFile = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            onFileSelect(event.target.files[0]);
        }
    };

    return (
        <div className='ml-1'>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <Button isIconOnly variant="light" onClick={handleClick}>
                <FaImage size={22} />
            </Button>
        </div>
    );
};

export default UploadFile;
