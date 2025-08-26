import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import productosRouter from "./routes/productos.routes.js"
import usuariosRouter from "./routes/usuarios.routes.js"
import ventasRouter from "./routes/ventas.routes.js"
import { connectMongoDB } from "./DB/config.js"
//traer nuestras variables de entorno
dotenv.config({ path: '.env' })

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
// Iniciar el servidor
const PORT = process.env.PORT || 3000; 
const MONGODB_URI = process.env.MONGODB_URI

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  try {
    await connectMongoDB(MONGODB_URI)
      .then(() =>
        console.log(`Servidor corriendo en el puerto ${PORT} y conectado a MongoDB Atlas`)
      ).catch((err) => {
        console.error("Error al conectar a MongoDB Atlas:", err);
        process.exit(1); // Detiene la app si la conexión falla
      });
  } catch (err) {
    console.error("Error al conectar a MongoDB Atlas:", err);
    process.exit(1);
  }
});