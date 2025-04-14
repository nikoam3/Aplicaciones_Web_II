import { readFile, writeFile } from 'fs/promises'


//devuelve todos los usuarios del json
export const get_usuarios_all = async () => {
    try {
        const data = await readFile('./Data/usuarios.json', 'utf-8')
        const usuarios = JSON.parse(data)
        return usuarios
    } catch (error) {
        console.error(error)
    }
}

//devuelve el usuario o indice por id
export const get_usuarios_by_id = async (id, index) => {
    try {
        const usuarios = await get_usuarios_all()
        if (index) {
            return usuarios.findIndex(u => u.id == id)
        } else {
            return usuarios.find(u => u.id == id)
        }
    } catch (error) {
        console.error(error)
    }
}

//devuelve los usuarios a traves del email
export const get_usuario_by_email = async (email) => {
    try {
        const usuarios = await get_usuarios_all()
        return usuarios.find(u => u.email == email)
    } catch (error) {
        console.error(error)
    }
}

//devuelve los usuarios a traves del apellido y nombre
export const get_usuario_by_name = async (nombre, apellido) => {
    try {
        const usuarios = await get_usuarios_all()
        return usuarios.find(u => u.nombre == nombre && u.apellido == apellido)
    } catch (error) {
        console.error(error)
    }
}

//actualiza el nombre y apellido de los usuarios
export const update_usuarios_by_name = async (newName, newLastName, index) => {
    try {
        let usuarios = await get_usuarios_all()
        usuarios[index].nombre = newName
        usuarios[index].apellido = newLastName
        await writeFile('./Data/usuarios.json', JSON.stringify(usuarios, null, 2))
    } catch (error) {
        console.error(error);
    }
}

//agrega un nuevo usuario
export const add_usuario = async (newusuario) => {
    try {
        let usuarios = await get_usuarios_all()
        usuarios.push(newusuario)
        await writeFile('./Data/usuarios.json', JSON.stringify(usuarios, null, 2))
    } catch (error) {
        console.error(error);
    }
}

//elimina un usuario 
export const delete_usuario = async (index) => {
    try {
        let usuarios = await get_usuarios_all()
        usuarios.splice(index, 1)
        await writeFile('./Data/usuarios.json', JSON.stringify(usuarios, null, 2))
    } catch (error) {
        console.error(error);
    }
}
