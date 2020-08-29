import React, { useState } from 'react';
import { IonModal, IonContent, IonHeader, IonTitle, IonButton, IonIcon, IonLabel, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import { languageSharp, close } from 'ionicons/icons';
import tools from '../components/Tools';
import '../components/AppInfo.css';


class AppInformations{
    AboutUs(){
        const [showModel, setShowModel] = useState(false);
        return(
            <>
                <IonModal isOpen={showModel} onDidDismiss={()=>{
                    setShowModel(false);
                }} cssClass='my-custom-class'>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons hidden={tools.compare(tools.platform(),true,false,true)} slot="start">
                                <IonBackButton defaultHref="" onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                            <IonTitle>About us</IonTitle>
                            <IonButtons hidden={tools.compare(tools.platform(),true,true,false)} slot="end">
                                <IonIcon class="iconStyle onHover" icon={close} onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <div style={{marginTop:"40%",marginBottom:"40%",textAlign:"center"}}>
                            <IonLabel>Comming soon</IonLabel>
                        </div>

                    </IonContent>
                </IonModal>

                <IonButton hidden id="show-about-us" onClick={()=>{setShowModel(true)}}/>
            </>
        )
    }

    Help(){
        const [showModel, setShowModel] = useState(false);
        return(
            <>
                <IonModal isOpen={showModel} onDidDismiss={()=>{
                    setShowModel(false);
                }} cssClass='my-custom-class'>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons hidden={tools.compare(tools.platform(),true,false,true)}  slot="start">
                                <IonBackButton defaultHref="" onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                            <IonTitle>Help</IonTitle>
                            <IonButtons hidden={tools.compare(tools.platform(),true,true,false)} slot="end">
                                <IonIcon class="iconStyle onHover" icon={close} onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <div style={{marginTop:"40%",marginBottom:"40%",textAlign:"center"}}>
                            <IonLabel>Comming soon</IonLabel>
                        </div>

                    </IonContent>
                </IonModal>

                <IonButton hidden id="show-help" onClick={()=>{setShowModel(true)}}/>
            </>
        )
    }

    Privacy(){
        const [showModel, setShowModel] = useState(false);
        return(
            <>
                <IonModal isOpen={showModel} onDidDismiss={()=>{
                    setShowModel(false);
                }} cssClass='my-custom-class'>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons hidden={tools.compare(tools.platform(),true,false,true)}  slot="start">
                                <IonBackButton defaultHref="" onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                            <IonTitle>Privacy and policies</IonTitle>
                            <IonButtons hidden={tools.compare(tools.platform(),true,true,false)} slot="end">
                                <IonIcon class="iconStyle onHover" icon={close} onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <div style={{marginTop:"40%",marginBottom:"40%",textAlign:"center"}}>
                            <IonLabel>Comming soon</IonLabel>
                        </div>
                    
                    </IonContent>
                </IonModal>

                <IonButton hidden id="show-privacy" onClick={()=>{setShowModel(true)}}/>
            </>
        )
    }

    Terms(){
        const [showModel, setShowModel] = useState(false);
        return(
            <>
                <IonModal isOpen={showModel} onDidDismiss={()=>{
                    setShowModel(false);
                }} cssClass='my-custom-class'>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons hidden={tools.compare(tools.platform(),true,false,true)}  slot="start">
                                <IonBackButton defaultHref="" onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                            <IonTitle>Terms and conditions</IonTitle>
                            <IonButtons hidden={tools.compare(tools.platform(),true,true,false)} slot="end">
                                <IonIcon class="iconStyle onHover" icon={close} onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <div style={{marginTop:"40%",marginBottom:"40%",textAlign:"center"}}>
                            <IonLabel>Comming soon</IonLabel>
                        </div>

                    </IonContent>
                </IonModal>

                <IonButton hidden id="show-terms" onClick={()=>{setShowModel(true)}}/>
            </>
        )
    }

    ContactUs(){
        const [showModel, setShowModel] = useState(false);
        return(
            <>
                <IonModal isOpen={showModel} onDidDismiss={()=>{
                    setShowModel(false);
                }} cssClass='my-custom-class'>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons hidden={tools.compare(tools.platform(),true,false,true)}  slot="start">
                                <IonBackButton defaultHref="" onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                            <IonTitle>Contact us</IonTitle>
                            <IonButtons hidden={tools.compare(tools.platform(),true,true,false)} slot="end">
                                <IonIcon class="iconStyle onHover" icon={close} onClick={()=>{setShowModel(false)}}/>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <div style={{marginTop:"40%",marginBottom:"40%",textAlign:"center"}}>
                            <IonLabel>Comming soon</IonLabel>
                        </div>

                    </IonContent>
                </IonModal>

                <IonButton hidden id="show-contact-us" onClick={()=>{setShowModel(true)}}/>
            </>
        )
    }

    Nav(){
        return(
            <>
                <IonIcon class="loginBottomNavHover" onClick={()=>{
                    tools.clickById("show-language");
                }} style={{padding:"5px",color:"Black"}} icon={languageSharp}/>
                <IonLabel class="loginBottomNavHover" onClick={()=>{
                    tools.clickById("show-help")
                }} style={{padding:"8px"}}>Help</IonLabel>
                <IonLabel class="loginBottomNavHover" onClick={()=>{
                    tools.clickById("show-privacy")
                }} style={{padding:"8px"}}>Privacy</IonLabel>
                <IonLabel class="loginBottomNavHover" onClick={()=>{
                    tools.clickById("show-terms")
                }} style={{padding:"8px"}}>Terms</IonLabel>
            </>
        )
    }

    All(){
        return(
            <>
                <Info.Help/>
                <Info.Privacy/>
                <Info.Terms/>
                <Info.AboutUs/>
                <Info.ContactUs/>
            </>
        )
    }
}

var Info = new AppInformations()
export default Info;