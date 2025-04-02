import {readFile} from 'fs/promises'
const file = await readFile('./data.json', 'utf-8')

const peliculas = JSON.parse(file)

//todas las peliculas que sean de un genero
const get_genero = (genero) => {
    return peliculas.filter(p => p.genero == genero)
}
//console.log(get_genero("Drama"))

//todas las peliculas que su duracion sea menor a 120 minutos
const get_duracion = () => {
    let peliculasLista = peliculas.filter(p => p.duracion <= 120)
    return peliculasLista.map(p=> p.nombre)
}

console.log(get_duracion())