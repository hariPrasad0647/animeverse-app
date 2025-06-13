import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
import './index.css'


const Login = () =>{

    const initialValues = { userName: "", password: "" }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate()

    const handelChange = (e) =>{
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
    }
    
    const handelSubmit =(e) =>{
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }

    const validate = (values) =>{
        const errors = {}

        if(!values.userName){
            errors.userName = "Please Enter Your userName"
        }
        if(!values.password){
            errors.password = "Please Enter Your password"
        }
        return errors
    }

    const onSubmitSuccess = (jwt) =>{
        Cookies.set('Jwt_Token', jwt, {expires: 30})
        navigate("/")
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        const finalData = {
            userName: formValues.userName,
            password: formValues.password,
        }

        fetch(process.env.REACT_APP_LOGIN_API, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData),
        })
        .then(async res => {
            const data = await res.json()
            if (res.ok === true) {
                onSubmitSuccess(data.jwt_token)
            } else {
                console.log("Login Failed:", data.error_msg)
            }
        })
        .catch(err => {
            console.error("Fetch error:", err)
        })
    }
  }, [formErrors])

    

    return(
       <div  className='hp-container'>
            <form onSubmit={handelSubmit} className="form-container">
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={formValues.userName} name="userName" onChange={handelChange}/>
                    <p>{formErrors.userName}</p>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={formValues.password} name="password" onChange={handelChange} />
                    <p>{formErrors.password}</p>
                </div>
                <button>Login</button>
            </form>
            
       </div> 
    )
}

export default Login