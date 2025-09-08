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
    let arregloFinal;
    if (escaneo !== null) {
        const arrEscaneo: escaneoData[] | null = escaneo?.scanDto.escaneo;
        const resultado = arrEscaneo?.filter(item => item.isScanned === 1)
            .reduce<Record<string, Resultado>>((acc, curr) => {
                const key = `${curr.sucursalUbicacion}-${curr.diaEscaneo}`;
                if (!acc[key]) {
                    const [fecha, hora] = curr.fechaDispositivoKardex.split(" ")
                    acc[key] = { sucursal: curr.sucursalUbicacion, total: 0, dia: fecha };
                }
                acc[key].total += 1;
                return acc;
            }, {} as Record<string, Resultado>);

        arregloFinal = resultado !== undefined
            ? Object.values(resultado).sort((a, b) => {
                const [da, ma, ya] = a.dia.split('/').map(Number);
                const [db, mb, yb] = b.dia.split('/').map(Number);
                const fechaA = new Date(ya, ma - 1, da); // ¡Importante! mes - 1
                const fechaB = new Date(yb, mb - 1, db);
                return fechaA.getTime() - fechaB.getTime();
            })
            : [];
    }
    console.log("CardIncidencia render: ", dataCard.idIncidencia, "resuelto:", dataCard.resuelto);

    return (
        <Card className={`
            pt-3 overflow-visible ${dataCard.resuelto === 3 ?
                "border-3 border-yellow-400" : ""}`}
        >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className='flex gap-5 justify-between
                items-center w-full mb-2'>

                    <div className='flex items-center gap-3 w-full'>
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
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

            <CardFooter className={
                `flex w-full 
                ${dataCard.resuelto === 3 ?
                    "flex-row justify-between" :
                    "justify-end"}`}
            >
                {
                    dataCard.resuelto === 3 ?
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
                        : ""
                }
                <ModalIncidencia
                    numGuia={dataCard.numGuia}
                    textButton='Ver mas'
                />
            </CardFooter>
        </Card>

    )
}

export default CardIncidencia