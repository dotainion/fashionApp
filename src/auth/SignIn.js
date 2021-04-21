import { IonButton, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useStore } from '../context/Context';
import { routes } from '../global/routes';


export const SignIn = () =>{
    const history = useHistory();
    const { signIn } = useStore();

    const [error, setError] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const rememberCreds = useRef();

    const onSubmit = async() =>{
        setError("");
        const response = await signIn(emailRef.current.value, passwordRef.current.value);
        if (response.error){
            setError(response.error);
        }else{
            if (rememberCreds.current.checked){
                //tools.creds.remember(emailRef.current.value, passwordRef.current.value);
            }else{
                //tools.creds.forget();
            }
            history.goBack();
        }
    }
    const onEnterKeyPress = (e) =>{
        if (e.key === "Enter") onSubmit();
    }
    return(
        <IonPage className="page">
            <IonContent>
                <IonGrid class="full-height">
                    <IonRow>
                        <IonCol size-md="4" offset-md="7">
                            <IonCard class="" onKeyPress={onEnterKeyPress}>
                                <IonCardContent>
                                    <IonItem class="main-header text-center" lines="none">
                                        <IonLabel>Fashion-App</IonLabel>
                                    </IonItem>
                                    <IonList class="text-center">
                                        <IonLabel>Login</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <IonItem class="item-boxed" lines="full">
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput ref={emailRef} type="email"/>
                                    </IonItem>
                                    <IonItem class="item-boxed" lines="full">
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput ref={passwordRef} type="password"/>
                                    </IonItem>
                                    <IonItem>
                                        <IonCheckbox ref={rememberCreds}/>
                                        <IonLabel>&nbsp;Remember Me</IonLabel>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <span className="text-hover" style={{color:"red"}} onClick={()=>{}}>Forget password?</span>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <span className="text-hover" style={{color:"rgb(29, 134, 29)"}} onClick={()=>{}} slot="start">Create Account</span>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonButton slot="end" onClick={onSubmit} fill="outline">Login</IonButton>
                                    </IonItem>
                                    <IonList lines="none" style={{padding:"20px"}}>
                                        <button onClick={()=>history.push(routes.sales)} className="btn-strong">Continue Shopping...</button>
                                    </IonList>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}