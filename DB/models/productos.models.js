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
    },
    valoraciones: [{
        id_usuario: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'usuarios'
        },
        puntuacion: {
            type: Number,
            min: [0, "La puntuación mínima es 0"],
            max: [5, "La puntuación máxima es 5"],
        },
        fecha: {
            type: Date,
            default: Date.now
        },
    }],
    promedioValoraciones: {
        type: Number,
        default: 0,
    },
});

// Método para calcular el promedio de valoraciones
productosSchema.methods.actualizarPromedio = async function () {
    const promedio = this.valoraciones.length
        ? this.valoraciones.reduce((sum, v) => sum + v.puntuacion, 0) / this.valoraciones.length
        : 0;
    this.promedioValoraciones = Number(promedio.toFixed(2));
    await this.save();
};

let Productos = models.productos || model("productos", productosSchema);

export default Productos;

