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
    images: string[]; // Lista de imágenes que vienen del chat
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
            key="galeria"
            onClick={() => setIsGalleryOpen(true)} // Al hacer clic en el item "Galería", abrir el modal
            >
                Galeria
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
    
    {/* El modal para la galería, pasa las imágenes y maneja su apertura */}
    <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)} // Cierra el modal
        images={images} // Pasa las imágenes al modal
        currentImage={currentImage} // Imagen actual seleccionada
        setCurrentImage={setCurrentImage} // Actualiza la imagen seleccionada
    />
    </div>
    )
}

export default MenuDropdown;
