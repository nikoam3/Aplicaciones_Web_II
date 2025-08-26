import mongoose from "mongoose";

export const connectMongoDB = async (MONGODB_URI) => {
    try {
        await mongoose.connect(MONGODB_URI, {});
        console.log("Conectado al clúster de MongoDB Atlas");
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error);
        throw error; // Lanza el error para que se maneje en index.js
    }
};