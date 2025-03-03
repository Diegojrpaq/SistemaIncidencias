import { Card, CardBody, CardHeader } from '@nextui-org/react';
import TableDetalleEscaneo from '@/components/table/TableDetalleEscaneo';
import { escaneoData, scanDto } from '@/lib/interfaces';

interface detalleEscaneoProps {
    detalleEscaneo: scanDto | undefined;
}
function DetalleEscaneo({ detalleEscaneo }: detalleEscaneoProps) {
    let arrEscaneo: escaneoData[] | undefined;
    if (detalleEscaneo?.escaneo) {
        arrEscaneo = detalleEscaneo.escaneo
    } else {
        arrEscaneo = []
    }
    return (
        <Card>
            <CardHeader className="flex">
                <div className="flex items-center justify-center ml-3">
                    <p className="text-lg">Detalle Escaneo</p>
                </div>
            </CardHeader>
            <CardBody>
                <TableDetalleEscaneo arrEscaneo={arrEscaneo} />
            </CardBody>
        </Card>
    )
}

export default DetalleEscaneo
