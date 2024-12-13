import { Incidencia } from '@/lib/interfaces';
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader
} from '@nextui-org/react';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import { formatDate } from '@/lib/utils';
import ModalIncidencia from '../ModalIncidencia/ModalIncidencia';

interface propsCard {
    dataCard: Incidencia
}

const CardIncidencia = ({ dataCard }: propsCard) => {
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
                <span className="pt-2">
                    #Mazatlan
                    <span className="py-2" aria-label="computer" role="img">
                        💻
                    </span>
                </span>
                <span className="pt-2">
                    #Culiacan
                    <span className="py-2" aria-label="computer" role="img">
                        💻
                    </span>
                </span>
                <span className="pt-2">
                    #Guadalajara
                    <span className="py-2" aria-label="computer" role="img">
                        💻
                    </span>
                </span>
            </CardBody>

            <CardFooter className='flex w-full justify-end'>
                {/* <Button
                    variant='bordered'
                    size='md'
                >
                    Ver mas
                </Button> */}
                <ModalIncidencia
                    numGuia={dataCard.numGuia}
                    textButton='Ver mas'
                />
            </CardFooter>
        </Card>

    )
}

export default CardIncidencia