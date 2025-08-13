// Apicall.js
import axios from 'axios';

export const baseUrl = "https://testserver.biztechnovations.com";
// export const baseUrl = "https://devserver.biztechnovations.com";
export const endPoint = {
    postauthendication: '/web/session/authenticate',
    postcreatevisit: '/web/dataset/call_kw',
};
const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
};

export const ApiMethod = {
    POST: (url, data) => {
        return axios.post(baseUrl + url, data, {
            headers: headers,
            withCredentials: true
        });
    }
};
