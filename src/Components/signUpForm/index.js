import { useEffect, useState } from "react"
import './index.css'


const SignUpForm = () =>{

    const initialValues = {name: "", userName: "", password: "", password2: "", }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

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
        if(!values.name){
            errors.name = "Please Enter Your Name"
        }
        if(!values.userName){
            errors.userName = "Please Enter Your userName"
        }
        if(!values.password){
            errors.password = "Please Enter Your password"
        }
        if(!values.password2){
            errors.password2 = "Please Re-Enter Your Password"
        }
        if(values.password !== values.password2){
            errors.doNotMatchPasswords = "Passwords Must Match"
        }
        return errors
    }

    useEffect( ()=>{
        const submitData = async() =>{
            if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues)
            const finalData = {
                name: formValues.name,
                userName: formValues.userName,
                password: formValues.password
            }
            await fetch(process.env.REACT_APP_SIGNUP_API, {
                method: "POST",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(finalData)
            })
            .then(res => res.json())
            .then((data)=>{
                console.log(data)
                setFormValues(initialValues)
            })
            .catch((e)=>{
                console.log(e.message)
            })
        }
        }
        submitData();

    },[formErrors, isSubmit])
    

    return(
       <div  className='hp-container'>
            <form onSubmit={handelSubmit} className="form-container">
                <h1>Sign Up</h1>
                <div>
                    <label htmlFor="name">Enter your Name</label>
                    <input type="text" id="name" value={formValues.name} name="name" onChange={handelChange}/>
                    <p>{formErrors.name}</p>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={formValues.userName} name="userName" onChange={handelChange}/>
                    <p>{formErrors.userName}</p>
                </div>
                <div>
                    <label htmlFor="password">Create Password</label>
                    <input type="password" id="password" value={formValues.password} name="password" onChange={handelChange} />
                    <p>{formErrors.password}</p>
                </div>
                <div>
                    <label htmlFor="password2">Enter Password Again</label>
                    <input type="password" id="password2" value={formValues.password2} name="password2" onChange={handelChange}/>
                    <p>{formErrors.password2}</p>
                </div>
                <button>Create</button>
            </form>
            
       </div> 
    )
}

export default SignUpForm