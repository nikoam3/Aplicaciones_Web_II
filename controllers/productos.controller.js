import Productos from "../DB/models/productos.models.js";

export const get_productos_all = async (req, res) => {
    try {
        const productos = await Productos.find()
        if (productos.length) {
            return res.status(200).json(productos)
        } else {
            return res.status(404).json({ messege: "Productos no encontrados" })
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const get_productos_by_id = async (req, res) => {
    try {
        const producto = await Productos.findById(req.params._id)
        if (producto) {
            return res.status(200).json(producto)
        } else {
            return res.status(404).json({ message: `No se encuentra ID ${req.params._id}` })
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const get_productos_by_price = async (req, res) => {
    const precio = req.params.precio
    try {
        const productos = await Productos.find({ precio: { $lte: precio } })
        if (productos.length) {
            return res.status(200).json(productos)
        } else {
            return res.status(404).json(`No se encuentran productos por debajo del precio $ ${precio}`)
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const get_productos_by_genero = async (req, res) => {
    const genero = req.params.genero
    try {
        const productos = await Productos.find({ genero })
        if (productos.length) {
            return res.status(200).json(productos)
        } else {
            return res.status(404).json({ message: `Genero ${genero} no encontrado` })
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const get_productos_by_calificacion = async (req, res) => {
    const calificacion = req.params.calificacion
    try {
        const productos = await Productos.find({ calificacion })
        if (productos.length) {
            return res.status(200).json(productos)
        } else {
            return res.status(404).json({ message: `No se encuentran productos con calificación ${calificacion}` })
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const add_producto = async (req, res) => {
    try {
        const newProducto = await Productos.create(req.body);
        if (newProducto) {
            return res.status(201).json(newProducto)
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: `El ID ${req.body._id} ya está en uso` });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const delete_producto = async (req, res) => {
    try {
        const producto = await Productos.findByIdAndDelete(req.params._id);
        if (producto) {
            return res.status(204).json(producto);
        } else {
            return res.status(404).json({ message: `No se encontró el producto con ID ${req.params._id}` });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}
export const search_productos_by_name = async (req, res) => {
    try {
        const nombre = req.params.nombre
        const query = {};

        // Búsqueda por nombre (parcial, insensible a mayúsculas)
        if (nombre) {
            query.nombre = { $regex: nombre, $options: "i" };
        }
        const productos = await Productos.find(query);
        if (productos.length) {
            return res.status(200).json(productos);
        } else {
            return res.status(404).json({ message: `No se encontró el producto con nombre ${nombre}` });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

// Nuevo endpoint para añadir valoraciones
export const add_valoracion_product = async (req, res) => {
    try {
        const { puntuacion, userId } = req.body;

        const producto = await Productos.findById(req.params._id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        const yaCalificado = producto.valoraciones.some(v => v.id_usuario.toString() === userId);
        if (yaCalificado) {
            return res.status(400).json({ error: "Ya has calificado este producto" });
        }
        // Añadir valoración
        producto.valoraciones.push({
            id_usuario: userId,
            puntuacion: Number(puntuacion)
        });

        res.status(201).json({
            message: "Valoración añadida",
            producto: {
                _id: producto._id,
                nombre: producto.nombre,
                promedioValoraciones: producto.promedioValoraciones,
                valoraciones: producto.valoraciones,
            },
        });
        // Actualizar promedio
        await producto.actualizarPromedio();

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
};