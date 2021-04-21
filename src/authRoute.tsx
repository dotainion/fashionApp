import React from 'react';
import { Redirect, Route } from 'react-router';
import { useStore } from './context/Context';
import { routes } from './global/routes';


const AuthRouter = ({Components}:any) =>{
    const { isSignIn } = useStore();
    return(
        <Route render={()=>{
            if (isSignIn) return <Components/>
            return <Redirect to={routes.signIn}/>
        }}/>
    )
}

export default AuthRouter;