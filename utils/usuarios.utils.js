import { readFile, writeFile } from 'fs/promises'

const data = await readFile('./Data/usuarios.json', 'utf-8')
const usuarios = JSON.parse(data)

//devuelve todos los usuarios del json
export const get_usuarios_all = () => {
    return usuarios
}

//devuelve el usuario por id
export const get_usuarios_by_id = (id) => {
    return usuarios.find(u => u.id == id)
}

//devuelve la ubicacion del indice a traves del ID en el json 
export const get_index_usuarios_by_id = (id) => {
    return usuarios.findIndex(u => u.id == id)
}

//devuelve los usuarios a traves del email
export const get_usuario_by_email = (email) => {
    return usuarios.find(u => u.email == email)
}

//devuelve los usuarios a traves del apellido y nombre
export const get_usuario_by_name = (nombre, apellido) => {
    return usuarios.find(u => u.nombre == nombre && u.apellido == apellido)
}

//actualiza el nombre y apellido de los usuarios
export const update_usuarios_by_name = (newName, newLastName, index) => {
    const usuarios = get_usuarios_all()
    usuarios[index].nombre = newName
    usuarios[index].apellido = newLastName
    writeFile('./Data/usuarios.json', JSON.stringify(usuarios, null, 2))
}

//agrega un nuevo usuario
export const add_usuario = (newusuario) => {
    const usuarios = get_usuarios_all()
    usuarios.push(newusuario)
    writeFile('./Data/usuarios.json', JSON.stringify(usuarios, null, 2))
}

//elimina un usuario 
export const delete_usuario = (index) => {
    const usuarios = get_usuarios_all()
    usuarios.splice(index, 1)            
    writeFile('./Data/usuarios.json', JSON.stringify(usuarios, null, 2))
}
