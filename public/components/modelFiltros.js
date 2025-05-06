export const modalFiltroGenero = (data) => {
    return `
        <label for="selectFilterGenero" class="form-label">Género</label>
            <select id="selectFilterGenero" class="form-select">
            <option value="" selected>Todos</option>
            ${data.map(g => `<option value="${g}">${g}</option>`).join('')}            
            </select>`
}

export const modalFiltroCalificacion = (data) => {
    return `
        <label for="selectFilterCalificacion" class="form-label">Calificación</label>
        <select id="selectFilterCalificacion" class="form-select">
            <option value="" selected>Todos</option>
            ${data.map(c => `<option value="${c}">${c}</option>`).join('')}            
        </select>`
}