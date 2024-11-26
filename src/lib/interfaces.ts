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