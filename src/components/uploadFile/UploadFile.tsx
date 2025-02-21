import { useRef } from "react";
import { Button } from "@nextui-org/react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

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
        <div className='ml-2'>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <Button isIconOnly variant="light" onClick={handleClick}>
                <MdOutlineDriveFolderUpload size={25} />
            </Button>
        </div>
    );
};

export default UploadFile;
