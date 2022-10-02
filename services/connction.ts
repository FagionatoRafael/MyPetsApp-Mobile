import axios from 'axios';

export const apiMain = axios.create({
    baseURL: 'https://my-pets-app-api.herokuapp.com/',    
    // timeout: 1000
}); 
// export const apiMain = axios.create({
//     baseURL: 'http://10.0.2.2:3000/',
    
//     // timeout: 1000
// })

export const apiCatsDogs = axios.create({
    baseURL: 'https://petsapimy.herokuapp.com/',
    timeout: 1000
})