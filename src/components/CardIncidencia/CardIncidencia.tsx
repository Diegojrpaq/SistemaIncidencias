import { escaneoData, Incidencia } from '@/lib/interfaces';
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
} from '@nextui-org/react';
import { FaInfoCircle } from "react-icons/fa";
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import { formatDate } from '@/lib/utils';
import ModalIncidencia from '../ModalIncidencia/ModalIncidencia';

interface propsCard {
    dataCard: Incidencia
}

interface Resultado {
    sucursal: string;
    total: number;
    dia: string;
};

const CardIncidencia = ({ dataCard }: propsCard) => {
    const escaneo = dataCard.dataEscaneo;
    const itemsTotal = escaneo?.scanDto.numItems;

    // Calcular días abiertos
    const fechaRegistro = new Date(dataCard.fechaRegistro);
    const ahora = new Date();
    const diferenciaDias = Math.ceil(
        (ahora.getTime() - fechaRegistro.getTime()) / (1000 * 60 * 60 * 24)
    );


    // Determinar si está en solicitud de cierre o en riesgo por días (3 o más)
    const esSolicitudCierre = dataCard.resuelto === 3;
    const esAntigua = !esSolicitudCierre && diferenciaDias >= 3;

    // Clase de borde
    const bordeClase =
        dataCard.resuelto === 4
            ? "" // No pinta nada si está resuelto = 4
            : esSolicitudCierre
                ? "border-3 border-yellow-400"
                : esAntigua
                    ? "border-3 border-red-500"
                    : "";


    let arregloFinal;
    if (escaneo !== null) {
        const arrEscaneo: escaneoData[] | null = escaneo?.scanDto.escaneo;
        const resultado = arrEscaneo?.filter(item => item.isScanned === 1)
            .reduce<Record<string, Resultado>>((acc, curr) => {
                const key = `${curr.sucursalUbicacion}-${curr.diaEscaneo}`;
                if (!acc[key]) {
                    const [fecha] = curr.fechaDispositivoKardex.split(" ");
                    acc[key] = { sucursal: curr.sucursalUbicacion, total: 0, dia: fecha };
                }
                acc[key].total += 1;
                return acc;
            }, {} as Record<string, Resultado>);

        arregloFinal = resultado !== undefined
            ? Object.values(resultado).sort((a, b) => {
                const [da, ma, ya] = a.dia.split('/').map(Number);
                const [db, mb, yb] = b.dia.split('/').map(Number);
                const fechaA = new Date(ya, ma - 1, da);
                const fechaB = new Date(yb, mb - 1, db);
                return fechaA.getTime() - fechaB.getTime();
            })
            : [];
    }

    return (
        <Card className={`pt-3 overflow-visible ${bordeClase}`}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className='flex gap-5 justify-between items-center w-full mb-2'>
                    <div className='flex items-center gap-3 w-full'>
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src="/assets/JR Logo - Editado.png"
                        />
                        <p className="text-sm font-bold">NumGuia: {dataCard.numGuia}</p>
                    </div>
                    <MenuDropdown
                        idIncidencia={dataCard.idIncidencia}
                        idEmpleadoOpenIncidencia={dataCard.empleadoId}
                        numGuia={dataCard.numGuia}
                        estadoIncidencia={dataCard.resuelto}
                    />
                </div>
                <small className="text-default-500">Fecha: {formatDate(dataCard.fechaRegistro)}</small>
                <small className="text-default-500">Creado por: {dataCard.empleadoNombre}</small>
                <small className="text-default-500">Destino Incidencia: {dataCard.destino}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <h4 className="font-bold text-md">Descripcion: {dataCard.descripcion}</h4>
                <h4 className="font-bold text-md">Nota: {dataCard.nota}</h4>
                {
                    arregloFinal !== undefined ?
                        arregloFinal.map((sucursal) => (
                            <span className="pt-4 text-sm" key={dataCard.numGuia + Math.random()}>
                                <Chip
                                    size='sm'
                                    radius='sm'
                                    color='primary'
                                >
                                    #{sucursal.sucursal}
                                </Chip>
                                <Chip
                                    size="sm"
                                    className="ml-2"
                                    radius='sm'
                                    classNames={{
                                        base: "bg-white border-1 border-[#ffb340]",
                                        content: "bg-white",
                                    }}
                                >
                                    Items: {sucursal.total}/{itemsTotal}
                                </Chip>
                                <Chip
                                    size='sm'
                                    className="ml-2"
                                    radius='sm'
                                    classNames={{
                                        base: "bg-white border-1 border-[#606162]",
                                        content: "bg-white",
                                    }}
                                >
                                    📆{sucursal.dia}
                                </Chip>
                            </span>
                        )) : <p className="text-md text-default-500">No se escaneo</p>
                }
            </CardBody>

            <CardFooter className={`flex w-full ${esSolicitudCierre || esAntigua ? "flex-row justify-between" : "justify-end"}`}>
                {
                    esSolicitudCierre && (
                        <div
                            className='flex items-center p-1 text-sm 
                            border-1 border-gray-500 rounded-md 
                            mr-2 bg-gray-100'
                        >
                            <div>
                                <FaInfoCircle size={28} color='orange' />
                            </div>
                            <div className='px-2'>
                                <div className='font-semibold'>
                                    Solicitud de cierre
                                </div>
                                <div className='text-pretty text-xs'>
                                    El empleado que abrió la
                                    incidencia debe cerrarla.
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    esAntigua && dataCard.resuelto !== 4 && (
                        <div
                            className='flex items-center p-1 text-sm 
                            border-1 border-gray-500 rounded-md 
                            mr-2 bg-red-100'
                        >
                            <div>
                                <FaInfoCircle size={28} color='red' />
                            </div>
                            <div className='px-2'>
                                <div className='font-semibold'>
                                    Incidencia abierta 3 días o más
                                </div>
                                <div className='text-pretty text-xs'>
                                    Revisa el estado de esta incidencia, lleva {diferenciaDias} días abierta.
                                </div>
                            </div>
                        </div>
                    )
                }
                <ModalIncidencia
                    numGuia={dataCard.numGuia}
                    textButton='Ver mas'
                />
            </CardFooter>
        </Card>
    )
}

export default CardIncidencia;
