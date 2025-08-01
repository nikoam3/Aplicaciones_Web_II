import Ventas from "../DB/models/ventas.models.js";

export const get_ventas_all = async (req, res) => {
    try {
        const ventas = await Ventas.find()
        if (ventas.length) {
            return res.status(200).json(ventas)
        } else {
            return res.status(404).json({ messege: "Ventas no encontrados" })
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const get_ventas_by_id = async (req, res) => {
    try {
        const venta = await Ventas.findById(req.params._id)

        if (venta) {
            return res.status(200).json(venta)
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

export const get_detail_ventas = async (req, res) => {
    try {
        const venta = await Ventas.find()
            .populate('id_usuario', 'nombre')
            .populate('productos', 'nombre');
        if (!venta) {
            return res.status(404).json({ message: `No se encontró la venta con ID ${req.params._id}` });
        }
        return res.status(200).json(venta)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const get_detail_by_id_user_ventas = async (req, res) => {
    try {
        const venta = await Ventas.find({ id_usuario: req.params._id })
            .populate('id_usuario', 'nombre') // Poblar usuario, solo _id, nombre, email
            .populate('productos', 'nombre imagen precio valoraciones') 
        if (!venta) {
            return res.status(404).json({ message: `No se encontró la venta con ID ${req.params._id}` });
        }
        return res.status(200).json(venta)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const update_ventas = async (req, res) => {
    try {
        const actualizarCampos = {};
        if (req.body.id_usuario) actualizarCampos.id_usuario = req.body.id_usuario;
        if (req.body.direccion) actualizarCampos.direccion = req.body.direccion;
        if (req.body.total) actualizarCampos.total = req.body.total;
        if (req.body.completada !== undefined) actualizarCampos.completada = req.body.completada;
        if (req.body.ventas) actualizarCampos.ventas = req.body.ventas;

        const actualizarVenta = await Ventas.findByIdAndUpdate(
            req.params._id,
            { $set: actualizarCampos },
            {
                new: true,
                runValidators: true
            }
        )
        if (actualizarVenta) {
            return res.status(200).json(actualizarVenta);
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: `El ID ${_id} ya está en uso` });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const add_venta = async (req, res) => {
    try {
        const nuevaVenta = await Ventas.create(req.body);
        if (nuevaVenta) {
            return res.status(201).json(nuevaVenta);
        }else {
            return res.status(400).json({ message: error.message });
        }
    } catch (error) {
        console.error('Error al agregar venta:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: error.message });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const delete_venta = async (req, res) => {
    try {
        const venta = await Ventas.findByIdAndDelete(req.params._id);
        if (venta) {
            return res.status(204).json(venta);
        } else {
            return res.status(404).json({ message: `No se encontró la venta con ID ${req.params._id}` });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}
