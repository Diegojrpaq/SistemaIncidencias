'use client'

import React, { SVGProps, useContext } from "react";
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

export const users = [
    {
        id: 1,
        creador: "Tony Reichert",
        numGuia: "1",
        fechaRegistro: "2022-01-20",
        origen: "Guadalajara",
        destino: "Monterrey",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        creador: "Zoey Lang",
        numGuia: "2",
        fechaRegistro: "2022-01-15",
        origen: "Monterrey",
        destino: "Puebla",
        role: "Technical Lead",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        creador: "Jane Fisher",
        numGuia: "3",
        fechaRegistro: "2022-01-10",
        origen: "Puebla",
        destino: "Guadalajara",
        role: "Senior Developer",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        creador: "William Howard",
        numGuia: "4",
        fechaRegistro: "2022-01-05",
        origen: "Guadalajara",
        destino: "Monterrey",
        role: "Community Manager",
        team: "Marketing",
        status: "vacation",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        creador: "Kristen Copper",
        numGuia: "5",
        fechaRegistro: "2022-01-01",
        origen: "Monterrey",
        destino: "Guadalajara",
        role: "Sales Manager",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 6,
        creador: "Sophia Lynch",
        numGuia: "6",
        fechaRegistro: "2021-12-30",
        origen: "Guadalajara",
        destino: "Monterrey",
        role: "Product Manager",
        team: "Product",
        status: "active",
        age: "26",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "sophia.lynch@example.com",
    },
    {
        id: 7,
        creador: "Nathaniel Thompson",
        numGuia: "7",
        fechaRegistro: "2021-12-25",
        origen: "Guadalajara",
        destino: "Monterrey",
        role: "Frontend Developer",
        team: "Development",
        status: "active",
        age: "27",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "nathaniel.thompson@example.com",
    },
    {
        id: 8,
        creador: "Emma Watson",
        numGuia: "8",
        fechaRegistro: "2021-12-20",
        origen: "Monterrey",
        destino: "Guadalajara",
        role: "Backend Developer",
        team: "Development",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "emma.watson@example.com",
    },
    {
        id: 9,
        creador: "Jacob Brown",
        numGuia: "9",
        fechaRegistro: "2021-12-15",
        origen: "Monterrey",
        destino: "Guadalajara",
        role: "UX/UI Designer",
        team: "Design",
        status: "active",
        age: "31",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "jacob.brown@example.com",
    },
    {
        id: 10,
        creador: "Alfred Wilson",
        numGuia: "10",
        fechaRegistro: "2021-12-10",
        origen: "Monterrey",
        destino: "Guadalajara",
        role: "QA Engineer",
        team: "Testing",
        status: "active",
        age: "30",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "alfred.wilson@example.com",
    },
    {
        id: 11,
        creador: "Olivia Davis",
        numGuia: "11",
        fechaRegistro: "2021-12-05",
        origen: "Monterrey",
        destino: "Guadalajara",
        role: "Project Manager",
        team: "Management",
        status: "active",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "olivia.davis@example.com",
    },
    {
        id: 12,
        creador: "Emily Thompson",
        numGuia: "12",
        fechaRegistro: "2021-12-01",
        origen: "Monterrey",
        destino: "Guadalajara",
        role: "HR Manager",
        team: "Human Resources",
        status: "active",
        age: "27",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "emily.thompson@example.com",
    },
    {
        id: 13,
        creador: "Michael Johnson",
        numGuia: "13",
        fechaRegistro: "2021-11-30",
        origen: "Monterrey",
        destino: "Guadalajara",
        role: "Finance Manager",
        team: "Finance",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "michael.johnson@example.com",
    },
    {
        id: 14,
        creador: "Sarah Wilson",
        numGuia: "14",
        fechaRegistro: "2021-11-25",
        origen: "Monterrey",
        destino: "Guadalajara",
        role: "Marketing Manager",
        team: "Marketing",
        status: "active",
        age: "26",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "sarah.wilson@example.com",
    },
    {
        id: 15,
        creador: "Daniel Williams",
        numGuia: "15",
        fechaRegistro: "2021-11-20",
        origen: "Monterrey",
        destino: "Guadalajara",
        role: "Developer",
        team: "Development",
        status: "active",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026701d",
        email: "daniel.williams@example.com",
    }
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
    0: "success",
    1: "danger",
    2: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["creador", "numGuia", "fechaRegistro", "origen", "destino", "descripcion", "status", "actions"];



export default function TableIncidencias() {
    const dataUserAndIncidencias = useContext(IncidenciasContext);
    const incidencias = dataUserAndIncidencias?.incidencias;
    //type User = (typeof users)[0];
    
    const [filterValue, setFilterValue] = React.useState("");
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

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredIncidencias: Incidencia[] = [...(incidencias ?? [])];

        if (hasSearchFilter) {
            filteredIncidencias = filteredIncidencias.filter((incidencia) =>
                incidencia.numGuia.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredIncidencias = filteredIncidencias.filter((incidencia) =>
                Array.from(statusFilter).includes(incidencia.incidencia),
            );
        }

        return filteredIncidencias;
    }, [incidencias, filterValue, statusFilter]);

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
                        <p className="">{cellValue}</p>
                    </div>
                );
            case "creador":
                return (
                    <User
                        // avatarProps={{ radius: "lg", src: incidencia.empleadoNombre }}
                        description={incidencia.empleadoNombre}
                        name={cellValue}
                    >
                        {incidencia.empleadoId}
                    </User>
                );
            case "descripcion":
                return (
                    <div className="flex flex-col">
                        {/* <p className="text-bold text-sm capitalize">{cellValue}</p> */}
                        <p className="text-bold text-sm capitalize text-default-400">{incidencia.nota}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[incidencia.incidencia]} size="sm" variant="flat">
                        {
                            incidencia.incidencia === 1 ? "Abierta" : 
                            incidencia.incidencia === 0 ? "Cerrada" :
                            "En resolución"
                        }
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Tooltip content="Details">
                            {/* Agregar modal */}
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ModalIncidencia 
                                    numGuia={incidencia.numGuia}
                                    textButton="Table modal" 
                                />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            case "fechaRegistro":
                return (
                    <div className="flex justify-center">
                        {
                            typeof cellValue === "number" ?
                            "" : formatDate(cellValue)
                        }
                    </div>
                )
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Buscar por número de guía..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    {/* <span className="text-default-400 text-small">Total {users.length} users</span> */}
                    <label className="flex items-center text-default-400 text-small">
                        Filas por página:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        incidencias?.length,
        hasSearchFilter,
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
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


    return (
        <Table
            aria-label="Example table with custom cells"
            isHeaderSticky
            className='max-h-[720px] overflow-scroll-x'
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={incidencias}>
                {(item) => (
                    <TableRow key={item.numGuia}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>

        // <Table
        //     isHeaderSticky
        //     className='max-h-[720px] overflow-scroll-x'
        //     aria-label="Example table with custom cells, pagination and sorting"
        //     bottomContent={bottomContent}
        //     bottomContentPlacement="outside"
        //     classNames={{
        //         wrapper: "max-h-[720px] ",
        //     }}
        //     sortDescriptor={sortDescriptor}
        //     topContent={topContent}
        //     topContentPlacement="outside"
        //     onSelectionChange={setSelectedKeys}
        //     onSortChange={setSortDescriptor}
        // >
        //     <TableHeader columns={headerColumns}>
        //         {(column) => (
        //             <TableColumn
        //                 key={column.uid}
        //                 align={column.uid === "actions" ? "center" : "start"}
        //                 allowsSorting={column.sortable}
        //             >
        //                 {column.name}
        //             </TableColumn>
        //         )}
        //     </TableHeader>
        //     <TableBody emptyContent={"No se encontraron incidencias"} items={sortedItems}>
        //         {(item) => (
        //             <TableRow key={item.numGuia}>
        //                 {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
        //             </TableRow>
        //         )}
        //     </TableBody>
        // </Table>
    );
}
