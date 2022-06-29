import moment from 'moment'

export const nameValidation = (name: string) => {
    return name.length < 3 || name.length >= 20; 
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

export const passwordValidation = (password: string | any[]) => {
    return password.length < 6 || password.length > 20;
}

export const dateValidation = (date: string) => {
    return date.length == 0 || moment().format('DD/MM/YYYY') < date
}

export const weigthValidadtion = (value: string) => {
    return value.length == 0
}

export const descriptionValidation = (name: string) => {
    return name.length <= 3 || name.length >= 200; 
}