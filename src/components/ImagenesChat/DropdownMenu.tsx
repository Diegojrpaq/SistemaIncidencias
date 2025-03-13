import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react'
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import ImageGalleryModal from './Galeria';
import { useState } from 'react';

interface propsMenuDropDown {
    images: string[];
}

const MenuDropdown = ({ images }: propsMenuDropDown) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    return(
    <div>
    <Dropdown
    className=''
    size='sm'
    >
        <DropdownTrigger>
            <div className='flex'>
            <IoEllipsisVerticalOutline size = {25}/>
            </div>
        </DropdownTrigger>
        <DropdownMenu
        aria-label='Opciones'
        >
            <DropdownItem
            key= "galeria"
            onClick={() => setIsGalleryOpen(true)                
                }   
            >
                Galeria
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <ImageGalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                images={images}
                currentImage={currentImage} 
                setCurrentImage={setCurrentImage} // Se debe manejar en el componente padre
            />
    </div>
    )
}

export default MenuDropdown;