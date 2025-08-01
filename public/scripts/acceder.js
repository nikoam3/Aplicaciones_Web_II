import { addSession } from "../utils/sessionStorage.js";
import { auth } from "../auth/auth.js";
import { alert } from "../components/alerts.js";

const button = document.getElementById('buttonIniciarSesion');
const alertLogin = document.getElementById('alertLogin');

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const email = document.getElementById('inputUserName').value;
    const pass = document.getElementById('inputPassword').value;

    const credenciales = {
        email: email,
        pass: pass
    }

    if (credenciales) {
        try {
            const userLogin = await auth(credenciales);
            if (userLogin) {
                alert('Login correcto!', 'success');
                addSession(userLogin.token, userLogin.usuario);
                window.location.href = `${window.location.origin}/public/index.html`;
            } else {
                alertLogin.innerHTML = alert('Contraseña o email incorrectos', 'danger')
            }
        } catch (error) {
            console.error('Error during login:', error);
            alertLogin.innerHTML = alert('Ocurrió un error en el momento del login, intentar nuevamente.', 'warning');
        }
    } else {
        alertLogin.innerHTML = alert('No puede haber campos incompletos, por favor, complételos.', 'warning');
    }
});