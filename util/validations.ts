import moment from 'moment'

export const nameValidation = (name: string) => {
    return name.length < 3;
}

export const emailValidation = (email: string) => {
    return !String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export const passwordValidation = (password: string | any[]) => {
    return password.length < 6 || password.length > 20;
}

export const dateValidation = (date: string) => {
    return date === '' || moment(date, 'DD/MM/YYYY').fromNow().split(' ')[0] === 'in'
}

export const dateAgendaValidation = (date: string) => {
    return date === '' || (moment(date, 'DD/MM/YYYY').fromNow().split(' ')[2] == 'ago' && moment(date, 'DD/MM/YYYY').fromNow().split(' ')[0] == 'a')
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

export const statusValidation = (value: number) => {
    return value <= 200 || value > 300
}