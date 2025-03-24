import { changeStatus, sendMessage } from "@/lib/api";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { showToast } from "../toast/showToast";
import { dataSelect, Incidencia } from "@/lib/interfaces";
import { useContext, useState, useEffect } from "react";
import { IncidenciasContext } from "@/context/IncidenciasContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  idIncidencia: number;
  idEmpleadoOpenIncidencia: number;
  arrActualIncidencias: Incidencia[] | undefined;
  idChat: number;
}

function ModalCalificacion({
  isOpen,
  onClose,
  idIncidencia,
  idEmpleadoOpenIncidencia,
  arrActualIncidencias,
  idChat,
}: ModalProps) {
  const dataUser = useContext(IncidenciasContext);
  let setIncidencias: (incidencias: Incidencia[]) => void;
  const [selectMotivo, setSelectMotivo] = useState(0);
  const [sucursalesSeleccionadas, setSucursalesSeleccionadas] = useState<string[]>([]);
  const [calificaciones, setCalificaciones] = useState<{ [key: string]: number }>({});
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(false);
  const [selectSucursal, setSelectSucursal] = useState(0);

  let idUser = 0;
  let idSucursal = 0;
  let idDestino = 0;
  let sucursalesCombo: dataSelect[] = [];
  let catalogoCierreCombo: dataSelect[] = [];
  if (dataUser !== undefined) {
    idUser = dataUser?.userData.id;
    idSucursal = dataUser?.userData.id_sucursal;
    idDestino = dataUser?.userData.id_destino;
    setIncidencias = dataUser?.setIncidencias;
    sucursalesCombo = dataUser?.sucursalesCombo;
    catalogoCierreCombo = dataUser?.catalogoCierreCombo;
  }

  const handleSucursalChange = (sucursal: number) => {
    const sucursalSeleccionada = sucursalesCombo.find((s) => s.key === sucursal)?.label;
    if (sucursalSeleccionada && !sucursalesSeleccionadas.includes(sucursalSeleccionada)) {
      setSucursalesSeleccionadas((prev) => [...prev, sucursalSeleccionada]);
      setCalificaciones((prev) => ({ ...prev, [sucursalSeleccionada]: 0 })); // Valor por defecto 0
    }
  };

  const changeStatusIncidencia = async (key: number) => {
    let idResuelto = idEmpleadoOpenIncidencia !== idUser && key === 4 ? 3 : key;

    const response = await changeStatus({
      idIncidencia,
      idStatus: key,
      idUser,
      idSucursal,
      idDestino,
      idSucursalResponsable: Number(selectSucursal),
      idTipoIncidencia: Number(selectMotivo),
    });

    const sendDataMsg = {
      idChat,
      idUser,
      msgText: descripcion,
    };

    const sendMsg = await sendMessage(sendDataMsg);

    if (response.status === 200 && sendMsg.status === 200) {
      showToast("Se cambió el estatus de la incidencia", "success", 3000, "top-center");
      if (arrActualIncidencias !== undefined) {
        const newArr = arrActualIncidencias.map((item) =>
          item.idIncidencia === idIncidencia ? { ...item, resuelto: idResuelto } : item
        );
        setIncidencias(newArr);
      }
    } else {
      showToast("Error al cambiar el estado de la incidencia", "error", 3000, "top-center");
    }
  }; 

  const handleCalificacionChange = (sucursal: string, value: number) => {
    setCalificaciones((prev) => ({
      ...prev,
      [sucursal]: value,
    }));
  };

  const handleSucursalRemove = (sucursal: string) => {
    setSucursalesSeleccionadas((prev) => prev.filter((s) => s !== sucursal));
    setCalificaciones((prev) => {
      const updatedCalificaciones = { ...prev };
      delete updatedCalificaciones[sucursal];
      return updatedCalificaciones;
    });
  };

  const handleConfirm = () => {
    if (!selectMotivo || sucursalesSeleccionadas.length === 0 || !descripcion.trim()) {
      setError(true);
      return;
    }
    changeStatusIncidencia(4);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSelectMotivo(0);
    setSucursalesSeleccionadas([]);
    setCalificaciones({});
    setDescripcion("");
    setError(false);
  };

  useEffect(() => {
    console.log("Estado de calificaciones actualizado:", calificaciones);
  }, [calificaciones]);

  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalContent>
        <ModalHeader>Para cerrar, llena los siguientes campos</ModalHeader>
        <ModalBody>
          <Select value={selectMotivo} onChange={(e) => setSelectMotivo(Number(e.target.value))} label="Motivo de Cierre">
            {catalogoCierreCombo.map((item) => (
              <SelectItem key={item.key} value={item.key}>
                {item.label}
              </SelectItem>
            ))}
          </Select>

          <Select label="Sucursales Involucradas" onChange={(e) => handleSucursalChange(Number(e.target.value))}>
            {sucursalesCombo.map((sucursal) => (
              <SelectItem key={sucursal.key} value={sucursal.key}>
                {sucursal.label}
              </SelectItem>
            ))}
          </Select>
          {/* Box con scroll SOLO para los select de calificaciones */}
          {Object.keys(calificaciones).length > 0 && (
            <div className="border p-2 rounded-lg bg-gray-100 max-h-40 overflow-y-auto">
              {Object.keys(calificaciones).map((sucursal) => (
                <div key={sucursal} className="mb-2">
                  <label className="block text-sm font-medium">{`Calificación para ${sucursal}:`}</label>
                  <Select
                    value={calificaciones[sucursal] || ""}
                    onChange={(e) => handleCalificacionChange(sucursal, Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num}>
                        {num}
                      </SelectItem>
                    ))}
                  </Select>
                  <Button color="danger" variant="light" size="sm" onPress={() => handleSucursalRemove(sucursal)} className="mt-1">
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>
          )}

        {/* Lista de calificaciones */}
        {Object.keys(calificaciones).length > 0 && (
          <div className="mt-2">
            <h4 className="font-semibold">Calificaciones:</h4>
            <ul>
              {Object.entries(calificaciones).map(([sucursal, calificacion]) => (
                <li key={sucursal}>
                  {sucursal}: <strong>{calificacion}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}

          <Textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} label="Comentarios" placeholder="Escribe un comentario" />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleConfirm}>
            Enviar Cierre
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalCalificacion;
