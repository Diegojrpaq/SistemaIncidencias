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