import { renderNavbar } from "../components/navbar.js";

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar')
    navbar.innerHTML += renderNavbar()
})