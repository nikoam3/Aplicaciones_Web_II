import mongoose from "mongoose";

/*export const connectMongoDB = async (MONGODB_URI) => {
    try {
        await mongoose.connect(MONGODB_URI, {});
        console.log("Conectado al clúster de MongoDB Atlas");
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error);
        throw error; // Lanza el error para que se maneje en index.js
    }
};*/
let cachedConnection = null;

export const connectMongoDB = async (MONGODB_URI) => {
    if (cachedConnection && mongoose.connection.readyState >= 1) {
        console.log("Reutilizando conexión a MongoDB");
        return cachedConnection;
    }

    try {
        cachedConnection = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout más corto para detectar errores
            maxPoolSize: 10, // Límite de conexiones simultáneas
        });
        console.log("Conectado al clúster de MongoDB Atlas");
        return cachedConnection;
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error);
        throw error;
    }
};