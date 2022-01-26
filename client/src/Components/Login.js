import React,{useState,useContext,useRef,useEffect} from 'react';
import {AuthContext} from '../Context/Context';
import authService from '../Services/authService';
import Message from './Message';

const Login = props => {

    var [user,setUser] = useState({username:"", password:""});
    const authContext = useContext(AuthContext);
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

    const onSubmitHandler = e =>{
        e.preventDefault();
        authService.login(user).then(data =>{
            if(data.isAuthenticated){
            authContext.setUser(data.user);
            authContext.setisAuthenticated(true);
            props.history.push('/posts');
            }
            else{
                setMessage({msgBody:"Invalid user credentials",msgError:true});
                timerId = setTimeout(()=>{
                    setMessage(null);
                },2000)
            }
        });
    }

    const onClickHandler = e=>{
        e.preventDefault();
        props.history.push('/register');
    }

    return(
        <div>
            <form onSubmit={onSubmitHandler} className="logindiv">
                        <h2>Login</h2>
                <div className="inputdiv">
                    <label htmlFor="username" className="formLabel">Username</label><br />
                        <input type="text" className="formInput" 
                        name = "username" value={user.username} 
                        onChange = {onChange}  placeholder = "Enter Username"  />
                </div>

                <div className="inputdiv">
                    <label htmlFor="password" className="formLabel">Password</label><br />
                        <input type="password" className="formInput" 
                        name="password" value={user.password} 
                        onChange = {onChange}  placeholder = "Enter Password"  />
                </div>
                <div className="inputdiv" >
                        <button type="submit" className="btn btn-outline-dark submitButton">Login</button>
                </div>
                <h6>Dont have an account?<span onClick={onClickHandler}> SignUp</span></h6>
            </form>
            <div className="container">
                {message? <Message message={message} />:null}
            </div>
        </div>
    );

};  


export default Login;