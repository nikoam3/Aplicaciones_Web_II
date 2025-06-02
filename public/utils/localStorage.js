export const addCompraOk = (compraOk) => {
    localStorage.setItem('compraOk', JSON.stringify(compraOk));
}

export const getCompraOk = () => {
    const compraOk = localStorage.getItem('compraOk');
    return compraOk ? JSON.parse(compraOk) : null;
}
export const addCarrito = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

export const getCarrito = () => {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : null;
}

