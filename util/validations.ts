export const nameValidation = () => {

}

export const emailValidation = (email: string) => {
    const user = email.split('@')[0];
    const dominio = email.includes('@') ? email.split('@')[1] : '';

    return user.length === 0 ||
        user.length < 3 || 
        dominio.length === 0 ||
        dominio.length < 3 ||
        !email.includes('@')
}

export const passwordValidation = (password) => {
    return password.length < 6;
}
