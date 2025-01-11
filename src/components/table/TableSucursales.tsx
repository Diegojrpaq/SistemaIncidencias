import { SucursalChat } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";
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
        key: "idSucursal",
        label: "Id",
    },
    {
        key: "sucursal",
        label: "Nombre",
    },
    {
        key: "fechaUnion",
        label: "Fecha",
    },
];

interface PropsTable {
    sucursales: SucursalChat[] | undefined;
}

export default function TableSucursales({ sucursales }: PropsTable) {
    let sucursalesFormat: any;
    if (sucursales !== undefined) {
        sucursalesFormat = sucursales.map((sucursal) => (
            {
                idSucursal: sucursal.idSucursal,
                sucursal: sucursal.sucursal,
                fechaUnion: formatDate(sucursal.fechaUnion),
            }
        ))
    } else {
        return (
            <h1>No hay sucursales asociadas</h1>
        )
    }

    return (
        <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={sucursalesFormat}>
                {(item: SucursalChat) => (
                    <TableRow key={item.idSucursal}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}