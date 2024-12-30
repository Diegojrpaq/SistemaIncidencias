export interface dataUser {
    id: number,
    nombre: string,
    correo_electronico: string,
    Sucursal_principal: string,
    Destino: string,
    permiso: number[],
    catalogoSucursales: catalogoSucursales[],
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

export interface catalogoSucursales {
    id: number,
    sucursal: string,
}

export interface Mensaje {
    idUser: number,
    user: string,
    idTipoMensaje: number,
    mensaje: string,
    fechaRegistro: string,
}

export interface Participante {
    idAdmin: number,
    isActive: number,
    idEmpleado: number,
    empleado: string,
    fechaUnion: string,
}

export interface SucursalChat {
    idSucursal: number,
    sucursal: string,
    isActive: number,
    fechaUnion: string,
}

export interface chatData {
    idAdmin: number,
    admin: string,
    fechaCreacion: string,
    idChat: number,
    nombreChat: string,
    listMensajes: Mensaje[],
    listParticipantes: Participante[],
    listSucursales: SucursalChat[],
}