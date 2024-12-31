import { dataSendMessage } from "./interfaces";
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
  }
}