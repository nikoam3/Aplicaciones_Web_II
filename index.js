import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import productosRouter from "./routes/productos.routes.js"
import usuariosRouter from "./routes/usuarios.routes.js"
import ventasRouter from "./routes/ventas.routes.js"
import mongoose from "mongoose";
import http from "http";

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
const server = http.createServer(app);

await mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Mongodb connected");
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});
