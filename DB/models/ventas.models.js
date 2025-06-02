import mongoose from "mongoose"

const { Schema, model, models } = mongoose;

const ventasSchema = new Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'usuarios'
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    total: {
        type: Number,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    completada: {
        type: Boolean,
        required: true,
        default: false
    },
    productos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'productos'
        }
    ]
});
let Ventas = models.ventas || model("ventas", ventasSchema);

export default Ventas;