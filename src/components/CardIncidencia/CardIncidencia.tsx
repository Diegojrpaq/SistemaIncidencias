import { Incidencia } from '@/lib/interfaces';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader
} from '@nextui-org/react';
import MenuDropdown from '../MenuDropdown/MenuDropdown';

interface propsCard {
    dataCard: Incidencia
}

const CardIncidencia = ({ dataCard }: propsCard) => {
    return (
        <Card className="pt-3 overflow-visible">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className='flex gap-5 justify-between
                items-center w-full'>
                    <div className='flex'>
                        <p className="text-sm font-bold">NumGuia: {dataCard.numGuia}</p>
                    </div>
                    <MenuDropdown />
                </div>
                <small className="text-default-500">Destino: {dataCard.destino}</small>
                <small className="text-default-500">Fecha: {dataCard.fechaRegistro}</small>
                <small className="text-default-500">Creado por: {dataCard.empleadoNombre}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <h4 className="font-bold text-md">Motivo: {dataCard.nota}</h4>
            </CardBody>

            <CardFooter className='flex w-full justify-end'>
                <Button
                    variant='bordered'
                    size='md'
                >
                    Ver mas
                </Button>
            </CardFooter>
        </Card>

    )
}

export default CardIncidencia