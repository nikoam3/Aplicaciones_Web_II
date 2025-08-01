import { renderNavbar } from "../components/navbar.js";
import { getUserDetails } from "../utils/sessionStorage.js";

document.addEventListener('DOMContentLoaded', async () => {
    const user = await getUserDetails();
    const navbar = document.getElementById('navbar')
    navbar.innerHTML += renderNavbar(user)
    if (user) {
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('usuario')
            window.location.href = `${window.location.origin}/public/index.html`;
        })
    }
})



