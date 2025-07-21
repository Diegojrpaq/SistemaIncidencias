import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider
} from '@nextui-org/react'
import { IncidenciaDataModal } from '@/lib/interfaces';
import { formatDate } from '@/lib/utils';

interface infoIncidenciaProps {
    incidencia: IncidenciaDataModal;
}

function InformacionDeIncidencia({ incidencia }: infoIncidenciaProps) {
    const status = incidencia.resuelto;
    let statusString = "";
    switch (status) {
        case 1:
            statusString = "Abierta";
            break;
        case 2:
            statusString = "En resolución";
            break;
        case 3:
            statusString = "Solicitud de Cierre";
            break;
        case 4:
            statusString = "Cerrada";
            break;
    }
    return (
        <Card>
            <CardHeader className="flex gap-3">
                <div className="flex items-center gap-2 ml-3">
                    <p className="text-lg">Información de la incidencia</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="grid grid-cols-auto">
                    <div className="flex flex-col gap-2 p-2">
                        <div><Chip size="lg" radius="sm">Motivo incidencia:</Chip> {incidencia.descripcion}</div>
                        <div><Chip size="lg" radius="sm">Sucursal:</Chip> {incidencia.suc_genera_incidencia}</div>
                        <div><Chip size="lg" radius="sm">Creada por:</Chip> {incidencia.empleado_registra}</div>
                        <div><Chip size="lg" radius="sm">Registro incidencia:</Chip> {
                            formatDate(incidencia.fecha_registro_incidencia)
                        }
                        </div>
                        <div><Chip size="lg" radius="sm">Descripcion:</Chip> {incidencia.nota}</div>
                        <div><Chip size="lg" radius="sm">Status:</Chip> {statusString}</div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default InformacionDeIncidencia
