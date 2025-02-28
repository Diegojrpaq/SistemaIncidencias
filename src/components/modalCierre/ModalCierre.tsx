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
import { dataSelect, Incidencia } from "@/lib/interfaces";
import { useContext, useState } from "react";
import { IncidenciasContext } from "@/context/IncidenciasContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  idIncidencia: number;
  idEmpleadoOpenIncidencia: number;
  arrActualIncidencias: Incidencia[] | undefined;
}

function ModalCierre({
  isOpen,
  onClose,
  idIncidencia,
  idEmpleadoOpenIncidencia,
  arrActualIncidencias,
}: ModalProps) {
  const dataUser = useContext(IncidenciasContext);
  let setIncidencias: ((incidencias: Incidencia[]) => void);
  const [selectMotivo, setSelectMotivo] = useState(0);
  const [selectSucursal, setSelectSucursal] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(false);

  let idUser = 0;
  let idSucursal = 0;
  let idDestino = 0;
  let sucursalesCombo: dataSelect[] | [] = [];
  let catalogoCierreCombo: dataSelect[] | [] = [];
  if (dataUser !== undefined) {
    idUser = dataUser?.userData.id;
    idSucursal = dataUser?.userData.id_sucursal;
    idDestino = dataUser?.userData.id_destino;
    setIncidencias = dataUser?.setIncidencias;
    sucursalesCombo = dataUser?.sucursalesCombo;
    catalogoCierreCombo = dataUser?.catalogoCierreCombo;
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
      idSucursal,
      idDestino,
      idSucursalResponsable: Number(selectSucursal),
      idTipoIncidencia: Number(selectMotivo),
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
    //Mandar datos de cierre: sucursal responsable, motivo, comentario.
    if (!selectMotivo || !selectSucursal || !descripcion.trim()) {
      setError(true);
      return;
    }

    changeStatusIncidencia(4);
    onClose();
    resetForm();
  }

  const resetForm = () => {
    setSelectMotivo(0);
    setSelectSucursal(0);
    setDescripcion("");
    setError(false);
  };
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
                value={selectMotivo}
                onChange={(e) => setSelectMotivo(Number(e.target.value))}
                label="Motivo de Cierre:"
                placeholder="Selecciono un motivo de cierre"
                labelPlacement="outside"
                size="md"
                isInvalid={error && !selectMotivo}
                errorMessage={
                  error && !selectMotivo ?
                    "Campo obligatorio" : ""
                }
              >
                {
                  catalogoCierreCombo.map((item) => (
                    <SelectItem key={item.key}>
                      {item.label}
                    </SelectItem>
                  ))
                }
              </Select>

            </div>

            <div className="flex w-full items-center mb-6">
              <Select
                className="max-w-md"
                value={selectSucursal}
                onChange={(e) => setSelectSucursal(Number(e.target.value))}
                label="Sucursal responsable:"
                placeholder="Seleccione una sucursal"
                labelPlacement="outside"
                size="md"
                isInvalid={error && !selectSucursal}
                errorMessage={
                  error && !selectSucursal ?
                    "Campo obligatorio" : ""
                }
              >
                {sucursalesCombo.map((sucursal) => (
                  <SelectItem key={sucursal.key}>
                    {sucursal.label}
                  </SelectItem>
                ))}
              </Select>

            </div>

            <div>
              <Textarea
                className="max-w-md"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                label="Comentarios"
                placeholder="Escribe un comentario"
                labelPlacement="outside"
                isInvalid={error && !descripcion}
                errorMessage={
                  error && !descripcion.trim() ?
                    "Campo obligatorio" : ""
                }
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
