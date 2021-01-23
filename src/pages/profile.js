import { IonButton, IonCheckbox, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonThumbnail } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './profile.css';
import img from '../images/test.jpg';
import { imagesOutline } from 'ionicons/icons';
import tools from '../components/Tools';
import { data } from '../database/database';
import { useHistory } from 'react-router';
import { routes } from '../global/routes';


const Profile = () =>{
    const history = useHistory();
    const [toUpload, setToUpload] = useState({
        image: img, title: "",price: "", detail: "", userId: ""
    });
    const addUserInfo = (cmd,value) =>{
        setToUpload({
            image: tools.compare(cmd,"i",value,toUpload.image), 
            title: tools.compare(cmd,"t",value,toUpload.title),
            price: tools.compare(cmd,"p",value,toUpload.price),
            detail: tools.compare(cmd,"d",value,toUpload.detail),
            userId: tools.getCreds().id
        });
    };

    const sendToDatabase = () =>{
        data.addData(toUpload);
        setToUpload({
            image: img, title: "",
            price: "", detail: "", userId: ""
        });
    }

    useEffect(()=>{
        document.title = "Sales Upload";
    },[]);

    return(
        <IonPage>
            <IonContent>
                <IonList class="profile-container">
                    <IonItem class="profile-header" lines="none">
                        <IonLabel>Upload and Advertise</IonLabel>
                    </IonItem>
                    <IonList class="profile-spliter">
                        <IonList class="profile-user-info">
                            <IonList class="profile-product-info">
                                <IonLabel color="medium">Product Information</IonLabel>
                                <IonItem>
                                    <IonLabel position="floating">Item Title</IonLabel>
                                    <IonInput onIonChange={(e)=>{
                                        addUserInfo("t",e.detail.value);
                                    }} value={toUpload.title}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Item Price</IonLabel>
                                    <IonInput onIonChange={(e)=>{
                                        addUserInfo("p",e.detail.value);
                                    }} value={toUpload.price} type="number"/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Item Details</IonLabel>
                                    <IonInput onIonChange={(e)=>{
                                        addUserInfo("d",e.detail.value);
                                    }} value={toUpload.detail}/>
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
                        }}>Save</IonButton>
                        <IonButton onClick={()=>{
                            history.push(routes.home);
                        }}>Home</IonButton>
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