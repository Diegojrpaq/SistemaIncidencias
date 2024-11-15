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

CREATE TABLE incidencia_viaje_estatus (
    id bigint primary key generated always as identity,
    nombre text not null,
    descripcion text,
    fecha_registro timestamp with time zone default now()
);

CREATE TABLE incidencia_historial_estatus (
    id bigint primary key generated always as identity,
    id_incidencia bigint not null,
    id_estatus_anterior bigint,
    id_estatus_nuevo bigint not null,
    id_usuario bigint not null,
    tipo_movimiento text not null,
    fecha_cambio timestamp with time zone default now(),
    FOREIGN KEY (id_incidencia) REFERENCES incidencias(id),
    FOREIGN KEY (id_estatus_anterior) REFERENCES catalogo_estatus_incidencia(id),
    FOREIGN KEY (id_estatus_nuevo) REFERENCES catalogo_estatus_incidencia(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


CREATE TABLE chat_empresarial (
    id bigint primary key generated always as identity,
    fecha_creacion timestamp with time zone default now(),
    nombre text not null,
    id_incidencia bigint,
    id_creador bigint not null,
    is_active boolean default false,
    fecha_borrado timestamp with time zone,
    FOREIGN KEY (id_incidencia) REFERENCES incidencias(id),
    FOREIGN KEY (id_creador) REFERENCES usuarios(id)
);

CREATE TABLE chat_miembro (
    id bigint primary key generated always as identity,
    id_chat bigint not null,
    id_usuario bigint not null,
    fecha_union timestamp with time zone default now(),
    is_active boolean default true,
    is_admin boolean default false,
    FOREIGN KEY (id_chat) REFERENCES chat(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE chat_mensaje (
    id bigint primary key generated always as identity,
    id_chat bigint not null,
    id_user bigint not null,
    id_tipo_mensaje bigint;
    fecha_registro timestamp with time zone default now(),
    is_received boolean,
    date_received timestamp with time zone,
    is_read boolean,
    fecha_leido timestamp with time zone,
    is_deleted boolean default false,
    fecha_borrado timestamp with time zone,
    foreign key (id_tipo_mensaje) references tipo_mensajes (id);
    FOREIGN KEY (id_chat) REFERENCES chat(id),
    FOREIGN KEY (id_user) REFERENCES usuarios(id)
);

create table tipo_mensajes (
  id bigint primary key generated always as identity,
  tipo text not null,
  descripcion text
);

/*Version sintaxis para mariadb*/
/* Esta version se implementara en capacitacion el dia 21/10/2024 para calar el desarrollo de las apis y websockets necesarios para el chat */

CREATE TABLE incidencia_viaje_estatus (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE incidencia_historial_estatus (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_incidencia BIGINT NOT NULL,
    id_estatus_anterior BIGINT,
    id_estatus_nuevo BIGINT NOT NULL,
    id_empleado_modifica BIGINT NOT NULL,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_incidencia) REFERENCES viaje_incidencia(id),
    FOREIGN KEY (id_estatus_anterior) REFERENCES catalogo_estatus_incidencia(id),
    FOREIGN KEY (id_estatus_nuevo) REFERENCES catalogo_estatus_incidencia(id),
    FOREIGN KEY (id_empleado_modifica) REFERENCES empleado_principal(id)
);

CREATE TABLE chat_empresarial (
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
);

CREATE TABLE chat_miembro (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_chat BIGINT NOT NULL,
    id_empleado BIGINT NOT NULL,
    fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_chat) REFERENCES chat_empresarial(id),
    FOREIGN KEY (id_empleado) REFERENCES empleado_principal(id)
);

CREATE TABLE chat_mensaje (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_chat BIGINT NOT NULL,
    id_empleado BIGINT NOT NULL,
    id_tipo_mensaje BIGINT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_received BOOLEAN DEFAULT FALSE,
    date_received TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    fecha_leido TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    fecha_borrado TIMESTAMP,
    FOREIGN KEY (id_tipo_mensaje) REFERENCES tipo_mensajes(id),
    FOREIGN KEY (id_chat) REFERENCES chat_empresarial(id),
    FOREIGN KEY (id_user) REFERENCES empleado_principal(id)
);

CREATE TABLE tipo_mensajes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo TEXT NOT NULL,
    descripcion TEXT
);
