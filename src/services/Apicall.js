// Apicall.js
import axios from 'axios';

export const baseUrl = "https://test-api.crgroups.in";

export const API = {
    empLogin: "/api/account/login",
    empMpin: "/api/account/mpinlogin",
    empSetMpin: "/api/account/setmpin",
    empForgotPassword:"/api/account/forgotpassword",
    emplistlinerun:"/api/integration/listlinerun",
    integrationStartLineRun:"/api/integration/Startlinerun",
    integrationAddeditLineRun:"/api/integration/Addeditlinerun",
    integrationviewlinerun:"/api/integration/viewlinerun",
    integrationGeteditLineRun:"/api/integration/geteditlinerun",
    integrationPlacementsForLineRun:"/api/integration/placementsforlinerun",
    integrationLoadDataForDataEntry:"/api/integration/loaddatafordataentry",
    integrationDataEntry:"/api/integration/dataentry",
    integrationBodyWeightEntry:"/api/integration/bodywtentry",
    integrationAdjustmentEntry:"/api/integration/adjustmententry",
    integrationLoadDataForBodyWeightEntry:"/api/integration/loaddataforbodywt",
    userUserList:"/api/user/userlist",
    mastersLineList:"/api/masters/linelist",
    mastersLineRunPurpose:"/api/masters/linerunpurpose",
    eventDescription: "/manPower/api/v1/manPower/eventDescription/01fbf745-17be-46fe-aa8d-08e51fa44a90",
    myEvents: "/manPower/api/v1/manPower/eventListing?filter_attribute=email"   
};

const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
};

export const ApiMethod = {
  
    POST: (url, data) => {
        return axios.post(baseUrl + url, data, { headers: headers });
    },

    POST_WITH_TOKEN: (url,data, token) => {
        const headersWithToken = {
            ...headers,
            'Authorization': `Bearer ${token}`

        };
        const fullUrl = baseUrl + url;
    
        console.log('Request URL:', fullUrl);
        console.log('Request Headers:', headersWithToken);
        console.log('Request data:', data)
        return axios.post(fullUrl, data, { headers: headersWithToken })  
    },

    GET: (url, data) => {
        return axios.get(baseUrl + url,data, { headers: headers });
    },

    GET_WITH_TOKEN: (url, token) => {
        const headersWithToken = {
            ...headers,
            'Authorization': `Bearer ${token}`
        };
        return axios.get(baseUrl + url, { headers: headersWithToken });
    }
};
