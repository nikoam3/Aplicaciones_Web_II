export const renderNavbar = (user) => {
    
    return ` <nav class="navbar navbar-expand-lg navbar-light bg-light text-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="../index.html">Inicio</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                ${user ? `
                    <li class="nav-item">
                        <a class="nav-link" href="${window.location.origin}/public/pages/miCuenta.html">Mi cuenta</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${window.location.origin}/public/pages/historialCompras.html">Historial Compras</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${window.location.origin}/public/pages/contacto.html">Contacto</a>
                    </li> 
                    <div class="ms-auto">
                        <button id="logoutBtn" class="btn btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg></button>
                    </div>`
                    : 
                    `<li class="nav-item">
                            <a class="nav-link" href="${window.location.origin}/public/pages/acceder.html">Iniciar Sesión</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${window.location.origin}/public/pages/crearUsuario.html">Crear Cuenta</a>
                    </ul>`}
                </ul>
            
            </div>
        </div>
    </nav>
    `
}