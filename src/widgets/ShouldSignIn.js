import { IonButton, IonItem } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import { useStore } from '../context/Context';
import { routes } from '../global/routes';



export const ShouldSignIn = () =>{
    const { isSignIn } = useStore();
    const history = useHistory();
    return(
        <IonItem hidden={isSignIn} lines="full">
            <IonButton onClick={()=>history.push(routes.signIn)} color="warning">Sign in to your account</IonButton>
            <IonButton onClick={()=>history.push(routes.signUp)} color="light">Sign up now</IonButton>
        </IonItem>
    )
}