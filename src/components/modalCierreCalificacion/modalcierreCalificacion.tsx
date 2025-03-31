import { changeStatus, sendMessage, getSucursalesInvolucradas } from "@/lib/api";
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
  Skeleton,
  Card
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
  const [sucursalesInvolucradas, setSucursalesInvolucradas] = useState<dataSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); 

  let idUser = 0;
  let idSucursal = 0;
  let idDestino = 0;
  let catalogoCierreCombo: dataSelect[] = [];
  if (dataUser !== undefined) {
    idUser = dataUser?.userData.id;
    idSucursal = dataUser?.userData.id_sucursal;
    idDestino = dataUser?.userData.id_destino;
    setIncidencias = dataUser?.setIncidencias;
    catalogoCierreCombo = dataUser?.catalogoCierreCombo;
  }

  useEffect(() => {
    if (isOpen && idChat) { // Solo ejecuta si el modal está abierto
      setLoading(true);
      getSucursalesInvolucradas(idChat)
        .then((data) => {
          if (data && data.listSucursales) {
            const sucursalesMapeadas = data.listSucursales.map((sucursal: any) => ({
              key: sucursal.idSucursal,
              label: sucursal.sucursal
            }));
            setSucursalesInvolucradas(sucursalesMapeadas);
          }
        })
        .catch((error) => console.error("Error al obtener sucursales:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, idChat]);

  const handleSucursalChange = (sucursal: number) => {
    const sucursalSeleccionada = sucursalesInvolucradas.find((s) => s.key === sucursal)?.label;
    if (sucursalSeleccionada && !sucursalesSeleccionadas.includes(sucursalSeleccionada)) {
      setSucursalesSeleccionadas((prev) => [...prev, sucursalSeleccionada]);
      setCalificaciones((prev) => ({ ...prev, [sucursalSeleccionada]: 0 }));
      setRefresh((prev) => !prev); // ⚡ Forzar actualización
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
    if (idChat) {
      getSucursalesInvolucradas(idChat)
        .then((data) => {
          if (data && data.listSucursales) {
            const sucursalesMapeadas = data.listSucursales.map((sucursal: any) => ({
              key: sucursal.idSucursal,
              label: sucursal.sucursal
            }));
  
            setSucursalesInvolucradas(sucursalesMapeadas);
            setRefresh(prev => !prev); // Forzar actualización
          }
        })
        .catch((error) => console.error("Error al obtener sucursales:", error))
        .finally(() => setLoading(false));
    }
  }, [idChat, refresh]); // Agregar refresh como dependencia

  return (
    <Modal 
      isOpen={isOpen} 
      size="md" 
      onClose={onClose}
      scrollBehavior="inside" // Habilitar scroll interno del modal
      className="max-h-[90vh]" // Altura máxima del modal
    >
      <ModalContent>
        <ModalHeader>Para cerrar, llena los siguientes campos</ModalHeader>
        <ModalBody>
          {loading ? (
            <Card className="p-4 shadow-lg rounded-lg">
              <Skeleton className="h-10 w-full rounded-md mb-4" />
              <Skeleton className="h-10 w-full rounded-md mb-4" />
              <Skeleton className="h-24 w-full rounded-md mb-4" />
            </Card>
          ) : (
            <>
              <Select 
                value={selectMotivo} 
                onChange={(e) => setSelectMotivo(Number(e.target.value))} 
                label="Motivo de Cierre"
              >
                {catalogoCierreCombo.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>

              <Select 
                label="Sucursales Involucradas" 
                onChange={(e) => handleSucursalChange(Number(e.target.value))}
              >
                {sucursalesInvolucradas.map((sucursal) => (
                  <SelectItem key={sucursal.key} value={sucursal.key}>
                    {sucursal.label}
                  </SelectItem>
                ))}
              </Select>

              {/* Lista de calificaciones */}
              <div className="border p-4 rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-2">Calificaciones:</h4>
                {sucursalesSeleccionadas.length === 0 ? (
                  <p className="text-gray-500">Sin calificaciones</p>
                ) : (
                  <div className="space-y-3">
                    {sucursalesSeleccionadas.map((sucursal) => (
                      <div key={sucursal} className="flex items-center justify-between gap-2">
                        <span className="w-1/3 truncate">{sucursal}</span>
                        <div className="flex items-center gap-2 w-2/3">
                        <Select
                        className="w-full"
                        selectedKeys={calificaciones[sucursal] ? [String(calificaciones[sucursal])] : []}
                        onChange={(e) => handleCalificacionChange(sucursal, Number(e.target.value))}
                        placeholder={calificaciones[sucursal] ? String(calificaciones[sucursal]) : "Sin calificación"}
                        size="sm"
                        renderValue={() => (
                          calificaciones[sucursal] ? (
                            <span className="font-medium">{calificaciones[sucursal]}</span>
                          ) : (
                            <span className="text-white bg-gray-1000 px-3 py-1 rounded-md shadow-md border border-gray-600">
                              Sin calificación
                            </span>
                          )
                        )}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num}>
                            {num}
                          </SelectItem>
                        ))}
                      </Select>
                          <Button 
                            color="danger" 
                            variant="light" 
                            size="sm" 
                            onPress={() => handleSucursalRemove(sucursal)}
                            isIconOnly
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Textarea 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                label="Comentarios" 
                placeholder="Escribe un comentario" 
              />
            </>
          )}
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