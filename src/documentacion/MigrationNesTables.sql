/* CREATE TABLE usuarios (
    id bigint primary key generated always as identity,
    nombre text not null,
    email text unique not null,
    fecha_registro timestamp with time zone default now()
);
 */

/*  CREATE TABLE incidencias (
    id bigint primary key generated always as identity,
    id_estatus bigint not null,
    id_tipo_incidencia bigint,
    descripcion text,
    fecha_creacion timestamp with time zone default now(),
    fecha_actualizacion timestamp with time zone default now(),
    usuario_creador text not null,
    id_usuario bigint,
    comentario_cierre text,
    FOREIGN KEY (id_estatus) REFERENCES catalogo_estatus_incidencia(id),
    FOREIGN KEY (id_tipo_incidencia) REFERENCES tipo_incidencias(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
); */

/* CREATE TABLE tipo_incidencias (
    id bigint primary key generated always as identity,
    nombre text not null,
    descripcion text,
    fecha_creacion timestamp with time zone default now()
); */

/* CREATE TABLE permisos (
    id bigint primary key generated always as identity,
    nombre text not null,
    descripcion text,
    fecha_creacion timestamp with time zone default now()
); */

/* CREATE TABLE usuario_permisos (
    id bigint primary key generated always as identity,
    id_usuario bigint not null,
    id_permiso bigint not null,
    fecha_asignacion timestamp with time zone default now(),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_permiso) REFERENCES permisos(id)
); */


/*Version sintaxis para mariadb*/
/* Esta version se implementara en capacitacion el dia 21/10/2024 para calar el desarrollo de las apis y websockets necesarios para el chat */


CREATE TABLE incidencia_viaje_estatus (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    genera_columna BOOLEAN 
);/*virificada en Capacitacion*/

CREATE TABLE incidencia_configuracion_Alertas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tiempo_espera INT,
    a_quien_notifica BIGINT
);/*virificada en Capacitacion*/


CREATE TABLE incidencia_log_estatus (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_incidencia BIGINT NOT NULL,
    id_estatus_anterior BIGINT,
    id_estatus_nuevo BIGINT NOT NULL,
    id_empleado_modifica BIGINT NOT NULL,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_incidencia) REFERENCES viaje_incidencia(id),
    FOREIGN KEY (id_estatus_anterior) REFERENCES incidencia_viaje_estatus(id),
    FOREIGN KEY (id_estatus_nuevo) REFERENCES incidencia_viaje_estatus(id),
    FOREIGN KEY (id_empleado_modifica) REFERENCES empleado_principal(id)
);/*virificada en Capacitacion*/

CREATE TABLE chat_incidencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nombre VARCHAR(255) NOT NULL,
    id_incidencia BIGINT,
    id_empleado_creador BIGINT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    fecha_borrado TIMESTAMP,
    tipo_chat BIGINT not null,
    FOREIGN KEY (id_incidencia) REFERENCES viaje_incidencia(id),
    FOREIGN KEY (id_empleado_creador) REFERENCES empleado_principal(id)
);/*virificada en Capacitacion*/

CREATE TABLE chat_miembro (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_chat BIGINT NOT NULL,
    id_empleado BIGINT NOT NULL,
    fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_chat) REFERENCES chat_incidencias(id),
    FOREIGN KEY (id_empleado) REFERENCES empleado_principal(id)
);/*virificada en Capacitacion*/

CREATE TABLE chat_tipo_mensaje (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo TEXT NOT NULL,
    descripcion TEXT
);/*virificada en Capacitacion*/

CREATE TABLE chat_mensaje (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_chat BIGINT NOT NULL,
    id_user BIGINT NOT NULL,
    mensaje TEXT,
    id_tipo_mensaje BIGINT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_received BOOLEAN DEFAULT FALSE,
    date_received DATETIME default null,
    is_read BOOLEAN DEFAULT FALSE,
    fecha_leido DATETIME default null,
    is_deleted BOOLEAN DEFAULT FALSE,
    fecha_borrado DATETIME default null,
    mensaje_status int default 1,
    FOREIGN KEY (id_tipo_mensaje) REFERENCES tipo_mensajes(id),
    FOREIGN KEY (id_chat) REFERENCES chat_incidencias(id),
    FOREIGN KEY (id_user) REFERENCES empleado_principal(id)
);/*virificada en Capacitacion*/



CREATE TABLE chat_sucursal_involucrada (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_chat BIGINT NOT NULL,
    id_sucursal BIGINT NOT NULL,
    fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_chat) REFERENCES chat_incidencias(id),
    FOREIGN KEY (id_sucursal) REFERENCES sucursal_principal(id)
);/*virificada en Capacitacion*/


/*Alters */
/*modificacion para viaje_transacciones*/
ALTER TABLE viaje_transacciones
ADD COLUMN id_sucursal INT;  -- Ajusta el tipo de dato si es necesario
ALTER TABLE viaje_transacciones
ADD CONSTRAINT fk_id_sucursal
FOREIGN KEY (id_sucursal) REFERENCES sucursal_principal(id)
ON DELETE CASCADE ON UPDATE CASCADE;
/*virificada en Capacitacion*/


/*modificacion para viaje_incidencia*/
ALTER TABLE viaje_Incidencia
ADD COLUMN id_sucursal INT;  -- Ajusta el tipo de dato si es necesario
ALTER TABLE viaje_Incidencia
ADD CONSTRAINT fk_id_sucursal
FOREIGN KEY (id_sucursal) REFERENCES sucursal_principal(id)
ON DELETE CASCADE ON UPDATE CASCADE;
/*tablas para permisos*/