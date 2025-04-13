import express from "express"
import dotenv from "dotenv"
import productosRouter from "./routes/productos.routes.js"
import usuariosRouter from "./routes/usuarios.routes.js"
import ventasRouter from "./routes/ventas.routes.js"
//traer nuestras variables de entorno
dotenv.config()

//crear instancia
const app = express()
app.use(express.json())
const port = process.env.PORT

//levantar el servidor
app.listen(port, () => {
})

app.use('/usuarios', usuariosRouter)
app.use('/ventas', ventasRouter)
app.use('/productos', productosRouter)