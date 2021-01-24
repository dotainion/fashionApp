import React, { Component } from 'react';
import { IonPage, IonItem, IonLabel, IonInput, IonContent, IonToolbar, IonTitle, IonButton, IonHeader, IonList, IonCheckbox } from '@ionic/react';
import tools from '../components/Tools';
import axios from 'axios';
import { TextStyle } from '../widgets/textStyle';
import './Register.css';
import { auth } from '../auth/authentication';
import { routes } from '../global/routes';
import { Link } from 'react-router-dom';


class Register extends Component{
    constructor(){
        super();

        this.pages = {
            firstPage:false,
            secondPage:true,
            thirdPage:true,
        }

        this.registration = {
            firstname:"",
            lastname:"",
            email:"",
            contact:"",
            city:"",
            stateaddress:"",
            address:"",
            password:"",
            shippingaddress:"",
        }
        this.confirmpassword = "";

        this.errorText = "";
        this.passwordMatchErrorText = "";

        this.rememberChecked = false;
    }

    componentDidMount(){
        document.title = "Register";
    }

    register(){
        auth.signUp(this.registration);
    }

    nextPage(page, validate){
        var refPage;
        this.errorText = "";
        const keys  = Object.keys(this.pages);
        if (validate){
            for (var key of keys){
                if (key === page){
                    refPage = this.pages[key] = false;
                }else{
                    refPage = this.pages[key] = true;
                }
                this.setState({refPage:refPage,errorText:this.errorText});
            }
        }else{
            this.errorText = tools.MSG.fieldsRequired;
            this.setState({errorText:this.errorText});
        }
        
    }

    matchWhileTyping(){
        if (this.registration.password !== this.confirmpassword){
            tools.inputValidationSet("register-confirmpassword","orange")
            this.passwordMatchErrorText = tools.MSG.passwordMatch;
        }else{
            this.passwordMatchErrorText = "";
            tools.inputValidationReset("register-confirmpassword");
        };
        tools.inputValidationReset("register-password");
        this.setState({passwordMatchErrorText:this.passwordMatchErrorText});
    }

    render(){
        var { firstname, lastname, email, contact, city, stateaddress, address,
            password, shippingaddress,} = this.registration;
        const { firstPage, secondPage, thirdPage } = this.pages;
        document.addEventListener("keypress",function(e){
            if (e.keyCode === 13){
                if (!firstPage){
                    tools.clickById("firstPage-go");
                }else if (!secondPage){
                    tools.clickById("secondPage-go");
                }else if (!thirdPage){
                    tools.clickById("thirdPage-go");
                }
            }
        });
        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{tools.MSG.APPNAME}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonItem style={{textAlign:"center",color:"red"}} lines="none">
                        <IonLabel>{this.errorText}</IonLabel>
                    </IonItem>
                    <IonList  class="register-sub-container">
                        <TextStyle subtitle="Register" textColor="blue" title={tools.MSG.APPNAME} L="22%" C=""/>

                        {/*this is the first page*/}
                        <div hidden={firstPage} id="register-firstpage">
                            <IonItem id="register-firstname" class="registerItemStyle">
                                <IonLabel position="floating">First name</IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.registration.firstname = e.detail.value;
                                    tools.inputValidationReset("register-firstname");
                                }} type="text" value={firstname}/>
                            </IonItem>
                            <IonItem id="register-lastname" class="registerItemStyle">
                                <IonLabel position="floating">Last name</IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.registration.lastname = e.detail.value;
                                    tools.inputValidationReset("register-lastname");
                                }} type="text" value={lastname}/>
                            </IonItem>

                            <IonItem id="register-email" class="registerItemStyle">
                                <IonLabel position="floating">Email Address</IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.registration.email = e.detail.value;
                                    tools.inputValidationReset("register-email");
                                }} type="email" value={email}/>
                            </IonItem>
                            <IonItem id="register-contact" class="registerItemStyle">
                                <IonLabel position="floating">Phone Number</IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.registration.contact = e.detail.value;
                                    tools.inputValidationReset("register-contact");
                                }} type="number" value={contact}/>
                            </IonItem>
                            <IonItem style={{color:"navy"}} lines="none">
                                <Link style={{textDecoration:"none"}} to={routes.login}>
                                    <IonLabel class="underLine" >Sign in instead</IonLabel>
                                </Link>
                                <IonButton slot="end" id="firstPage-go" style={{cursor:"pointer"}} onClick={()=>{
                                    var validate = [
                                        [this.registration.firstname,"register-firstname"],
                                        [this.registration.lastname,"register-lastname"],
                                        [this.registration.email,"register-email"],
                                        [this.registration.contact,"register-contact"],
                                    ]
                                    if (tools.inputValidation(validate)){
                                        if (tools.emailValidate(this.registration.email)){
                                            this.nextPage("secondPage",true);
                                        }else{
                                            tools.inputValidation([["","register-email"]]);
                                            this.errorText = tools.MSG.validEmail;
                                            this.setState({errorText:this.errorText});
                                        }
                                    }
                                }}>Next</IonButton>
                            </IonItem>
                        </div>

                        {/*this is the second page*/}
                        <div hidden={secondPage}>
                            <IonItem id="register-city" class="registerItemStyle">
                                <IonLabel position="floating">City</IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.registration.city = e.detail.value;
                                    tools.inputValidationReset("register-city");
                                }} type="text" value={city}/>
                            </IonItem>
                            <IonItem id="register-stateaddress" class="registerItemStyle">
                                <IonLabel position="floating">State</IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.registration.stateaddress = e.detail.value;
                                    tools.inputValidationReset("register-stateaddress");
                                }} type="text" value={stateaddress}/>
                            </IonItem>

                            <IonItem id="register-address" class="registerItemStyle">
                                <IonLabel position="floating">Home address</IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.registration.address = e.detail.value;
                                    tools.inputValidationReset("register-address");
                                }} type="text" value={address}/>
                            </IonItem>
                            <IonItem id="register-shippingaddress" class="registerItemStyle">
                                <IonLabel position="floating">Shipping address 
                                    <span style={{fontSize:"11px",marginLeft:"5px",color:"teal"}}>
                                        Optional</span></IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.registration.shippingaddress = e.detail.value;
                                    tools.inputValidationReset("register-shippingaddress");
                                }} type="text" value={shippingaddress}/>
                            </IonItem>
                            <IonItem style={{color:"blue"}} lines="none">
                                <IonLabel class="underLine" onClick={()=>{
                                    this.nextPage("firstPage",true);
                                }}>Back</IonLabel>
                                <IonButton id="secondPage-go" style={{cursor:"pointer"}} onClick={()=>{
                                    var validate = [
                                        [this.registration.city,"register-city"],
                                        [this.registration.stateaddress,"register-stateaddress"],
                                        [this.registration.address,"register-address"],
                                        //[this.registration.shippingaddress,"register-shippingaddress"],
                                    ]
                                    this.nextPage("thirdPage",tools.inputValidation(validate));
                                }}>Next</IonButton>
                            </IonItem>
                        </div>

                        {/*this is the third page*/}
                        <div hidden={thirdPage}>
                            <IonItem id="register-password" class="registerItemStyle">
                                <IonLabel position="floating">Password</IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.registration.password = e.detail.value;
                                    tools.inputValidationReset("register-password");
                                    this.matchWhileTyping();
                                }} type="password" value={password}/>
                            </IonItem>
                            <div style={{color:"red",fontSize:"12px"}}>
                                <IonLabel>{this.passwordMatchErrorText}</IonLabel>
                            </div>
                            <IonItem id="register-confirmpassword" class="registerItemStyle">
                                <IonLabel position="floating">Confirm password</IonLabel>
                                <IonInput onIonChange={e=>{
                                    this.confirmpassword = e.detail.value;
                                    this.matchWhileTyping();
                                }} type="password" value={this.confirmpassword}/>
                            </IonItem>
                            <div style={{marginTop:"20px",color:"navy",marginBottom:"19%"}}>
                                <IonCheckbox checked={this.rememberChecked} onIonChange={e =>{
                                    this.rememberChecked = e.detail.checked;
                                }}></IonCheckbox>
                                <IonLabel>Remember me</IonLabel>
                            </div>
                            <IonItem style={{color:"blue"}} lines="none">
                                <IonLabel class="underLine" onClick={()=>{
                                    this.nextPage("secondPage",true);
                                }}>Back</IonLabel>
                                <IonButton id="thirdPage-go" style={{cursor:"pointer"}} onClick={()=>{
                                    var validate = [
                                        [this.registration.password,"register-password"],
                                        [this.confirmpassword,"register-confirmpassword"]
                                    ]
                                    if (tools.inputValidation(validate)){
                                        if (tools.credsConfirmValidation(validate)){
                                            if (tools.passwordStrength(this.registration.password).value >= 3){
                                                this.register();
                                            }else{
                                                tools.inputValidation([
                                                    ["","register-password"],
                                                    ["","register-confirmpassword"]
                                                ])
                                                this.errorText = tools.MSG.passwordStrength;
                                                this.setState({errorText:this.errorText});
                                            }
                                        }else{
                                            this.errorText = tools.MSG.passwordMatch;
                                            this.setState({errorText:this.errorText});
                                        };
                                    }else{
                                        this.errorText = tools.MSG.fieldsRequired;
                                        this.setState({errorText:this.errorText});
                                    };
                                }}>Finish</IonButton>
                            </IonItem>
                        </div>
                        <Link style={{textDecoration:"none"}} to={routes.home}>
                            <IonLabel class="underLine" style={{color:"Teal"}}>Back to home</IonLabel>
                        </Link>
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
}


export default Register;
