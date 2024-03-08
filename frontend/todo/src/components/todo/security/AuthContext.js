import { createContext, useState,useContext} from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

//1: create a Context
export const AuthContext = createContext()//createContext hook

//make it easy to use context
export const useAuth = () => useContext(AuthContext)//useContext hook
//so anybody can use this useAuth and they can get access to the useContext, 
//we will export this constant out
//箭头左边的（）是useContext(AuthContext)返回的东西

//2:share the create context with other components
export default function AuthProvider({children}){

    //3:put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    //setInterval( () => setNumber(number+1),10000)
    //every 10 seconds, we are incrementing the value of number

    //const valueToBeShared = {number,isAuthenticated,setAuthenticated}

    // async function login(username,password){
       
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password) 
    //     //get a basic authentication token

    //     try{

    //         const response = await executeBasicAuthenticationService(baToken)
    //         //we will wait for the executeBasicAuthenticationService to execute and retrun us a response back

    //         // if(username==='ying' && password==='123'){
    //         if(response.status == 200){ //200 means we are getting a successful response back
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.Authorization = baToken 
    //                     return config
    //                 })

    //             return true
    //             //redirect to the welcome component.
    //             //navigate from one component to another component
    //         }else{
    //             // setAuthenticated(false)
    //             // setUsername(null)
    //             // setToken(null)
    //             logout()
    //             return false
    //         }
    //     }catch(error){
    //         // setAuthenticated(false)
    //         // setUsername(null)
    //         // setToken(null)
    //         logout()
    //         return false
    //     }// when we are aplimenting authentication, it's very important to be safe and that's why we added try catch in here
    // }

    async function login(username,password){
        try{

            const response = await executeJwtAuthenticationService(username, password)

            if(response.status == 200){ //200 means we are getting a successful response back

                const jwtToken = 'Bearer ' + response.data.token

                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken 
                        return config
                    })

                return true
                //redirect to the welcome component.
                //navigate from one component to another component
            }else{
                // setAuthenticated(false)
                // setUsername(null)
                // setToken(null)
                logout()
                return false
            }
        }catch(error){
            // setAuthenticated(false)
            // setUsername(null)
            // setToken(null)
            logout()
            return false
        }// when we are aplimenting authentication, it's very important to be safe and that's why we added try catch in here
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return(
        <AuthContext.Provider value= {{isAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>
    )
}//provide the context to all the children of AuthProvider(<provider> in TodoApp.jsx)
//other component can access to the username by authContext.username
//send token out so that other rest APIs can make use of it.






