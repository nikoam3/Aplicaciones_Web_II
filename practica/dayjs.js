console.log("holis")
//la forma clasica
const fechaActual = new Date()

const año = fechaActual.getFullYear()
const mes = (fechaActual.getMonth()+1).toString().padStart(2, '0')
const dia = fechaActual.getDate().toString().padStart(2,'0')

const formatoBBDD = `${año} + ${mes} + ${dia}`
console.log(formatoBBDD)

const formatoES = `${dia} + ${mes} + ${año}`
console.log(formatoES)

//utilizando la libreria dayjs
import dayjs from "dayjs"
const fechaActualdayjs = dayjs()
const formatoBBDDdayjs = fechaActualdayjs.format('YYYY-MM-DD')
const formatoESdayjs = fechaActualdayjs.format('DD-MM-YYYY')
console.log(formatoBBDDdayjs)
console.log(formatoESdayjs)

