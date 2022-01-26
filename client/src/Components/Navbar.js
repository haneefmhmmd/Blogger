import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from '../Context/Context';
import authService from '../Services/authService';
import '../App.css';
const Navbar = (props) =>{

    const {setUser,isAuthenticated,setisAuthenticated} = useContext(AuthContext);
    const history = useHistory();
    const onClickHandler = (e)=>{
        e.preventDefault();
        // console.log('in handler');
        authService.logout().then(data =>{
            if(data.success){
                sessionStorage.removeItem("selectedPost");
                setUser(data.user);
                setisAuthenticated(false);
                history.push('/');
            }
        });
    }
    const unAuthenticatedNavbar = ()=>{
        return(
            <>
                <Link to="/">
                <p className="navbar-brand">Blogger</p> 
                </Link>
                <Link to = "/login">
                    <button className="navButton btn btn-outline-light" type="submit">Login</button>
                </Link>  
            </>
        );
    }

    const AuthenticatedNavbar = ()=>{
        return(
            <>         
                <Link to="/posts">
                    <p className="navbar-brand">Blogger</p>    
                </Link>
                <Link to="/">
                    <p className="navbar-brand">All Posts</p>    
                </Link>
                <Link to="/posts">
                    <p className="navbar-brand">My Posts</p>    
                </Link>
                <button className="navButton  btn btn-outline-light" 
                    type="submit" onClick={onClickHandler}>
                    Logout
                </button>
            </>
        );
    }

    return(
        <nav className="navbar navbar-dark bg-dark py-2">
        {   isAuthenticated ? AuthenticatedNavbar() : unAuthenticatedNavbar()}  
        </nav> 
    );
}


export default Navbar;

