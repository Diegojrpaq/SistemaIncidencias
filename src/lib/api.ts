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
      //mode: 'no-cors',
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify({
        numGuia,
      }),
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener datos de la guia: ${numGuia}`, error);
  }
}