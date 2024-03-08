import { apiClient } from './ApiClient'

//all the services which are making the API calls will put them in.

 // axios.get('http://localhost:8080/hello-world-bean')
        // .then(
        //     (response) => successfulResponse(response)
        //     //the parameter would be response
        // )
        // .catch((error) => errorResponse(error))
        // //catch if there is an exception,the parameter would be error
        // .finally(() => console.log('cleanup'))
        // //finally will be called irrespective of whether it's a success or a failure
        // //this is where you tipically do the cleanup

// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean')
//we want to use retrieveHelloWorldBean in welcomeComponent, so we need to export

export const retrieveHelloWorldPathVariable = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`
// , {
    // headers: {
    //     Authorization: token 
    // }
// }
)





