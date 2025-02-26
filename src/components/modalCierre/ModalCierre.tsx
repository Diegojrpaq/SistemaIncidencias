import { changeStatus } from "@/lib/api";
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
import { showToast } from "../toast/showToast";
import { Incidencia } from "@/lib/interfaces";
import { useContext } from "react";
import { IncidenciasContext } from "@/context/IncidenciasContext";

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
  //onSubmit: (data: any) => void;
  idIncidencia: number;
  idEmpleadoOpenIncidencia: number;
  idUser: number;
  arrActualIncidencias: Incidencia[] | undefined;
}

function ModalCierre({
  isOpen,
  onClose,
  //onSubmit,
  idIncidencia,
  idEmpleadoOpenIncidencia,
  idUser,
  arrActualIncidencias,
}: ModalProps) {
  //let setIncidencias: ((incidencias: Incidencia[]) => void);
  const dataUser = useContext(IncidenciasContext);
  let setIncidencias: ((incidencias: Incidencia[]) => void);
  //const arrActualIncidencias = dataUser?.incidencias
  //let idUser = 0;
  if (dataUser !== undefined) {
    idUser = dataUser?.userData.id;
    setIncidencias = dataUser?.setIncidencias;

  }

  const changeStatusIncidencia = async (key: number) => {
    let idResuelto;
    if (idEmpleadoOpenIncidencia !== idUser && key === 4) {
      idResuelto = 3;
    } else {
      idResuelto = key;
    }
    const response = await changeStatus({
      idIncidencia,
      idStatus: key,
      idUser,
    })

    if (response.status === 200) {
      showToast('Se cambio el estatus de la incidencia', "success", 3000, "top-center")
      if (arrActualIncidencias !== undefined) {
        const newArr = arrActualIncidencias.map(item =>
          item.idIncidencia === idIncidencia ?
            { ...item, resuelto: idResuelto } : item
        );
        setIncidencias(newArr);
      }
    } else {
      showToast('Error al cambiar el estado de la incidencia', "error", 3000, "top-center")
    }
  }
  const handleConfirm = () => {
    //Mandar datos de cierre: sucursal responsable, motivo.
    //Si todo fue correcto actualizar status a 200
    //onSubmit(200);
    changeStatusIncidencia(4);
    //Si no ponemos 404
    onClose();
  }
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
          <Button color="primary" onPress={handleConfirm}>
            Enviar cierre
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalCierre;
