import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea
} from "@nextui-org/react";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalCierre({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Para cerrar llena los siguientes campos
        </ModalHeader>
        <ModalBody className="">
          <div className="flex flex-col">
            <div className="flex w-full items-center mb-6">
              <Select
                className="max-w-md"
                label="Motivo de Cierre:"
                placeholder="Selecciono un motivo de cierre"
                labelPlacement="outside"
                size="md"
                isRequired
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>

            </div>

            <div className="flex w-full items-center mb-6">
              <Select
                className="max-w-md"
                label="Sucursal responsable:"
                placeholder="Seleccione una sucursal"
                labelPlacement="outside"
                size="md"
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>

            </div>

            <div>
              <Textarea
                className="max-w-md"
                label="Comentarios"
                placeholder="Escribe un comentario"
                labelPlacement="outside"
              />
            </div>



          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={onClose}>
            Enviar cierre
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalCierre;
