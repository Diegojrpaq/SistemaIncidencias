import {
  dataChangeStatus,
  dataSendMessage,
  Incidencia
} from "./interfaces";
import { urlServer } from "./url";

export const fetchGet = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

export const getDataByGuia = async (url: string, numGuia: string) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numGuia,
      }),
      cache: 'no-store'
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener datos de la guia: ${numGuia}`, error);
  }
}

export const sendMessage = async (dataMessage: dataSendMessage) => {
  try {
    const response = await fetch(`${urlServer}/Incidencias/setMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataMessage),
      cache: 'no-store'
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error, no se pudo enviar el mensaje`, error);
    return {
      status: 400
    }
  }
}

export const addSucursalIncidencia = async (
  idSucursal: number | undefined,
  idChat: number | undefined,
  idUser: number | undefined,
) => {
  if (
    idSucursal === undefined ||
    idChat === undefined ||
    idUser === undefined
  ) {
    return {
      status: 400,
      message: 'Faltan datos necesarios para agregar la sucursal a la incidencia',
    };
  }

  try {
    const response = await fetch(`${urlServer}/Incidencias/setSucursal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUser,
        idSucursal,
        idChat,
      }),
      cache: 'no-store'
    })
    const data = await response.json();
    return {
      status: response.status,
      message: "Sucursal agregada exitosamente",
      data,
    };
  } catch (error) {
    console.error(`Error, no se pudo agregar la sucursal a la incidencia`, error);
    return {
      status: 500,
      message: 'Error interno del servidor',
    };
  }
}

export const getEscaneo = async (numGuia: string) => {
  try {
    const response = await fetch(`${urlServer}/Incidencias/getEscaneo/${numGuia}`);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

export const fetchIncidencias = async (incidencias: Incidencia[]) => {
  const newIncidencias = await Promise.all(
    incidencias.map(async (incidencia) => {
      const dataEscaneo = await getEscaneo(incidencia.numGuia);
      if (dataEscaneo.status === 200) {
        return {
          ...incidencia,
          dataEscaneo: dataEscaneo,
        };
      } else {
        return {
          ...incidencia,
          dataEscaneo: null,
        };
      }
    })
  );
  return newIncidencias;
}

export const changeStatus = async (
  dataChangeStatus: dataChangeStatus
) => {
  if (dataChangeStatus.idUser === 0) {
    return {
      status: 400,
      message: 'Faltan datos necesarios para cambiar el estado de la incidencia',
    };
  }
  try {
    const response = await fetch(`${urlServer}/Incidencias/changeStatus`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idIncidencia: dataChangeStatus.idIncidencia,
        idStatus: dataChangeStatus.idStatus,
        idUser: dataChangeStatus.idUser,
      }),
      cache: 'no-store'
    });
    if (!response.ok) {
      return {
        status: response.status,
        message: 'Error al cambiar el estado de la incidencia',
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

export const getAllSucursales = async () => {
  try {
    const response = await fetch(`${urlServer}/Incidencias/getSucursales`);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener las sucursales: ', error);
  }
}

export const uploadImage = async (
  base64String: string,
  idChat: number,
  idUser: number
) => {
  try {
    const response = await fetch(`${urlServer}/Incidencias/setImgEvidencia`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idChat,
        idUser,
        msgText: "",
        vListFiles: [
          {
            fileCode: base64String
          }
        ]
      }),
      cache: 'no-store'
    });

    const data = await response.json();
    return {
      data,
      status: 200
    }
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return {
      status: 400,
      message: "Error al subir la imagen"
    }
  }
}