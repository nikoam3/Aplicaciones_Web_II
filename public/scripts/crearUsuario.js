import { addUsuario } from "../api/usuarios.js";
import { alert } from "../components/alerts.js";

const nombreInput = document.getElementById("registerNombre");
const apellidoInput = document.getElementById("registerApellido");
const emailInput = document.getElementById("registerEmail");
const telefonoInput = document.getElementById("registerTelefono");
const passwordInput = document.getElementById("registerPassword");
const direccionInput = document.getElementById("registerDireccion");
const passwordInputRepet = document.getElementById("registerPasswordConfirm");
const alertCrearUsuarioHTML = document.getElementById('alertCrearUsuario')

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const nombre = nombreInput.value
        const apellido = apellidoInput.value
        const email = emailInput.value
        const telefono = telefonoInput.value
        const contraseña = passwordInput.value
        const direccion = direccionInput.value
        const contraseñaRepet = passwordInputRepet.value

        if (contraseña !== contraseñaRepet) {
            alertCrearUsuarioHTML.innerHTML = alert("Las contraseñas no coinciden", "danger");
            alertCrearUsuarioHTML.hidden = false;
            return;
        }

        const user = {
            nombre,
            apellido,
            email,
            telefono,
            contraseña,
            direccion
        };

        const newUsuario = await addUsuario(user);

        if (newUsuario) {
            let segundos = 5;
            alertCrearUsuarioHTML.hidden = false;
            setInterval(() => {
                alertCrearUsuarioHTML.innerHTML = alert(`
                    Usuario creado con éxito! Por favor vuelva a inicie sesión. 
                    <br> Será redirigido en ${segundos}`, 'success')
                segundos--;
                if (segundos <= 0) {
                    window.location.href = '../index.html';
                }
            }, 1000);
        }

    } catch (error) {
        alertCrearUsuarioHTML.hidden = false;
        alertCrearUsuarioHTML.innerHTML = alert(`
            Error al crear usuario
            <br> 
            ${error.message}`,
            "danger");
    }
}
);