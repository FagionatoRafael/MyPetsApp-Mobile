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
    return date === '' || moment(date, 'DD/MM/YYYY').fromNow().split(' ')[0] === 'in'
}

export const dateAgendaValidation = (date: string) => {
    return date === '' || moment(date, 'DD/MM/YYYY').fromNow().split(' ')[2] == 'ago'
}

export const timeValidation = (beginningTime: string, endTime: string) => {
    return beginningTime.length === 0 
        || endTime.length === 0 
        || moment(beginningTime, 'HH:mm').isAfter(moment(endTime, 'HH:mm'))
}

export const weigthValidadtion = (value: string) => {
    return value.length == 0
}

export const descriptionValidation = (name: string) => {
    return name.length <= 3 || name.length >= 200; 
}

export const cardAgendaValidation = (arr: number[]) => {
    return arr.length === 0
}