
export function formatDate(dateStr: string): string {
    // Extraer el año, mes y día de la cadena
    const year = parseInt(dateStr.slice(0, 4));  // año
    const month = parseInt(dateStr.slice(4, 6)) - 1;  // mes (restar 1 porque los meses en JavaScript empiezan en 0)
    const day = parseInt(dateStr.slice(6, 8));  // día

    const date = new Date(year, month, day);
  
    // Formatear fecha 'DD/MM/YYYY'
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  
    return formattedDate;
  }