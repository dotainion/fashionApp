import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonThumbnail } from '@ionic/react';
import React, { useState } from 'react';
import './profile.css';
import img from '../images/test.jpg';
import { imagesOutline } from 'ionicons/icons';
import tools from '../components/Tools';
import { data } from '../database/database';


const Profile = () =>{
    const [toUpload, setToUpload] = useState({
        image: img, name: "", email: "", 
        number: "", number2: "", title: "",price: "", detail: ""
    });
    const addUserInfo = (cmd,value) =>{
        setToUpload({
            image: tools.compare(cmd,"i",value,toUpload.image), 
            name: tools.compare(cmd,"n",value,toUpload.name), 
            email: tools.compare(cmd,"e",value,toUpload.email), 
            number: tools.compare(cmd,"c",value,toUpload.number), 
            title: tools.compare(cmd,"t",value,toUpload.title),
            price: tools.compare(cmd,"p",value,toUpload.price),
            detail: tools.compare(cmd,"d",value,toUpload.detail)
        });
    };

    const sendToDatabase = () =>{
        data.addData(toUpload);
    }
    return(
        <IonPage>
            <IonContent>
                <IonList class="profile-container">
                    <IonItem class="profile-header" lines="none">
                        <IonLabel>Upload and Advertise</IonLabel>
                    </IonItem>
                    <IonList class="profile-spliter">
                        <IonList class="profile-user-info">
                            <IonItem>
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput onIonChange={(e)=>{
                                    addUserInfo("n",e.detail.value);
                                }}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Email Address</IonLabel>
                                <IonInput onIonChange={(e)=>{
                                    addUserInfo("e",e.detail.value);
                                }}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Phone Number</IonLabel>
                                <IonInput onIonChange={(e)=>{
                                    addUserInfo("c",e.detail.value);
                                }}/>
                            </IonItem>
                            <IonList class="profile-product-info">
                                <IonLabel color="medium">Product Information</IonLabel>
                                <IonItem>
                                    <IonLabel position="floating">Item Title</IonLabel>
                                    <IonInput onIonChange={(e)=>{
                                        addUserInfo("t",e.detail.value);
                                    }}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Item Price</IonLabel>
                                    <IonInput onIonChange={(e)=>{
                                        addUserInfo("p",e.detail.value);
                                    }}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Item Details</IonLabel>
                                    <IonInput onIonChange={(e)=>{
                                        addUserInfo("d",e.detail.value);
                                    }}/>
                                </IonItem>
                            </IonList>
                        </IonList>
                        <IonList class="profile-image-side">
                            <IonThumbnail class="profile-upload-image">
                                <IonImg src={toUpload.image}/>
                            </IonThumbnail>
                        </IonList>
                    </IonList>
                    <IonItem>
                        <IonList slot="end" onClick={()=>{
                            document.getElementById("profile-choose-file").click();
                        }} class="profile-icons-container profile-hover">
                            <IonIcon class="profile-icons" icon={imagesOutline}/>
                            <div className="profile-icons-text">Upload Image</div>
                        </IonList>
                        <IonButton onClick={()=>{
                            sendToDatabase();
                        }}>test Click</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
            <input hidden onChange={async(e)=>{
                addUserInfo("i",await tools.toBase64(e.target.files[0]));
            }} id="profile-choose-file" type="file"/>
        </IonPage>
    )
}

export default Profile;