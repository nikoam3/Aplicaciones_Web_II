export const alert = (mensaje, tipoAlert) => {

    return `<div class="alert alert-${tipoAlert} alert-dismissible fade show" role="alert">
            <p class="m-0">${mensaje}</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
}