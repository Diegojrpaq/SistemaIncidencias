'use client'

import React, { SVGProps, useContext, useState, useCallback, useEffect } from "react";
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
import { formatDate } from "@/lib/utils";
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

export const columns = [
    { name: "NumGuia", uid: "numGuia", sortable: true },
    { name: "Creador", uid: "creador", sortable: true },
    { name: "Destino Registra", uid: "destinoRegistra" },
    { name: "Sucursal Registra", uid: "sucursalRegistra" },
    { name: "Fecha Registro", uid: "fechaRegistro", sortable: true },
    { name: "Origen", uid: "origen" },
    { name: "Destino", uid: "destino" },
    { name: "Descripción", uid: "descripcion" },
    { name: "Status", uid: "status", sortable: true },
    { name: "Actions", uid: "actions" },
];

export const statusOptions = [
    { name: "Abiertas", uid: 1 },
    { name: "En resolución", uid: 2 },
    { name: "Cerradas", uid: 0 },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
    4: "success",
    1: "danger",
    2: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["creador", "numGuia", "fechaRegistro", "origen", "destino", "descripcion", "status", "actions"];

export default function TableIncidencias() {
    const dataUserAndIncidencias = useContext(IncidenciasContext);
    if (dataUserAndIncidencias?.incidencias === undefined) {
        return <div>No hay incidencias para mostrar</div>;
    }
    const incidencias = dataUserAndIncidencias?.incidencias;
    const { query, filter, searchResults, isSearching, hasSearched } = useSearch();

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "numGuia",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        // Solo mostrar resultados si hay una búsqueda activa
        if (hasSearched && query.trim()) {
            let results = searchResults || [];

            // Aplicar filtro de sucursal a los resultados de búsqueda
            if (filter !== -1 && filter !== 0) {
                results = results.filter((incidencia) =>
                    incidencia.idSucursal === filter
                );
            }

            // Aplicar filtro de status a los resultados de búsqueda
            if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
                results = results.filter((incidencia) =>
                    Array.from(statusFilter).includes(incidencia.incidencia),
                );
            }

            return results;
        }

        // Si no hay búsqueda activa, mostrar tabla vacía
        return [];
    }, [query, statusFilter, searchResults, hasSearched, filter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Incidencia, b: Incidencia) => {
            const first = a[sortDescriptor.column as keyof Incidencia] as number;
            const second = b[sortDescriptor.column as keyof Incidencia] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((incidencia: Incidencia, columnKey: React.Key) => {
        const cellValue = incidencia[columnKey as keyof Incidencia];

        switch (columnKey) {
            case "numGuia":
                return (
                    <div className="flex justify-start items-center">
                        <p>{incidencia.numGuia}</p>
                    </div>
                );
            case "creador":
                return (
                    <User
                        name={incidencia.empleadoNombre}
                    >
                        {incidencia.empleadoId}
                    </User>
                );
            case "descripcion":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize text-default-400">{incidencia.nota}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[incidencia.resuelto]} size="sm" variant="flat">
                        {
                            incidencia.resuelto === 1 ? "Abierta" :
                                incidencia.resuelto === 2 ? "En resolución" :
                                    incidencia.resuelto === 3 ? "Solicitud de Cierre" :
                                        incidencia.resuelto === 4 ? "Cerrada" :
                                            ""
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
                        {
                            typeof cellValue === "number" ?
                                "" : formatDate(incidencia.fechaRegistro) // Formatea las fechas si no son números
                        }
                    </div>
                );
            default:
                // Aquí manejamos los valores que no son específicamente tratados en el switch
                // Si cellValue es null o undefined, lo tratamos como tal
                if (cellValue == null) {
                    return null;
                }
                // Si es de tipo `dataEscaneo`, transformamos en una cadena o mostramos una propiedad específica
                if (typeof cellValue === "object" && "descripcion" in cellValue) {
                    return <span>{(cellValue as any).descripcion}</span>; // Accede a una propiedad del objeto dataEscaneo
                }
                // Para cualquier otro tipo de valor, lo convertimos a cadena
                return cellValue.toString();
        }
    }, []);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    // Resetear página cuando cambien los filtros
    useEffect(() => {
        setPage(1);
    }, [query, filter, statusFilter]);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        {hasSearched && !isSearching && query && filteredItems.length === 0 && "No se encontraron resultados"}
                        {hasSearched && !isSearching && query && filteredItems.length > 0 && `${filteredItems.length} resultado(s) encontrado(s)`}
                    </span>
                </div>
            </div>
        );
    }, [
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        filteredItems.length,
        isSearching,
        hasSearched,
        query
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-center items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        );
    }, [selectedKeys, items.length, page, pages]);

    return (
        <Table
            aria-label="Example table with custom cells"
            isHeaderSticky
            bottomContent={bottomContent}
            topContent={topContent}
            className='max-h-[720px] overflow-scroll-x'
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={sortedItems}
                isLoading={isSearching}
                loadingContent="Buscando incidencias desde navbar..."
                emptyContent={
                    !query ? "Utiliza el buscador del navbar para encontrar incidencias" :
                        hasSearched ? "No se encontraron incidencias con ese número de guía" :
                            "No hay incidencias para mostrar"
                }
            >
                {(item) => (
                    <TableRow key={`${item.numGuia}-${item.incidencia || 'default'}`}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}