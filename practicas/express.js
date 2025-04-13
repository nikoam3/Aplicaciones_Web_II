import express from "express";
import dotenv from "dotenv"
import { readFile, writeFile } from 'fs/promises'

//traer nuestras variables de entorno
dotenv.config()

//crear instancia
const app = express()
app.use(express.json())
const port = process.env.PORT

//levantar el servidor
app.listen(port, () => {
})

//Manejo de datos
const objetos = [
    { name: "Auto", color: "Rojo" },
    { name: "Arbol", color: "Verde" },
    { name: "Rio", color: "Marron" },
    { name: "Casa", color: "Amarillo" },
]
const data = await readFile('./data.json', 'utf-8')
const peliculas = JSON.parse(data)

//definicion de rutas
app.post('/colorDe/:objeto', (req, res) => {
    const obj = req.body.objeto
    const result = colorDe(obj)
    if (result) {
        res.status(200).json(result)
    } else {
        res.status(400).json(`${obj} no encontrado`)
    }

})
app.post('/peliculas/:id', (req, res) => {
    const peliculaId = req.params.id
    try {
        const pelicula = peliculas.find(e => e.nombre == peliculaId)
        if (pelicula) {
            res.status(200).json(pelicula)
        } else {
            res.status(400).json(`${id} no encontrado`)
        }
    } catch (error) {

    }
})

app.get('/peliculas/all', (req, res) => {
    res.status(200).json(peliculas)
})

app.put('/peliculas/clasificacion/update/:id', (req, res) => {
    const peliculaId = req.params.id
    const newClasificacion = req.body.clasificacion

    try {
        const index = peliculas.findIndex(e => e.nombre == peliculaId)
        if (index != -1) {
            peliculas[index].clasificacion = newClasificacion
            writeFile('./data.json', JSON.stringify(peliculas))
            res.status(200).json(`Clasificacion de ${id} actualizada correctamente`)
        } else {
            res.status(400).json(`${id} no encontrado`)
        }
    } catch (error) {
        res.send(500).json(error)
    }
})

app.delete('/peliculas/delete/:id', (req, res) => {
    const peliculaId = req.params.id

    try {
        const index = peliculas.findIndex(e => e.nombre == peliculaId)
        if (index != -1) {
            peliculas.splice(index,1)
            writeFile('./data.json', JSON.stringify(peliculas))
            res.status(200).json(`${id} eliminada correctamente`)
        } else {
            res.status(400).json(`${id} no encontrado`)
        }
    } catch (error) {
        res.send(error)
    }
})



const colorDe = (objeto) => {
    return objetos.find(e => e.name == objeto)
}