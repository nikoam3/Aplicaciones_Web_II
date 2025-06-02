import { getUserDetails, logout } from "../utils/sessionStorage.js";
import { updateUsuario } from "../api/usuarios.js"
import { alert } from "../components/alerts.js";

const nombreInput = document.getElementById('nombre')
const apellidoInput = document.getElementById('apellido')
const emailInput = document.getElementById('email')
const direccionInput = document.getElementById('direccion')
const telefonoInput = document.getElementById('telefono')
const infoUser = await getUserDetails()

document.getElementById('formModificarUsuario').addEventListener('submit', (e) => {
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', async (e) => {
    nombreInput.value = infoUser.nombre
    apellidoInput.value = infoUser.apellido
    emailInput.value = infoUser.email
    direccionInput.value = infoUser.direccion
    telefonoInput.value = infoUser.telefono
})

document.getElementById('botonEditar').addEventListener('click', (e) => {
    nombreInput.removeAttribute('disabled')
    nombreInput.setAttribute('class', 'form-control')
    apellidoInput.removeAttribute('disabled')
    apellidoInput.setAttribute('class', 'form-control')
    emailInput.removeAttribute('disabled')
    emailInput.setAttribute('class', 'form-control')
    direccionInput.removeAttribute('disabled')
    direccionInput.setAttribute('class', 'form-control')
    telefonoInput.removeAttribute('disabled')
    telefonoInput.setAttribute('class', 'form-control')
    document.getElementById('botonGuardar').removeAttribute('disabled')
})

document.getElementById('botonGuardar').addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        const _id = infoUser._id
        const newNombre = nombreInput.value
        const newApellido = apellidoInput.value
        const newEmail = emailInput.value
        const newDireccion = direccionInput.value
        const newTelefono = telefonoInput.value

        const newUser = {
            _id: _id,
            nombre: newNombre,
            apellido: newApellido,
            email: newEmail,
            direccion: newDireccion,
            telefono: newTelefono
        }

        const updateUsuarioOk = await updateUsuario(newUser)

        if (updateUsuarioOk) {
            let segundos = 5;
            setInterval(() => {
                document.getElementById('alertaModificarUsuario').innerHTML = alert(`
                    Usuario modificado con éxito! Por favor vuelva a inicar sesión. 
                    <br> Será redirigido en ${segundos}`, 'success')
                segundos--;
                if (segundos <= 0) {
                    logout();
                    window.location.href = '/public/index.html';
                }
            }, 1000);

        } else {
            document.getElementById('alertaModificarUsuario').innerHTML = alert('Error al modificar el usuario, por favor, <br> intente nuevamente.', 'danger')
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}
)