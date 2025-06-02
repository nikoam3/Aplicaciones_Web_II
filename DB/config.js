import mongoose from "mongoose";
import dotenv from "dotenv";
import Productos from "./models/productos.models.js";
import Usuarios from "./models/usuarios.models.js";
import Ventas from "./models/ventas.models.js";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI

let cached = global.mongoose || { conn: null, promise: null };

export const connectMongoDB = async () => {
    if (!MONGODB_URI) {
        throw new Error("No se ha definido la URI de MongoDB");
    }
    if (cached.conn) {
        return cached.conn;
    }
    cached.promise = cached.promise || await mongoose.connect(MONGODB_URI, {
        dbName: "AWII",
        bufferCommands: false,
    })
    //inicializo los models si no están inicializados
    Productos();
    Usuarios();
    Ventas();

    cached.conn = await cached.promise;

    return cached.conn;
}