export const auth = async ({ userName, pass }) => {
    const user = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "userName": userName, "pass": pass })
    }).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Network response es no OK')
        }
    }).catch(error => {
        console.error('Problema con el fetch', error)
    })
    return user
}

