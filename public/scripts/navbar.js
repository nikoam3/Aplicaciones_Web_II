import { renderNavbar } from "../components/navbar.js";

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar')
    navbar.innerHTML += renderNavbar()

    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        sessionStorage.removeItem('token')
        window.location.href = '../index.html'
    })
})



