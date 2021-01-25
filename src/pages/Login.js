import React, { Component } from 'react';
import { withIonLifeCycle, IonPage, IonItem, IonLabel, IonInput, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonButton, IonCheckbox, IonLoading } from '@ionic/react';
import tools from '../components/Tools';
import { TextStyle } from '../widgets/textStyle';
import './Login.css';
import { routes } from '../global/routes';
import { auth } from '../auth/authentication';
import { Redirect, Route, useHistory } from 'react-router';
import { Link } from 'react-router-dom';


class Login extends Component{
    constructor(){
        super();

        this.credStoreRef = "store-creds-for-input-on-save";
        this.routeDirection = "/";

        this.showLoading = false;

        this.userCreds = {
            username:"",
            password:"",
        }

        this.errorText = "";

        this.rememberChecked = false;
    }

    saveCredentials(email,password){
        window.localStorage.setItem(this.credStoreRef,JSON.stringify({
            username: email,
            password: password
        }));
    }

    getCredentials(){
        const creds = window.localStorage.getItem(this.credStoreRef);
        if (creds) return JSON.parse(creds);
        return null;
    }
    clearCredentials(){
        window.localStorage.setItem(this.credStoreRef,JSON.stringify(null));
    }

    ionViewWillEnter(){
        document.title = "Login";
        var creds = this.getCredentials();
        if (creds){
            this.userCreds.username = creds.username;
            this.userCreds.password = creds.password;
            this.setState({
                username:this.userCreds.username,
                password:this.userCreds.password
            });
            this.rememberChecked = true;
            this.setState({rememberChecked:this.rememberChecked});
        }
    }

    async login(){
        this.errorText = "";
        this.showLoading = true;
        this.setState({
            errorText:this.errorText,
            showLoading:this.showLoading
        });
        const res = await auth.signIn(this.userCreds.username,this.userCreds.password);
        if (res){
            if (this.rememberChecked){
                const creds = this.userCreds;
                this.saveCredentials(creds?.username, creds?.password);
            }else this.clearCredentials();
            this.routeDirection = tools.lastRoute("get");
            this.setState({routeDirection:this.routeDirection})
            setTimeout(()=>{
                this.showLoading = false;
                tools.clickById("login-route-direction");
            },1000);
            
        }else{
            this.errorText = tools.MSG.wrongPassword
            this.showLoading = false;
            this.setState({
                showLoading:this.showLoading,
                errorText:this.errorText
            });
        }
    }

    render(){
        var { username, password } = this.userCreds;
        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{tools.MSG.APPNAME}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={this.showLoading}
                    onDidDismiss={() =>{
                        this.showLoading = false;
                        this.setState({showLoading:this.showLoading});
                    }}
                    message={'Please wait...'}
                    duration={5000}
                />
                <IonContent class="login-main-container">
                    <IonItem style={{textAlign:"center",color:"red"}} lines="none">
                        <IonLabel>{this.errorText}</IonLabel>
                    </IonItem>
                    <IonList class="login-sub-container">
                        <TextStyle subtitle="Sign in" textColor="blue" title={tools.MSG.APPNAME}/>

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
                                const { history } = this.props;
                                history.push(routes.recover);
                            }}>Forgot credentials?</IonLabel>
                        </div>
                        
                        <IonItem style={{marginTop:"50px",color:"navy"}} lines="none">
                            <Link style={{textDecoration:"none"}} to={routes.register}>
                                <IonLabel class="underLine">Create account</IonLabel>
                            </Link>
                            <IonButton slot="end" id="login-go" style={{cursor:"pointer"}} onClick={async()=>{
                                var validate = [
                                    [this.userCreds.username,"login-email"],
                                    [this.userCreds.password,"login-password"],
                                ]
                                if (tools.inputValidation(validate)){
                                    if (tools.emailValidate(this.userCreds.username)){
                                        await this.login();
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
                        <Link style={{textDecoration:"none"}} to={routes.home}>
                            <IonLabel class="underLine"style={{color:"Teal"}}>Back to home</IonLabel>
                        </Link> 
                    </IonList>
                </IonContent>
                <Link to={this.routeDirection} id="login-route-direction"/>
            </IonPage>
        )
    }
}


export default withIonLifeCycle(Login);
