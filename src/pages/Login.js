import React, { Component } from 'react';
import { withIonLifeCycle, IonPage, IonItem, IonLabel, IonInput, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonButton, IonCheckbox } from '@ionic/react';
import tools from '../components/Tools';
import { TextStyle } from '../widgets/textStyle';
import './Login.css';
import { routes } from '../global/routes';
import { auth } from '../auth/authentication';


class Login extends Component{
    constructor(){
        super();

        this.userCreds = {
            username:"",
            password:"",
        }

        this.errorText = "";

        this.rememberChecked = false;
    }

    ionViewWillEnter(){
        var creds = tools.getCreds();
        if (creds){
            this.userCreds.username = creds.username;
            this.userCreds.password = creds.password;
            this.setState({
                username:this.userCreds.username,
                password:this.userCreds.password
            });
            this.rememberChecked = true;
        }
    }

    login(){
        const { history } = this.props;
        this.errorText = "";
        const res = auth.signIn(this.userCreds.username,this.userCreds.password);
        if (res){
            history.push(routes.profile);
        }
    }

    render(){
        var { username, password } = this.userCreds;
        var MARGIN = tools.compare(tools.platform(),true,"10%","35%");
        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{tools.MSG.APPNAME}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent class="login-main-container">
                    <IonItem style={{textAlign:"center",color:"red"}} lines="none">
                        <IonLabel>{this.errorText}</IonLabel>
                    </IonItem>
                    <IonList style={{marginLeft:MARGIN,marginRight:MARGIN,
                            padding:"4%",border:"1px solid #000"}}>
                        <TextStyle subtitle="Sign in" textColor="blue" title={tools.MSG.APPNAME} L="22%" C=""/>

                        <IonItem id="login-email" class="loginItemStyle">
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput type="text" onIonChange={e=>{
                                this.userCreds.username = e.detail.value;
                                tools.inputValidationReset("login-email");
                            }} value={username}></IonInput>
                        </IonItem>

                        <IonItem id="login-password" class="loginItemStyle" style={{marginTop:"5px"}}>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput type="password" onIonChange={e=>{
                                this.userCreds.password = e.detail.value;
                                tools.inputValidationReset("login-password");
                            }} value={password}></IonInput>
                        </IonItem>

                        <div style={{marginTop:"20px",color:"navy"}}>
                            <IonCheckbox checked={this.rememberChecked} onIonChange={e =>{
                                this.rememberChecked = e.detail.checked;
                            }}></IonCheckbox>
                            <IonLabel>Remember me</IonLabel>
                        </div>

                        <div style={{marginTop:"15px",color:"Crimson"}} lines="none">
                            <IonLabel class="underLine" onClick={()=>{
                                tools.clickById("password-recover");
                            }}>Forgot credentials?</IonLabel>
                        </div>
                        
                        <IonItem style={{marginTop:"50px",color:"navy"}} lines="none">
                            <IonLabel class="underLine" onClick={()=>{
                                tools.clickById("register");
                            }}>Create account</IonLabel>
                            <IonButton id="login-go" style={{cursor:"pointer"}} onClick={()=>{
                                var validate = [
                                    [this.userCreds.username,"login-email"],
                                    [this.userCreds.password,"login-password"],
                                ]
                                if (tools.inputValidation(validate)){
                                    if (tools.emailValidate(this.userCreds.username)){
                                        this.login();
                                    }else{
                                        tools.inputValidation([["","login-email"]]);
                                        this.errorText = tools.MSG.validEmail;
                                        this.setState({errorText:this.errorText});
                                    }
                                }else{
                                    this.errorText = tools.MSG.provideValidCreds;
                                    this.setState({errorText:this.errorText});
                                }
                            }}>Login</IonButton>
                        </IonItem>
                        <IonLabel class="underLine" onClick={()=>{
                            const { history } = this.props;
                            history.push(routes.home);
                        }} style={{color:"Teal"}}>Back to home</IonLabel>  
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
}


export default withIonLifeCycle(Login);
