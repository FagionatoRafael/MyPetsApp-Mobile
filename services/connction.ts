import axios from 'axios';
import {API_URL_MAIN, API_URL_DOGSANDCAT} from "@env"

export const apiMain = axios.create({
    baseURL: API_URL_MAIN,    
    timeout: 1000
}); 
// export const apiMain = axios.create({
//     baseURL: 'http://10.0.2.2:3000/',
    
//     // timeout: 1000
// })

export const apiCatsDogs = axios.create({
    baseURL: API_URL_DOGSANDCAT,
    timeout: 1000
})