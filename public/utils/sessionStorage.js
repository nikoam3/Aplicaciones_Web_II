export const addSession = (token, user) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('usuario', JSON.stringify(user));
}

export const getToken = async () => {
    return sessionStorage.getItem('token');
}

export const getUserDetails = async () => {
    return JSON.parse(sessionStorage.getItem('usuario'));
}

export const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
}