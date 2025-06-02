import { addSession } from "../utils/sessionStorage.js";
import { auth } from "../auth/auth.js";
import { alert } from "../components/alerts.js";

const button = document.getElementById('loginButton');
const alertLogin = document.getElementById('alertLogin');

button.addEventListener('click', async () => {
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
                alert('Login correcto!');
                addSession(userLogin.token, userLogin.usuario);
                window.location.href = './pages/home.html';
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