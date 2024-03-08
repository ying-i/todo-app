import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function LoginComponent(){
    //useState will return an array(two things): 1.first element:current state 
    //2.second elememnt:a function to update state
    const [username,setUsername] = useState('')

    const [password,setPassword] = useState('')

    const [showErrorMessage,setShowErrorMessage] = useState()

    const navigate = useNavigate();

    const authContext = useAuth()


    function handelUsernameChange(event){
        setUsername(event.target.value)
    }

    function handelPasswordChange(event){
        setPassword(event.target.value)
    }

    async function handelSubmit(){
        if(await authContext.login(username,password)){ 
            //wait for this to return a value back. 
            //we want to navigate to this page only after authContext.login method has completed execution, that's why we use await
            navigate(`/welcome/${username}`)
            //redirect to the welcome component.
            //navigate from one component to another component
        }else{
            setShowErrorMessage(true)
        }
    }
    
    // function SuccessMessageComponent(){
    //     if(showSuccessMessage){
    //         return(
    //             <div className="sucessMessage">Authenticated Successfully</div>
    //         )
    //     }else{
    //         return null
    //     }
    // }

    // function ErrorMessageComponent(){
    //     if(showErrorMessage){
    //         return(
    //             <div>Authentication failed. Please check your credentials</div>
    //         )
    //     }else{
    //         return null
    //     }
    // }

    return(
        <div className="LoginComponent">
            <h1>Time to Login!</h1>
            {/* if showSuccessMessage is true, then it will show  <div className="sucessMessage">Authenticated Successfully</div>
            if showSuccessMessage is false, then it wont show <div className="sucessMessage">Authenticated Successfully</div>*/}

           {showErrorMessage &&  <div>Authentication failed. Please check your credentials</div>}

            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name={username} onChange={handelUsernameChange}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name={password} onChange={handelPasswordChange}></input>
                </div>
                <div>
                    <button type="button" name="login" onClick={handelSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent