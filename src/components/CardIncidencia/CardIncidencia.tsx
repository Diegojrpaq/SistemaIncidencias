import { escaneoData, Incidencia } from '@/lib/interfaces';
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
} from '@nextui-org/react';
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

        arregloFinal = resultado !== undefined ? Object.values(resultado) : [];
    }

    return (
        <Card className="pt-3 overflow-visible">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className='flex gap-5 justify-between
                items-center w-full mb-2'>

                    <div className='flex items-center gap-3 w-full'>
                        <Avatar isBordered radius="full" size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                        <p className="text-sm font-bold">NumGuia: {dataCard.numGuia}</p>
                    </div>
                    <MenuDropdown />
                </div>
                <small className="text-default-500">Destino: {dataCard.destino}</small>
                <small className="text-default-500">Fecha: {formatDate(dataCard.fechaRegistro)}</small>
                <small className="text-default-500">Creado por: {dataCard.empleadoNombre}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <h4 className="font-bold text-md">Motivo: {dataCard.nota}</h4>
                {
                    arregloFinal !== undefined ?
                        arregloFinal.map((sucursal) => (
                            <span className="pt-4 text-sm" key={dataCard.numGuia + Math.random()}>
                                <Chip
                                    size='sm'
                                    radius='sm'
                                    color='primary'
                                    //variant='bordered'
                                    // classNames={{
                                    //     base: "bg-white border-1 border-[#464df2]",
                                    //     content: "bg-white",
                                    // }}
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

            <CardFooter className='flex w-full justify-end'>
                <ModalIncidencia
                    numGuia={dataCard.numGuia}
                    textButton='Ver mas'
                />
            </CardFooter>
        </Card>

    )
}

export default CardIncidencia