import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`,{
    //adding Authentication header in react to Spring Boot rest api calls
        headers:{
            Authorization: token
        }
    })
//we are calling basicauth with the token which is passed in.

export const executeJwtAuthenticationService = (username, password) => apiClient.post(`/authenticate`,{username, password})
//{username,password} is object/ json structure

 





