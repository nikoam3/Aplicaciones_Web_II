import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import productosRouter from "./routes/productos.routes.js"
import usuariosRouter from "./routes/usuarios.routes.js"
import ventasRouter from "./routes/ventas.routes.js"
import { connectMongoDB } from "./DB/config.js"
//traer nuestras variables de entorno
dotenv.config({ path: '.env' })
const port = process.env.PORT || 3000;

//crear instancia
const app = express();

app.use(express.json())
app.use(cors())

//rutas endpoint
app.use('/usuarios', usuariosRouter)
app.use('/ventas', ventasRouter)
app.use('/productos', productosRouter)

//levantar nuestro front
app.use(express.static('./public'))

await connectMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB Atlas:", err);
    process.exit(1); // Detiene la app si la conexión falla
  });