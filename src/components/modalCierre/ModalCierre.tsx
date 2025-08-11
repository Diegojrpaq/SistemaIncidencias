import { useEffect, useState, useContext } from "react";
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
import { IncidenciasContext } from "@/context/IncidenciasContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  idIncidencia: number;
  idEmpleadoOpenIncidencia: number;
  arrActualIncidencias: Incidencia[] | undefined;
  idChat: number;
}

function ModalCierre({
  isOpen,
  onClose,
  idIncidencia,
  idEmpleadoOpenIncidencia,
  arrActualIncidencias,
  idChat,
}: ModalProps) {
  const dataUser = useContext(IncidenciasContext);
  const [selectMotivo, setSelectMotivo] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(false);
  const [sucursalesInvolucradas, setSucursalesInvolucradas] = useState<dataSelect[]>([]);
  const [loading, setLoading] = useState(true);

  let idUser = 0;
  let idSucursal = 0;
  let idDestino = 0;
  let catalogoCierreCombo: dataSelect[] | [] = [];
  let setIncidencias: ((incidencias: Incidencia[]) => void);

  if (dataUser !== undefined) {
    idUser = dataUser?.userData.id;
    idSucursal = dataUser?.userData.id_sucursal;
    idDestino = dataUser?.userData.id_destino;
    setIncidencias = dataUser?.setIncidencias;
    catalogoCierreCombo = dataUser?.catalogoCierreCombo;
  }

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
          } else {
            console.warn("La API devolvió una lista vacía de sucursales");
            setSucursalesInvolucradas([]);
          }
        })
        .catch((error) => console.error("Error al obtener sucursales:", error))
        .finally(() => setLoading(false));
    }
  }, [idChat]);

  const changeStatusIncidencia = async (key: number) => {
    const isCreador = idEmpleadoOpenIncidencia === idUser;
    const idResuelto = !isCreador && key === 4 ? 3 : key; // Si no es el creador, se manda solicitud de cierre (3)

    const response = await changeStatus({
      idIncidencia,
      idStatus: idResuelto,
      idUser,
      idSucursal,
      idDestino,
      idTipoIncidencia: Number(selectMotivo),
    });

    console.log("🔁 Respuesta changeStatus:", response); // <--- añade esto

    const sendDataMsg = {
      idChat,
      idUser,
      msgText: descripcion,
    };

    const sendMsg = await sendMessage(sendDataMsg);

    console.log("📨 Respuesta sendMessage:", sendMsg); // <--- y esto

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

  const handleConfirm = () => {
    if (!selectMotivo || !descripcion.trim()) {
      setError(true);
      return;
    }

    changeStatusIncidencia(4); // ← 4 siempre, internamente decide si es 3 o 4
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setSelectMotivo(0);
    setDescripcion("");
    setError(false);
  };

  const isCreador = idEmpleadoOpenIncidencia === idUser;

  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {isCreador ? "Cerrar incidencia" : "Solicitar cierre de incidencia"}
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col">
            {!isCreador && (
              <p className="text-warning text-sm mb-2">
                Solo el creador puede cerrar la incidencia. Se enviará una solicitud de cierre.
              </p>
            )}

            {loading ? (
              <Card className="p-4 shadow-lg rounded-lg">
                <Skeleton className="h-10 w-full rounded-md mb-4" />
                <Skeleton className="h-24 w-full rounded-md mb-4" />
              </Card>
            ) : (
              <>
                <div className="flex w-full items-center mb-6">
                  <Select
                    className="max-w-md"
                    value={selectMotivo}
                    onChange={(e) => setSelectMotivo(Number(e.target.value))}
                    label="Motivo de Cierre:"
                    placeholder="Seleccione un motivo de cierre"
                    labelPlacement="outside"
                    size="md"
                    isInvalid={error && !selectMotivo}
                    errorMessage={error && !selectMotivo ? "Campo obligatorio" : ""}
                  >
                    {catalogoCierreCombo.map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
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
                    errorMessage={error && !descripcion.trim() ? "Campo obligatorio" : ""}
                  />
                </div>
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleConfirm}>
            {isCreador ? "Cerrar incidencia" : "Solicitar cierre"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalCierre;
