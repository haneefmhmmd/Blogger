import React, {useState, createContext, useEffect} from 'react';
import AuthService from '../Services/authService';


 export const AuthContext = createContext();

export default ({children})=>{

    const [user, setUser]= useState({});
    const [isAuthenticated, setisAuthenticated]= useState(false);
    const [postId, setpostId]= useState({title:"Invalid",body:"Invalid"});

    useEffect(()=>{
        AuthService.isAuthenticated().then(data =>{
            setUser(data.user);
            setisAuthenticated(data.isAuthenticated);
        });
    },[]);
    return(
        <div>
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setisAuthenticated, postId, setpostId}}> 
                {children}
            </AuthContext.Provider>
        </div>
    );
}