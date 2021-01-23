import React, { Component } from 'react';
import { IonPage, IonItem, IonLabel, IonInput, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonButton } from '@ionic/react';
import tools from '../components/Tools';
import { TextStyle } from '../widgets/textStyle';
import { routes } from '../global/routes';
import './Recover.css';


class Recover extends Component{
    constructor(){
        super();

        this.credentials = {
            email:"",
            verification:"",
        }

        this.pages = {
            firstPage:false,
            secondPage:true,
            resend:true,
        }

        this.errorText = "";
    }

    componentDidMount(){
        document.title = "Recover";
    }

    submit(){
        this.errorText = "";
        try{

        }catch(error){

        }finally{
            this.pages.resend = false;
            this.setState({resend:this.pages.resend});
        }
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

    render(){
        const { firstPage, secondPage, resend } = this.pages;
        const { email, verification } = this.credentials;
        const vfcode = tools.MSG.resendverificationcode;
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
                    <IonList class="recover-sub-container">
                        <TextStyle subtitle="Recovery" textColor="blue" title={tools.MSG.APPNAME}/>

                        <div hidden={firstPage}>
                            <IonItem lines="none">
                                <p>{tools.MSG.recoverinfo}</p>
                            </IonItem>
                            
                            <IonItem id="recover-email" class="loginItemStyle" style={{marginTop:"5px"}}>
                                <IonLabel position="floating">Email address</IonLabel>
                                <IonInput type="email" onIonChange={e=>{
                                    this.credentials.email = e.detail.value;
                                    tools.inputValidationReset("recover-email");
                                }} value={email}></IonInput>
                            </IonItem>
                            
                            <IonItem style={{marginTop:"50px",color:"navy"}} lines="none">
                                <IonButton slot="end" style={{cursor:"pointer"}} onClick={()=>{
                                    this.pages.resend = true;
                                    var validate = [
                                        [this.credentials.email,"recover-email"],
                                    ]
                                    if (tools.inputValidation(validate)){
                                        if (tools.emailValidate(this.credentials.email)){
                                            this.setState({resend:this.pages.resend});
                                            this.nextPage("secondPage",true);
                                        }else{
                                            tools.inputValidation([["","recover-email"]]);
                                            this.errorText = tools.MSG.validEmail;
                                            this.setState({errorText:this.errorText});
                                        }
                                    }else{
                                        this.errorText = tools.MSG.fieldsRequired;
                                        this.setState({errorText:this.errorText});
                                    }
                                }}>Next</IonButton>
                            </IonItem>
                        </div>

                        <div hidden={secondPage}>
                            <IonItem lines="none">
                                <p>{tools.MSG.recoververificationinfo}</p>
                            </IonItem>

                            <IonItem id="recover-verification" class="loginItemStyle" style={{marginTop:"5px"}}>
                                <IonLabel position="floating">Validation</IonLabel>
                                <IonInput type="email" onIonChange={e=>{
                                    this.credentials.verification = e.detail.value;
                                    tools.inputValidationReset("recover-verification");
                                }} value={verification}></IonInput>
                            </IonItem>

                                <p hidden={resend} style={{fontSize:"12px",color:"black"}}>
                                    <span>{vfcode[1]}</span>
                                    <span style={{color:"navy"}} className="recoverResendCode textHover" onClick={()=>{
                                        this.submit();
                                    }}>{vfcode[2]}</span>
                                </p>

                            <IonItem style={{marginTop:"50px",color:"navy"}} lines="none">
                                <IonLabel class="underLine" onClick={()=>{
                                    this.nextPage("firstPage",true);
                                }}>Back</IonLabel>
                                <IonButton slot="end" onClick={()=>{
                                    var validate = [
                                        [this.credentials.verification,"recover-verification"],
                                    ]
                                    if (tools.inputValidation(validate)){
                                        this.submit();
                                    }else{
                                        this.errorText = tools.MSG.fieldsRequired;
                                        this.setState({errorText:this.errorText});
                                    };
                                }}>Submit</IonButton>
                            </IonItem>
                        </div>
                        <IonItem lines="none">
                            <IonLabel class="underLine" onClick={()=>{
                                    const { history } = this.props;
                                    history.push(routes.login);
                            }} style={{color:"Teal"}}>Login</IonLabel> 
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


export default Recover;
