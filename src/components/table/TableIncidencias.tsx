'use client'

import React, { SVGProps, useContext, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Tooltip,
} from "@nextui-org/react";
import { IncidenciasContext } from "@/context/IncidenciasContext";
import { Incidencia } from "@/lib/interfaces";
import { formatDate, normalizeOrigenName } from "@/lib/utils";
import ModalIncidencia from "../ModalIncidencia/ModalIncidencia";
import { useSearch } from "@/context/SearchContext";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const SearchIcon = (props: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...otherProps}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

// Actualizar las columnas con las nuevas
export const columns = [
    { name: "NumGuia", uid: "numGuia", sortable: true },
    { name: "Creador", uid: "creador", sortable: true },
    { name: "Fecha Registro", uid: "fechaRegistro", sortable: true },
    { name: "Fecha Venta", uid: "fechaVenta", sortable: true }, // Nueva columna
    { name: "Origen", uid: "origen", sortable: true },
    { name: "Destino", uid: "destino", sortable: true },
    { name: "Días Aperturado", uid: "diasAperturado", sortable: true }, // Nueva columna
    { name: "Días Retraso", uid: "diasRetraso", sortable: true }, // Nueva columna
    { name: "Notas", uid: "descripcion", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Actions", uid: "actions" }
];

export const statusOptions = [
    { name: "Abiertas", uid: 1 },
    { name: "En resolución", uid: 2 },
    { name: "Cerradas", uid: 4 },
];

export const DeleteIcon = (props: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const EditIcon = (props: IconSvgProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
            {...props}
        >
            <path
                d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

const statusColorMap: Record<string, ChipProps["color"]> = {
    "4": "success",
    "1": "danger",
    "2": "warning",
    "3": "warning",
};

// Actualizar columnas visibles por defecto
const INITIAL_VISIBLE_COLUMNS = [
    "creador",
    "numGuia",
    "fechaRegistro",
    "fechaVenta",
    "origen",
    "destino",
    "diasAperturado",
    "diasRetraso",
    "descripcion",
    "status",
    "actions"
];

// Interfaz para el multiordenamiento
interface MultiSortDescriptor {
    column: string;
    direction: "ascending" | "descending";
}

// Función para calcular días entre dos fechas
const calcularDiasEntreFechas = (fechaInicio: string, fechaFin?: string): number => {
    if (!fechaInicio) return 0;

    const inicio = new Date(fechaInicio);
    const fin = fechaFin ? new Date(fechaFin) : new Date();


    // Validar que las fechas sean válidas
    if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) return 0;

    const diferenciaTiempo = fin.getTime() - inicio.getTime();
    const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));


    return Math.max(0, diferenciaDias);
};

// Función para calcular días de retraso correctamente
const calcularDiasRetraso = (fechaVenta: string): number => {
    if (!fechaVenta || fechaVenta.length !== 8) return 0;

    // Extraer año, mes y día del formato "YYYYMMDD"
    const year = parseInt(fechaVenta.slice(0, 4), 10);
    const month = parseInt(fechaVenta.slice(4, 6), 10) - 1; // los meses van de 0-11
    const day = parseInt(fechaVenta.slice(6, 8), 10);

    const fechaVentaDate = new Date(year, month, day);
    const fechaActual = new Date();

    // Validar fecha
    if (isNaN(fechaVentaDate.getTime())) return 0;

    // Calcular diferencia en milisegundos
    const diferenciaTiempo = fechaActual.getTime() - fechaVentaDate.getTime();

    // Convertir a días completos
    const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

    return Math.max(0, diferenciaDias);
};


export default function TableIncidencias() {
    const dataUserAndIncidencias = useContext(IncidenciasContext);
    if (dataUserAndIncidencias?.incidencias === undefined) {
        return <div>No hay incidencias para mostrar</div>;
    }
    const incidencias = dataUserAndIncidencias?.incidencias;
    const { query, filter, statusFilter, origenFilter } = useSearch();

    const filteredCards = incidencias?.filter((incidencia) => {
        const matchesQuery =
            incidencia.numGuia.toLowerCase().includes(query.toLowerCase());

        const matchesSucursalFilter =
            filter === -1 ||
            filter === 0 ||
            incidencia.idSucursal === filter;

        const matchesStatusFilter =
            statusFilter.length === 0 ||
            statusFilter.includes(incidencia.resuelto);

        // Filtro de origen mejorado
        const matchesOrigenFilter =
            origenFilter.length === 0 ||
            origenFilter.some(origenFiltro => {
                const origenIncidenteNormalizado = normalizeOrigenName(incidencia.origen || '');
                const origenFiltroNormalizado = normalizeOrigenName(origenFiltro);

                // Debug para ver qué está comparando
                if (origenFilter.length > 0) {
                    console.log(`🔍 Comparando: "${incidencia.origen}" -> "${origenIncidenteNormalizado}" vs "${origenFiltro}" -> "${origenFiltroNormalizado}"`);
                }

                return origenIncidenteNormalizado === origenFiltroNormalizado;
            });

        return matchesQuery && matchesSucursalFilter && matchesStatusFilter && matchesOrigenFilter;
    });

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );

    // Estado para multiordenamiento
    const [sortDescriptors, setSortDescriptors] = React.useState<MultiSortDescriptor[]>([]);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredIncidencias: Incidencia[] = [...(filteredCards ?? [])];

        if (hasSearchFilter) {
            filteredIncidencias = filteredIncidencias.filter((incidencia) =>
                incidencia.numGuia.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredIncidencias;
    }, [filteredCards, filterValue, hasSearchFilter]);

    // Función de comparación mejorada para multiordenamiento
    const compareValues = (a: any, b: any, direction: "ascending" | "descending"): number => {
        // Manejar valores nulos o undefined
        if (a === null || a === undefined || a === "") {
            return direction === "ascending" ? 1 : -1;
        }
        if (b === null || b === undefined || b === "") {
            return direction === "ascending" ? -1 : 1;
        }

        // Comparación de strings
        if (typeof a === "string" && typeof b === "string") {
            const cmp = a.localeCompare(b, 'es', { sensitivity: 'base' });
            return direction === "descending" ? -cmp : cmp;
        }

        // Comparación de números
        if (typeof a === "number" && typeof b === "number") {
            const cmp = a - b;
            return direction === "descending" ? -cmp : cmp;
        }

        // Comparación de fechas
        if (a instanceof Date && b instanceof Date) {
            const cmp = a.getTime() - b.getTime();
            return direction === "descending" ? -cmp : cmp;
        }

        // Fallback para otros tipos
        const cmp = a < b ? -1 : a > b ? 1 : 0;
        return direction === "descending" ? -cmp : cmp;
    };

    // Función para obtener el valor de una columna según los datos reales
    const getColumnValue = (incidencia: Incidencia, column: string): any => {
        switch (column) {
            case "numGuia":
                return incidencia.numGuia || "";
            case "creador":
                return incidencia.empleadoNombre || "";
            case "fechaRegistro":
                // Convertir string a Date para comparación correcta
                return incidencia.fechaRegistro ? new Date(incidencia.fechaRegistro) : new Date(0);
            case "fechaVenta":
                // Convertir string a Date para comparación correcta
                return incidencia.fechaVenta ? new Date(incidencia.fechaVenta) : new Date(0);
            case "origen":
                return incidencia.origen || "";
            case "destino":
                return incidencia.destino || "";
            case "diasAperturado":
                // Calcular días aperturado (desde fechaRegistro hasta hoy)
                return calcularDiasEntreFechas(incidencia.fechaRegistro);
            case "diasRetraso":
                // Calcular días de retraso (desde fechaVenta hasta hoy)
                return calcularDiasRetraso(incidencia.fechaVenta);
            case "descripcion":
                return incidencia.nota || "";
            case "status":
                return incidencia.resuelto || 0;
            default:
                return "";
        }
    };

    // Multiordenamiento aplicado
    const sortedItems = React.useMemo(() => {

        if (sortDescriptors.length === 0) {
            console.log("📋 Sin ordenamiento, retornando items filtrados");
            return filteredItems;
        }

        const sorted = [...filteredItems].sort((a: Incidencia, b: Incidencia) => {
            for (const descriptor of sortDescriptors) {
                const first = getColumnValue(a, descriptor.column);
                const second = getColumnValue(b, descriptor.column);

                const cmp = compareValues(first, second, descriptor.direction);

                if (cmp !== 0) {
                    return cmp;
                }
            }
            return 0;
        });
        return sorted;
    }, [filteredItems, sortDescriptors]);

    // Manejador de cambio de ordenamiento
    const handleSortChange = (descriptor: SortDescriptor) => {
        if (!descriptor.column) return;

        setSortDescriptors((prev) => {
            const columnExists = prev.findIndex(d => d.column === descriptor.column);

            // Si la columna ya existe en el array
            if (columnExists !== -1) {
                const newDescriptors = [...prev];
                const currentDescriptor = newDescriptors[columnExists];

                // Cambiar dirección o remover
                if (currentDescriptor.direction === "ascending") {
                    newDescriptors[columnExists] = { ...currentDescriptor, direction: "descending" };
                    console.log("➡️ Cambiando a descendente");
                } else {
                    // Remover esta columna del ordenamiento
                    newDescriptors.splice(columnExists, 1);
                }

                return newDescriptors;
            } else {
                return [...prev, { column: descriptor.column as string, direction: descriptor.direction }];
            }
        });
    };

    const renderCell = React.useCallback((incidencia: Incidencia, columnKey: React.Key) => {
        switch (columnKey) {
            case "numGuia":
                return (
                    <div className="flex justify-start items-center">
                        <p>{incidencia.numGuia}</p>
                    </div>
                );
            case "creador":
                return (
                    <User name={incidencia.empleadoNombre}>
                        {incidencia.empleadoNombre}
                    </User>
                );
            case "fechaVenta":
                return (
                    <div className="flex justify-center">
                        {incidencia.fechaVenta ? formatDate(incidencia.fechaVenta) : "N/A"}
                    </div>
                );
            case "diasAperturado":
                const diasAperturado = calcularDiasEntreFechas(incidencia.fechaRegistro);
                return (
                    <div className="flex justify-center">
                        <Chip
                            size="sm"
                            variant="flat"
                            color={diasAperturado > 30 ? "danger" : diasAperturado > 15 ? "warning" : "success"}
                        >
                            {diasAperturado} días
                        </Chip>
                    </div>
                );
            case "diasRetraso":
                const diasRetraso = calcularDiasRetraso(incidencia.fechaVenta);
                return (
                    <div className="flex justify-center">
                        <Chip
                            size="sm"
                            variant="flat"
                            color={diasRetraso > 30 ? "danger" : diasRetraso > 15 ? "warning" : "success"}
                        >
                            {diasRetraso} días
                        </Chip>
                    </div>
                );
            case "descripcion":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize text-default-400">{incidencia.nota}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[incidencia.resuelto.toString()]}
                        size="sm"
                        variant="flat"
                    >
                        {
                            incidencia.resuelto === 1 ? "Abierta" :
                                incidencia.resuelto === 2 ? "En resolución" :
                                    incidencia.resuelto === 3 ? "Solicitud de Cierre" :
                                        incidencia.resuelto === 4 ? "Cerrada" :
                                            "Sin estado"
                        }
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Tooltip content="Detalles">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ModalIncidencia
                                    numGuia={incidencia.numGuia}
                                    textButton="Table modal"
                                />
                            </span>
                        </Tooltip>
                    </div>
                );
            case "fechaRegistro":
                return (
                    <div className="flex justify-center">
                        {formatDate(incidencia.fechaRegistro)}
                    </div>
                );
            case "origen":
                return <div>{incidencia.origen}</div>;
            case "destino":
                return <div>{incidencia.destino}</div>;
            default:
                return null;
        }
    }, []);

    const topContent = React.useMemo(() => {
        // Obtener nombres de los estatus seleccionados
        const getSelectedStatusNames = () => {
            if (statusFilter.length === 0) return ["Todos los estatus"];

            return statusFilter.map(status => {
                const option = statusOptions.find(opt => opt.uid === status);
                return option ? option.name : `Estatus ${status}`;
            });
        };

        // Nuevo: obtener nombres de los orígenes seleccionados
        const getSelectedOrigenNames = () => {
            if (origenFilter.length === 0) return ["Todos los orígenes"];
            return origenFilter;
        };

        const statusNames = getSelectedStatusNames();
        const origenNames = getSelectedOrigenNames();

        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {sortedItems.length} incidencias
                    </span>
                    <div className="flex gap-4 items-center">
                        {/* Mostrar filtros activos */}
                        <div className="flex flex-col text-right">
                            {statusNames.length > 0 && (
                                <span className="text-small text-default-400">
                                    Estatus: {statusNames.join(', ')}
                                </span>
                            )}
                            {origenNames.length > 0 && (
                                <span className="text-small text-default-400">
                                    Origen: {origenNames.join(', ')}
                                </span>
                            )}
                            {filter !== -1 && (
                                <span className="text-small text-default-400">
                                    Sucursal filtrada
                                </span>
                            )}
                        </div>

                        {sortDescriptors.length > 0 && (
                            <div className="flex gap-2 items-center">
                                <span className="text-small text-default-400">
                                    Ordenando por: {sortDescriptors.map((d, i) =>
                                        `${i > 0 ? ', ' : ''}${columns.find(c => c.uid === d.column)?.name} (${d.direction === 'ascending' ? '↑' : '↓'})`
                                    ).join('')}
                                </span>
                                <Button
                                    size="sm"
                                    variant="flat"
                                    color="danger"
                                    onClick={() => setSortDescriptors([])}
                                >
                                    Limpiar ordenamiento
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }, [sortDescriptors, sortedItems.length, statusFilter, origenFilter, filter]);

    // En TableIncidencias, antes del return
    useEffect(() => {
        if (incidencias && incidencias.length > 0) {
            const origenesUnicos = Array.from(
                new Set(incidencias.map(inc => inc.origen).filter(Boolean))
            ).sort();

            // También mostrar cómo se normalizan
            const origenesNormalizados = origenesUnicos.map(origen => ({
                original: origen,
                normalizado: normalizeOrigenName(origen)
            }));

        }
    }, [incidencias]);

    return (
        <Table
            aria-label="Tabla de incidencias con multiordenamiento"
            isHeaderSticky
            className='max-h-[720px] overflow-auto'
            sortDescriptor={sortDescriptors.length > 0 ? sortDescriptors[0] : undefined}
            onSortChange={handleSortChange}
            topContent={topContent}
            topContentPlacement="outside"
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                        {sortDescriptors.find(d => d.column === column.uid) && (
                            <span className="ml-1 text-xs text-primary font-bold">
                                ({sortDescriptors.findIndex(d => d.column === column.uid) + 1})
                            </span>
                        )}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={"No se encontraron incidencias"}
                items={sortedItems}
            >
                {(item) => (
                    <TableRow key={item.idIncidencia}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}