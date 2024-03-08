import { useNavigate, useParams} from 'react-router-dom'
import { createTodoApi, retrieveTodoApi, updateTodoApi } from './api/TodoApiService'
import { useAuth } from './security/AuthContext'
import { useEffect, useState } from 'react'
import {Field, Formik, Form, ErrorMessage} from 'formik'
import moment from 'moment'


export default function TodoComponent(){

    const {id} = useParams()

    const [description,setDescription] = useState('')
    const [targetDate,setTargetDate] = useState('')

    const authContext = useAuth()//use useAuth to get value
    const navigate = useNavigate()

    const username = authContext.username 

    useEffect(
        () => retrieveTodos(),[id]

    )

    function retrieveTodos(){
        if(id != -1){
            retrieveTodoApi(username,id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
            }
        
    }

    function onSubmit(values){
        //create a todo object
        const todo ={
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if(id == -1){
            createTodoApi(username, todo)
            .then( response => {
                    navigate('/todos')
            })
            .catch(error => console.log(error))

             
        }else{
            updateTodoApi(username,id,todo)
            .then(response =>{
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }      
    }

    function validate(values){
        let errors = {
            // description:'Enter a valid description',
            // targetDate:'Enter a valid target date'
        }

        if(values.description.length<5){
            errors.description = 'Enter at least 5 characters'
        }

        if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()){
            //use moment to check if the target date is valid
            errors.targetDate = 'Enter a target date'
        }

        console.log(values)
        return errors
    }


    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                {/* Formik makes it really easy to handel forms */}
                <Formik initialValues={{description,targetDate}}
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}//when you click save button, then it will execute onSubmit method
                    validate = {validate}
                    validateOnChange = {false} 
                    validateOnBlur = {false}
                    // validateOnChange:default value is true,在输入框失去焦点并且值改变的时候验证
                    //validateOnBlur:default value is true,失去焦点时验证
                    >
                      {/* once the function execution completes, you would need to renitialize Formik.
                       by default Formik will not do renitialization, 
                       so we need to configure Formik to enableReinitialize={true}*/}
                
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>

                            <ErrorMessage name="target" component="div" className="alert alert-warning"></ErrorMessage>

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"></Field>
                            </fieldset>
                            <div>
                                <button type="submit" className="btn btn-success m-5">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>

        </div>
    )
}