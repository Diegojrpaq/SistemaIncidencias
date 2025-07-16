
export function formatDate(dateStr: string): string {
  // Extraer el año, mes y día de la cadena
  const year = parseInt(dateStr.slice(0, 4));  // año
  const month = parseInt(dateStr.slice(4, 6)) - 1;  // mes (restar 1 porque los meses en JavaScript empiezan en 0)
  const day = parseInt(dateStr.slice(6, 8));  // día

   const date = new Date(dateStr);

  // Formatear fecha 'DD/MM/YYYY'
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Mexico_City', // asegura que no haya desfase
  });

}

export function getDateAndTimeFormat(dateTime: Date | string): string {
  //Si es string
  const fecha = (typeof dateTime === 'string') ? new Date(dateTime) : dateTime;

  // Verificamos si el parámetro ya es una fecha válida
  if (isNaN(fecha.getTime())) {
    return 'Fecha inválida'; // Si la fecha es inválida, devolvemos un mensaje de error
  }

    // Obtener la hora en formato de 12 horas
    let hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();
    
    const ampm = hora >= 12 ? 'p.m.' : 'a.m.'; // Determinar si es AM o PM
    hora = hora % 12; // Convertir a formato de 12 horas
    hora = hora ? hora : 12; // Si la hora es 0 (medianoche), cambiar a 12
    
    // Asegurarse de que minutos y segundos tengan dos dígitos
    const minutosFormateados = minutos.toString().padStart(2, '0');
    const segundosFormateados = segundos.toString().padStart(2, '0');
    
    // Usamos toLocaleString para devolver la fecha y hora formateada
    return fecha.toLocaleString('es-ES', { 
      weekday: 'long', // Día de la semana (lunes, martes, etc.)
      year: 'numeric', // Año con 4 dígitos
      month: 'long',   // Mes con nombre completo (enero, febrero, etc.)
      day: 'numeric',  // Día del mes
    }) + `, ${hora}:${minutosFormateados} ${ampm}`; // Añadir AM/PM

  // Usamos toLocaleString para devolver la fecha y hora formateada
  // return fecha.toLocaleString('es-ES', { 
  //   weekday: 'long', // Día de la semana (lunes, martes, etc.)
  //   year: 'numeric', // Año con 4 dígitos
  //   month: 'long',   // Mes con nombre completo (enero, febrero, etc.)
  //   day: 'numeric',  // Día del mes
  //   hour: '2-digit', // Hora con 2 dígitos
  //   minute: '2-digit', // Minutos con 2 dígitos
  //   second: '2-digit', // Segundos con 2 dígitos
  // });
  // const date = dateTime;
  // return date.toLocaleString(); // Formato legible para personas
}


// function obtenerFechaYHora(param: string | Date): string {
//   // Si el parámetro es un string, lo convertimos a un objeto Date
//   const fecha = (typeof param === 'string') ? new Date(param) : param;

//   // Verificamos si la fecha es válida
//   if (isNaN(fecha.getTime())) {
//     return 'Fecha inválida'; // Si la fecha es inválida, devolvemos un mensaje de error
//   }

//   // Obtener los componentes de la fecha
//   const dia = fecha.getDate().toString().padStart(2, '0'); // Día del mes (con 2 dígitos)
//   const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes (con 2 dígitos)
//   const año = fecha.getFullYear(); // Año con 4 dígitos

//   // Obtener la hora en formato de 12 horas
//   let hora = fecha.getHours();
//   const minutos = fecha.getMinutes();
//   const segundos = fecha.getSeconds();
  
//   const ampm = hora >= 12 ? 'PM' : 'AM'; // Determinar si es AM o PM
//   hora = hora % 12; // Convertir a formato de 12 horas
//   hora = hora ? hora : 12; // Si la hora es 0 (medianoche), cambiar a 12
  
//   // Asegurarse de que minutos y segundos tengan dos dígitos
//   const minutosFormateados = minutos.toString().padStart(2, '0');
//   const segundosFormateados = segundos.toString().padStart(2, '0');
  
//   // Formato de fecha: dd/mm/yyyy
//   const fechaFormateada = `${dia}/${mes}/${año}`;

//   // Devolver la fecha y la hora en formato legible con AM/PM
//   return `${fechaFormateada} ${hora}:${minutosFormateados}:${segundosFormateados} ${ampm}`;
// }
