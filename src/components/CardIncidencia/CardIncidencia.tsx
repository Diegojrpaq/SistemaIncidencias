import { Incidencia } from '@/lib/interfaces';
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@nextui-org/react';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import { formatDate } from '@/lib/utils';
import ModalIncidencia from '../ModalIncidencia/ModalIncidencia';

interface propsCard {
    dataCard: Incidencia
}

const CardIncidencia = ({ dataCard }: propsCard) => {
    const escaneo = dataCard.dataEscaneo;
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
                    escaneo !== null ?
                        escaneo?.scanDto?.listSucursales?.map((sucursal) => (
                            <span className="pt-2" key={dataCard.numGuia + Math.random()}>
                                #{sucursal.sucursal}
                                <span className="py-2" aria-label="computer" role="img">
                                    💻
                                </span>
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