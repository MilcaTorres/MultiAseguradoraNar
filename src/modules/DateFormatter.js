/*
Este componente se encargará de poder cambiar algunos parametros de la 
fecha según sea la necesidad
*/

export const Months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
]

export const getMonthAsText = month => Months[month];

export const getDateWithCero = date => {
    return parseInt(date) <= 9 ? `0${date}` : date
};