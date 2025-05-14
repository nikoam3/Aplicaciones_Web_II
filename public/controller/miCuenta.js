import { getSession, addSession } from "../utils/sessionStorage.js";
import { updateUsuario, getById } from "../api/usuarios.js"
import { alert } from "../components/alerts.js"

document.addEventListener('DOMContentLoaded', (e) => {
    const infoUser = getSession()
    const nombre = document.getElementById('userName')
    const apellido = document.getElementById('userLastname')
    const email = document.getElementById('userEmail')
    const direccion = document.getElementById('userAddress')

    nombre.textContent = infoUser.nombre
    apellido.textContent = infoUser.apellido
    email.textContent = infoUser.email
    direccion.textContent = infoUser.direccion
})

document.getElementById('botonActualizarUsuario').addEventListener('click', async (e) => {
    e.preventDefault()

    const id = getSession().id
    const newNombre = document.getElementById('newNombre').value
    const newApellido = document.getElementById('newApellido').value
    const newEmail = document.getElementById('newEmail').value
    const newDireccion = document.getElementById('newDireccion').value
    const contraseña = getSession().contraseña

    const user = {
        id: id,
        nombre: newNombre,
        apellido: newApellido,
        email: newEmail,
        direccion: newDireccion,
        contraseña: contraseña
    }

    /*const id = getSession().id
    const nombre = newNombre
    const apellido = newApellido
    const email = newEmail
    const direccion = newDireccion
    const contraseña = getSession().contraseña*/

    const updateUsuarioOk = await updateUsuario(user)
    if (updateUsuarioOk) {
        const newUsuario = await getById({ id })
        addSession(newUsuario)
    }
})