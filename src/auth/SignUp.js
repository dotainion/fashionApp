import { IonButton, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useStore } from '../context/Context';
import { routes } from '../global/routes';
import { tools } from '../tools/Tools';


export const SignUp = () =>{
    const history = useHistory();
    const { signUp } = useStore();

    const [error, setError] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const confirmPasswordRef = useRef();

    const handlerError = (cmd=null) =>{
        if (!cmd){
            for (let id of ["signup-f","signup-l","signup-e","signup-p","signup-c"]){
                document.getElementById(id).style.border = "";
            }
        }else{
            document.getElementById(cmd).style.border = "1px solid red";
        }
    }

    const onSubmit = async() =>{
        handlerError();
        if (!firstNameRef.current.value) return handlerError("signup-f");
        if (!lastNameRef.current.value) return handlerError("signup-l");
        if (!tools.isEmailValid(emailRef.current.value)) return handlerError("signup-e");
        if (!passwordRef.current.value) return handlerError("signup-p");
        if (!confirmPasswordRef.current.value) return handlerError("signup-c");
        if (passwordRef.current.value !== confirmPasswordRef.current.value){
            handlerError("signup-p");
            return handlerError("signup-c");
        }
        const userObject = {
            email :emailRef.current.value,
            firstName :firstNameRef.current.value,
            lastName :lastNameRef.current.value,
            password: passwordRef.current.value
        }
        const response = await signUp(userObject);
        if (response.error) setError(response.error);
        else history.goBack();
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
                                        <IonLabel>Sing up</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <IonItem id="signup-f" class="item-boxed" lines="full">
                                        <IonLabel position="floating">First Name</IonLabel>
                                        <IonInput ref={firstNameRef} type="text"/>
                                    </IonItem>
                                    <IonItem id="signup-l" class="item-boxed" lines="full">
                                        <IonLabel position="floating">Last Name</IonLabel>
                                        <IonInput ref={lastNameRef} type="text"/>
                                    </IonItem>
                                    <IonItem id="signup-e" class="item-boxed" lines="full">
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput ref={emailRef} type="email"/>
                                    </IonItem>
                                    <IonItem id="signup-p" class="item-boxed" lines="full">
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput ref={passwordRef} type="password"/>
                                    </IonItem>
                                    <IonItem id="signup-c" class="item-boxed" lines="full">
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput ref={confirmPasswordRef} type="password"/>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <span className="text-hover" style={{color:"rgb(29, 134, 29)"}} onClick={()=>history.push(routes.signIn)} slot="start">Sign in</span>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonButton slot="end" onClick={onSubmit} fill="outline">Sign up</IonButton>
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