import React, { Component } from 'react';
import { withIonLifeCycle, IonPage, IonItem, IonLabel, IonInput, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonButton, IonCheckbox } from '@ionic/react';
import { Languages, LoadSpinner, Routes, TextStyle } from '../components/Widgets';
import tools from '../components/Tools';
import AppInfo from '../components/AppInfo';
import axios from 'axios';


class Login extends Component{
    constructor(){
        super();

        this.credentials = {
            SERVERUSERNAME:tools.SERVERUSERNAME,
            SERVERPASSWORD:tools.SERVERPASSWORD,
            username:"",
            password:"",
        }

        this.errorText = "";

        this.rememberChecked = false;
    }

    ionViewWillEnter(){
        var creds = tools.getCreds();
        if (creds.username && creds.password){
            this.credentials.username = creds.username;
            this.credentials.password = creds.password;
            this.setState({
                username:this.credentials.username,
                password:this.credentials.password
            });
            this.rememberChecked = true;
        }
    }

    server(){
        this.errorText = "";
        tools.clickById("start-loader");
        axios.post(tools.URL.LOGIN,this.credentials)
        .then(response =>{
            if (response.data === true){
                console.log(this.rememberChecked)
                if (this.rememberChecked){
                    tools.saveCreds(this.credentials.username,this.credentials.password);
                }else{
                    this.credentials.username = "";
                    this.credentials.password = "";
                    tools.clearStorage();
                }
                tools.clickById("home")
            }else if (response.data === false){
                this.errorText = tools.MSG.wrongPassword;
            }else if (response.data === null){
                this.errorText = tools.MSG.userNotExist;
            }else{
                this.errorText = tools.MSG.somethingWrong;
            }
        })
        .catch(error=>{
            this.errorText = tools.MSG.serverDown;
        })
        .finally(final=>{
            tools.clickById("stop-loader");
            this.setState({errorText:this.errorText})
        })
    }

    render(){
        var { username, password } = this.credentials;
        var MARGIN = tools.compare(tools.platform(),true,"10%","35%");
        document.addEventListener("keypress",function(e){
            console.log(e.keyCode)
            if (e.keyCode === 13){
                tools.clickById("login-go");
            }
        });
        return(
            <IonPage>
                <Languages/>
                <Routes/>
                <LoadSpinner/>
                <AppInfo.All/>

                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{tools.MSG.APPNAME}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonItem style={{textAlign:"center",color:"red"}} lines="none">
                        <IonLabel>{this.errorText}</IonLabel>
                    </IonItem>
                    <IonList style={{marginLeft:MARGIN,marginRight:MARGIN,
                            padding:"4%",border:"1px solid #000"}}>
                        <TextStyle subtitle="Sign in" textColor="blue" title={tools.MSG.APPNAME} L="22%" C=""/>

                        <IonItem id="login-email" class="loginItemStyle">
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput type="text" onIonChange={e=>{
                                this.credentials.username = e.detail.value;
                                tools.inputValidationReset("login-email");
                            }} value={username}></IonInput>
                        </IonItem>

                        <IonItem id="login-password" class="loginItemStyle" style={{marginTop:"5px"}}>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput type="password" onIonChange={e=>{
                                this.credentials.password = e.detail.value;
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
                                    [this.credentials.username,"login-email"],
                                    [this.credentials.password,"login-password"],
                                ]
                                if (tools.inputValidation(validate)){
                                    if (tools.emailValidate(this.credentials.username)){
                                        this.server();
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
                            tools.clickById("home")
                        }} style={{color:"Teal"}}>Back to home</IonLabel>  
                    </IonList>

                    <IonItem style={{marginLeft:MARGIN,marginRight:MARGIN,textAlign:"center",
                            fontWeight:"bold",color:"Black"}} lines="full">
                        <AppInfo.Nav/>
                    </IonItem>
                </IonContent>
            </IonPage>
        )
    }
}


export default withIonLifeCycle(Login);
