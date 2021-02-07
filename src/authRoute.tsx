import React from 'react';
import { Route } from 'react-router';
import { auth } from './auth/authentication';
import Login from './pages/authentication/Login';


const AuthRouter = (Props:any) =>{
    return(
        <Route render={()=>{
            if (auth.isLogin()){
                return(
                    <Props.component/>
                )
            }else{
                return(
                    <Login/>
                )
            }
        }}/>
    )
}

export default AuthRouter;