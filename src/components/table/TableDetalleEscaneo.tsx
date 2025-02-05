import { escaneoData } from "@/lib/interfaces";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@nextui-org/react";

const columns = [
    {
        key: "sucursalUbicacion",
        label: "Sucursal",
    },
    {
        key: "fechaDispositivoKardex",
        label: "Fecha",
    },
    {
        key: "consecutivoMostrar",
        label: "Items",
    },
    {
        key: "notas",
        label: "Notas",
    }
];

interface PropsTable {
    arrEscaneo: escaneoData[] | []
}

export default function TableDetalleEscaneo({ arrEscaneo }: PropsTable) {
    return (
        <Table aria-label="Tabla Detalle Escaneo">
            <TableHeader columns={columns}>
                {(column) => 
                    <TableColumn key={column.key}>
                        {column.label}
                    </TableColumn>
                }
            </TableHeader>
            <TableBody items={arrEscaneo}>
                {(item: escaneoData) => (
                    <TableRow key={item.idClaveUnica}>
                        {(columnKey) => 
                            <TableCell>
                                {getKeyValue(item, columnKey)}
                            </TableCell>
                        }
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}