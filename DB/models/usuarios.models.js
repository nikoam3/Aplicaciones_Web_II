import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const { Schema, model, models } = mongoose;

const usuariosSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String
  },
  contraseña: {
    type: String,
    required: true
  },
  fechaCreado: {
    type: Date,
    default: Date.now
  },
});

// Hook para hashear la contraseña antes de guardar
usuariosSchema.pre('save', async function (next) {
  const usuario = this;

  // Solo hashear la contraseña si es nueva o ha sido modificada
  if (!usuario.isModified('contraseña')) return next();

  try {
    // Generar un salt con 10 rondas
    const salt = await bcrypt.genSalt(10);
    // Hashear la contraseña
    usuario.contraseña = bcrypt.hashSync(usuario.contraseña, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
usuariosSchema.methods.compararContraseñas = async function (contraseñaInput) {
  return await bcrypt.compare(contraseñaInput, this.contraseña);
};

let Usuarios = models.usuarios || model("usuarios", usuariosSchema);

export default Usuarios;