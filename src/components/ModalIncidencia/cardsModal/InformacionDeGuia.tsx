import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider
} from '@nextui-org/react';
import { IncidenciaDataModal } from '@/lib/interfaces';

interface infoGuiaProps {
    incidencia: IncidenciaDataModal;
}

// función para formatear la fecha
function formatFecha(fecha: string) {
    if (!fecha || fecha.length !== 8) return fecha; // validación
    const anio = fecha.slice(0, 4);
    const mes = fecha.slice(4, 6);
    const dia = fecha.slice(6, 8);
    return `${dia}/${mes}/${anio}`;
}

function InformacionDeGuia({ incidencia }: infoGuiaProps) {
    return (
        <Card>
            <CardHeader className="flex gap-3">
                <div className="flex items-center gap-2 ml-3">
                    <p className="text-lg">Información de la guía</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="grid grid-cols-2 gap-5 p-2">
                    <div className="flex flex-col gap-2">
                        <div><Chip size="lg" radius="sm">NumGuia:</Chip> {incidencia.numGuia}</div>
                        <div><Chip size="lg" radius="sm">Origen:</Chip> {incidencia.origen}</div>
                        <div><Chip size="lg" radius="sm">Destino:</Chip> {incidencia.destino}</div>
                        <div><Chip size="lg" radius="sm">Cliente Origen:</Chip> {incidencia.clienteOrigenNombre}</div>
                        <div><Chip size="lg" radius="sm">Fecha Venta:</Chip> {formatFecha(incidencia.fechaVenta)}</div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div><Chip size="lg" radius="sm">Volumen:</Chip> {incidencia.volumen} mt3</div>
                        <div><Chip size="lg" radius="sm">Peso:</Chip> {incidencia.peso} kg</div>
                        <div><Chip size="lg" radius="sm">Cantidad:</Chip> {incidencia.cantidad}</div>
                        <div><Chip size="lg" radius="sm">Cliente Destino:</Chip> {incidencia.clienteDestinoNombre}</div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default InformacionDeGuia;
