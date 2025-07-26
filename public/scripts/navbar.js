import { renderNavbar } from "../components/navbar.js";
import { getUserDetails } from "../utils/sessionStorage.js";

document.addEventListener('DOMContentLoaded', async () => {
    const user = await getUserDetails();
    const navbar = document.getElementById('navbar')
    navbar.innerHTML += renderNavbar(user)
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        sessionStorage.removeItem('token')
        window.location.href = '../index.html'
    })
})



