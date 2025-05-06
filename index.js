import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import productosRouter from "./routes/productos.routes.js"
import usuariosRouter from "./routes/usuarios.routes.js"
import ventasRouter from "./routes/ventas.routes.js"
//traer nuestras variables de entorno
dotenv.config()

//crear instancia
const app = express();
const port = process.env.PORT
app.use(express.json())
app.use(cors())

//levantar nuestro front
app.use(express.static('./public'))

//levantar el servidor
app.listen(port, () => {
})

//rutas endpoint
app.use('/usuarios', usuariosRouter)
app.use('/ventas', ventasRouter)
app.use('/productos', productosRouter)