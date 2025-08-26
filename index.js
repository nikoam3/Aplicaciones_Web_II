import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import productosRouter from "./routes/productos.routes.js"
import usuariosRouter from "./routes/usuarios.routes.js"
import ventasRouter from "./routes/ventas.routes.js"
import mongoose from "mongoose";
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

/*app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  try {
    await connectMongoDB(process.env.MONGODB_URI)
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
});*/

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});

/*
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});
*/
//test