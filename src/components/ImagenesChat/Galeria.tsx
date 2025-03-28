import React from "react";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentImage: number;
  setCurrentImage: (index: number) => void;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  currentImage,
  setCurrentImage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-lg p-6 max-w-4xl max-h-full overflow-auto shadow-lg z-50">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-black font-bold text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          src={images[currentImage]}
          alt={`Imagen ${currentImage + 1}`}
          className="max-w-full max-h-96 mx-auto"
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              setCurrentImage((currentImage - 1 + images.length) % images.length)
            }
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={images.length <= 1} // Deshabilitar si solo hay una imagen
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentImage((currentImage + 1) % images.length)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={images.length <= 1} // Deshabilitar si solo hay una imagen
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
