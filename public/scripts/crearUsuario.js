import { addUsuario } from "../api/usuarios.js";
import { alert } from "../components/alerts.js";

const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("inputUserName");
const telefonoInput = document.getElementById("telefono");
const passwordInput = document.getElementById("inputPassword");
const direccionInput = document.getElementById("direccion");
const passwordInputRepet = document.getElementById("inputPasswordRepet");
const alertCrearUsuarioHTML = document.getElementById('alertCrearUsuario')

document.getElementById("formAddUsuario").addEventListener("submit", async (event) => {
    event.preventDefault();
});

document.getElementById("crearUsuario").addEventListener("click", async (e) => {
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
                    window.location.href = '/public/index.html';
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