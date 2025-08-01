import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {});
        console.log("Conectado al clúster de MongoDB Atlas");
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error);
        throw error; // Lanza el error para que se maneje en index.js
    }
};