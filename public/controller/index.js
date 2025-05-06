import { addSession } from "../utils/sessionStorage.js";
import { auth } from "../auth/auth.js";
import { alert } from "../components/alerts.js";

const button = document.getElementById('loginButton');
const alertLogin = document.getElementById('alertLogin');

button.addEventListener('click', async () => {
    const userName = document.getElementById('inputUserName').value;
    const pass = document.getElementById('inputPassword').value;

    if (userName && pass) {
        try {
            const user = await auth({ userName, pass });
            if (user) {
                alert('Login correcto!');
                addSession(user);
                window.location.href = './pages/home.html';
            } else {
                alertLogin.innerHTML = alert('Contraseña o email incorrectos', 'danger')
            }
        } catch (error) {
            console.error('Error during login:', error);
            alertLogin.innerHTML = alert('Ocurrió un error en el momento del login, internar nuevamente.', 'warning');
        }
    } else {
        alertLogin.innerHTML = alert('No puede haber campos incompletos, por favor, complételos.', 'warning');
    }
});