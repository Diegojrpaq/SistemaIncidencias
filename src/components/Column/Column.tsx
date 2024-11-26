import React from 'react'
import CardIncidencia from '@/components/CardIncidencia/CardIncidencia';

interface propsColumn {
    title: string;
}
const Column = ({ title }: propsColumn) => {
    const dataExample = {
        "numGuia": "CEL-28729",
        "fechaRegistro": "20241122",
        "cotizacionPrincipalOrigenId": 4,
        "origen": "CELAYA",
        "cotizacionPrincipalDestinoId": 21,
        "destino": "PUEBLA ",
        "volumen": 0.059,
        "peso": 99.8,
        "cantidad": 1,
        "clienteOrigenId": 94102,
        "clienteOrigenNombre": "JOSE HILARIO ROMERO MENDOZA",
        "clienteDestinoId": 209013,
        "clienteDestinoNombre": "EMMANUEL RAMIREZ JIMENEZ y o irahy josselin ramirez jimenez",
        "incidencia": 0,
        "resuelto": 0,
        "nota": "faltante de etiquetas ",
        "empleadoId": 2470,
        "empleadoNombre": "Marco Antonio Basurto de Dios"
      }
    return (
        <div className='flex flex-col bg-gray-200
    w-full rounded-lg p-3 max-w-96 shadow-lg'
        >
            <h3 className='text-center'>{title}</h3>
            <CardIncidencia dataCard={dataExample} />
        </div>
    )
}

export default Column
