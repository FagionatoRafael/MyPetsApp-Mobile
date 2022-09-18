import axios from 'axios';

export const apiMain = axios.create({
    baseURL: 'https://my-pets-app-api.herokuapp.com/',    
    timeout: 1000
}); 

export const apiCatsDogs = axios.create({
    baseURL: 'https://petsapimy.herokuapp.com/',
    timeout: 1000
})