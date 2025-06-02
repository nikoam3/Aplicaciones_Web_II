import mongoose from "mongoose"

const { Schema, model, models } = mongoose;

const productosSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    genero: {
        type: String,
        required: true,
    },
    imagen: {
        type: String
    },
    calificacion: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String
    },
    esDigital: {
        type: Boolean,
        default: false
    },
    fechaCreado: {
        type: Date,
        default: Date.now
    } 
});
let Productos = models.productos || model("productos", productosSchema);

export default Productos;

