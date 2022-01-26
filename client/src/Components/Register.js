import React,{useState, useEffect, useRef} from 'react';
import authService from '../Services/authService';
import Message from './Message';

const Register = props => {

    var [user,setUser] = useState({username:"", password:"",email :""});
    var [message,setMessage] = useState(null);
    var timerId = useRef(null);

    useEffect(()=>{
        return  ()=>{
            clearTimeout(timerId);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{  
        setUser({username :"", password :"", email:""});
    }

    const onClickHandler = e=>{
        e.preventDefault();
        props.history.push('/login');
    }


    const onSubmitHandler = e =>{
        e.preventDefault();
        authService.register(user).then(data =>{
            const {message} = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerId = setTimeout(()=>{
                    props.history.push('/login');
                },2000);
            }
            else{
                timerId = setTimeout(()=>{
                    setMessage(null);
                },2000);
            }
        });
    }

    return(
        <div>
            <form onSubmit={onSubmitHandler} className="Registrationdiv">
                <h2>Sign Up</h2>
                <div className="inputdiv">
                    <label htmlFor="email" className="formLabel">Email</label>
                        <input type="email" className="formInput" 
                        name="email" value={user.email} 
                        onChange = {onChange} placeholder = "Enter email" />            
                </div>

                <div className="inputdiv">
                    <label htmlFor="username" className="formLabel">Username</label>
                        <input type="text" className="formInput" 
                        name = "username" value={user.username} 
                        onChange = {onChange}  placeholder = "Enter Username"  />
                </div>

                <div className="inputdiv">
                    <label htmlFor="password" className="formLabel">Password</label>
                        <input type="password" className="formInput" 
                        name="password" value={user.password} 
                        onChange = {onChange}  placeholder = "Enter Password"  />
                </div>
                <div className="inputdiv">
                        <button type="submit" className="btn btn-outline-dark submitButton">Sign Up</button>
                </div>
                <h6>Already have an account?<span onClick={onClickHandler}> login</span></h6>
        </form>
        <div className="container">
            {message? <Message message={message} />:null}
        </div>
    </div>
    
    );

};  


export default Register;