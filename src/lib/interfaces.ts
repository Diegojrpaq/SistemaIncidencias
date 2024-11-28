export interface dataUser {
    id: number,
    nombre: string,
    correo_electronico: string,
    sucursal_principal: string,
    destino: string,
    permiso: number[],
}

export interface dataResponse {
    status: number,
    User: dataUser
}

export interface Incidencia {
    numGuia: string,
    fechaRegistro: string,
    cotizacionPrincipalOrigenId: number,
    origen: string,
    cotizacionPrincipalDestinoId: number,
    destino: string,
    volumen: number,
    peso: number,
    cantidad: number,
    clienteOrigenId: number,
    clienteOrigenNombre: string,
    clienteDestinoId: number,
    clienteDestinoNombre: string,
    incidencia: number,
    resuelto: number,
    nota: string,
    empleadoId: number,
    empleadoNombre: string
}

//descripcion, empleado_puesto, Resuelto, empleado_registra, fecha_registro_incidencia, is_paqueteria, numGuiaproporcionaddo, sucursal_incidencia
export interface IncidenciaDataModal extends Incidencia{
    descripcion: string,
    empleado_puesto: string,
    Resuelto: number,
    empleado_registra: string,
    fecha_registro_incidencia: string,
    is_paqueteria: number,
    numGuiaproporcionado: string,
    sucursal_incidencia: string
}